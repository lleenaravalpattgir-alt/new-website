import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const AlertSchema = z.object({
  path: z.string().trim().min(1).max(500),
  referrer: z.string().trim().max(600).optional().or(z.literal('')),
})

const NOTIFY_TO = 'lleenaravalpattgir@gmail.com'
const SITE = 'RYZE Advisory'
const FROM_DOMAIN = 'ryzeadvisory.co'
const SENDER_DOMAIN = 'notify.ryzeadvisory.co'
const DEDUPE_MINUTES = 60

function esc(v: string | null | undefined) {
  return (v ?? '—').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

export const Route = createFileRoute('/api/public/alerts/template-404')({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'content-type',
          },
        }),
      POST: async ({ request }) => {
        const url = process.env.SUPABASE_URL
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!url || !key) return Response.json({ error: 'misconfigured' }, { status: 500 })

        let input
        try {
          input = AlertSchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'invalid' }, { status: 400 })
        }

        // Only accept literal $template patterns — refuse arbitrary 404 spam.
        if (!/\/\$[a-zA-Z_]/.test(input.path)) {
          return Response.json({ error: 'not_a_template_url' }, { status: 400 })
        }

        const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
        const userAgent = (request.headers.get('user-agent') ?? '').slice(0, 500)
        const since = new Date(Date.now() - DEDUPE_MINUTES * 60_000).toISOString()

        const { data: recent } = await supabase
          .from('template_404_alerts')
          .select('id')
          .eq('path', input.path)
          .gte('alerted_at', since)
          .limit(1)
          .maybeSingle()

        if (recent) {
          return Response.json({ ok: true, deduped: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
        }

        await supabase.from('template_404_alerts').insert({
          path: input.path,
          referrer: input.referrer || null,
          user_agent: userAgent || null,
        })

        const html = `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
            <div style="background:#dc2626;color:#ffffff;font-weight:700;font-size:11px;letter-spacing:.08em;padding:4px 10px;border-radius:999px;display:inline-block">TEMPLATE 404 · RYZE Advisory</div>
            <h2 style="color:#0a1f44;margin:12px 0 8px">A literal $template URL was requested</h2>
            <p style="color:#475467;font-size:14px">Google or another crawler hit a route with an unresolved template segment. Investigate the linking source and add a redirect if needed.</p>
            <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-top:12px">
              <tbody>
                <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Path</td><td style="padding:8px 12px;font-weight:600;font-family:monospace">${esc(input.path)}</td></tr>
                <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Referrer</td><td style="padding:8px 12px;font-weight:600">${esc(input.referrer)}</td></tr>
                <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">User Agent</td><td style="padding:8px 12px;font-weight:600;font-size:12px">${esc(userAgent)}</td></tr>
              </tbody>
            </table>
            <p style="color:#94a3b8;font-size:12px;margin-top:16px">Deduped per path per ${DEDUPE_MINUTES} minutes.</p>
          </div>`

        const messageId = crypto.randomUUID()
        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: 'template-404-alert',
          recipient_email: NOTIFY_TO,
          status: 'pending',
        })
        await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: NOTIFY_TO,
            from: `${SITE} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject: `[RYZE] Template 404 hit: ${input.path}`,
            html,
            text: `Template 404 hit\nPath: ${input.path}\nReferrer: ${input.referrer || ''}\nUA: ${userAgent}`,
            purpose: 'transactional',
            label: 'template-404-alert',
            idempotency_key: `t404-${input.path}-${new Date().toISOString().slice(0, 13)}`,
            queued_at: new Date().toISOString(),
          },
        })

        return Response.json({ ok: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
      },
    },
  },
})
