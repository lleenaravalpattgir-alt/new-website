import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const PartialSchema = z.object({
  sessionId: z.string().trim().min(8).max(128),
  name: z.string().trim().max(200).optional().or(z.literal('')),
  email: z.string().trim().max(320).optional().or(z.literal('')),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  companyPhone: z.string().trim().max(60).optional().or(z.literal('')),
  whatsappNumber: z.string().trim().max(60).optional().or(z.literal('')),
  companySocials: z.string().trim().max(600).optional().or(z.literal('')),
  servicesRequired: z.string().trim().max(600).optional().or(z.literal('')),
  lastField: z.string().trim().max(60).optional().or(z.literal('')),
  fieldsTouched: z.number().int().min(0).max(50).optional(),
  utm_source: z.string().trim().max(120).optional().or(z.literal('')),
  utm_medium: z.string().trim().max(120).optional().or(z.literal('')),
  utm_campaign: z.string().trim().max(120).optional().or(z.literal('')),
  utm_term: z.string().trim().max(120).optional().or(z.literal('')),
  utm_content: z.string().trim().max(120).optional().or(z.literal('')),
  referrer: z.string().trim().max(600).optional().or(z.literal('')),
  pagePath: z.string().trim().max(300).optional().or(z.literal('')),
  notify: z.boolean().optional(),
})

const NOTIFY_TO = 'lleenaravalpattgir@gmail.com'
const SITE = 'Rise Advisory'
const FROM_DOMAIN = 'ryzeadvisory.co'
const SENDER_DOMAIN = 'notify.ryzeadvisory.co'

function esc(v: string | null | undefined) {
  return (v ?? '—').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))
}

export const Route = createFileRoute('/api/public/leads/partial')({
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
          input = PartialSchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'invalid' }, { status: 400 })
        }

        const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
        const userAgent = request.headers.get('user-agent') ?? ''

        const row = {
          session_id: input.sessionId,
          name: input.name || null,
          email: input.email || null,
          company: input.company || null,
          company_phone: input.companyPhone || null,
          whatsapp_number: input.whatsappNumber || null,
          company_socials: input.companySocials || null,
          services_required: input.servicesRequired || null,
          last_field: input.lastField || null,
          fields_touched: input.fieldsTouched ?? 0,
          utm_source: input.utm_source || null,
          utm_medium: input.utm_medium || null,
          utm_campaign: input.utm_campaign || null,
          utm_term: input.utm_term || null,
          utm_content: input.utm_content || null,
          referrer: input.referrer || null,
          user_agent: userAgent.slice(0, 500) || null,
          page_path: input.pagePath || null,
          updated_at: new Date().toISOString(),
        }

        const { error } = await supabase
          .from('partial_leads')
          .upsert(row, { onConflict: 'session_id' })
        if (error) {
          console.error('partial_leads upsert failed', error)
          return Response.json({ error: 'save_failed' }, { status: 500 })
        }

        // Optional realtime notification: fire once per session when the visitor
        // has provided something meaningfully identifying (email OR name+phone).
        if (input.notify && (input.email || (input.name && (input.companyPhone || input.whatsappNumber)))) {
          try {
            const { data: existing } = await supabase
              .from('partial_leads')
              .select('converted_at')
              .eq('session_id', input.sessionId)
              .maybeSingle()
            if (!existing?.converted_at) {
              const html = `
                <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px">
                  <div style="background:#f59e0b;color:#0a1f44;font-weight:700;font-size:11px;letter-spacing:.08em;padding:4px 10px;border-radius:999px;display:inline-block">TYPING NOW · RYZE Advisory</div>
                  <h2 style="color:#0a1f44;margin:12px 0 8px">${esc(input.name || 'Someone')} is filling the strategy call form</h2>
                  <p style="color:#475467;font-size:14px;margin:0 0 16px">They haven't submitted yet. Here is what they've typed so far:</p>
                  <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px">
                    <tbody>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Name</td><td style="padding:8px 12px;font-weight:600">${esc(input.name)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Email</td><td style="padding:8px 12px;font-weight:600">${esc(input.email)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Company</td><td style="padding:8px 12px;font-weight:600">${esc(input.company)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Phone</td><td style="padding:8px 12px;font-weight:600">${esc(input.companyPhone)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">WhatsApp</td><td style="padding:8px 12px;font-weight:600">${esc(input.whatsappNumber)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Socials</td><td style="padding:8px 12px;font-weight:600">${esc(input.companySocials)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">Page</td><td style="padding:8px 12px;font-weight:600">${esc(input.pagePath)}</td></tr>
                      <tr><td style="padding:8px 12px;color:#64748b;font-size:12px;text-transform:uppercase">UTM</td><td style="padding:8px 12px;font-weight:600">${esc([input.utm_source,input.utm_medium,input.utm_campaign].filter(Boolean).join(' / '))}</td></tr>
                    </tbody>
                  </table>
                  <p style="color:#94a3b8;font-size:12px;margin-top:16px">Session ${esc(input.sessionId)}. Sent once per session on first meaningful capture.</p>
                </div>`
              const messageId = crypto.randomUUID()
              await supabase.from('email_send_log').insert({
                message_id: messageId,
                template_name: 'partial-lead-notification',
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
                  subject: `Someone is typing in the strategy form — ${input.name || input.email || 'anonymous'}`,
                  html,
                  text: `Partial capture: name=${input.name || ''} email=${input.email || ''} phone=${input.companyPhone || ''} whatsapp=${input.whatsappNumber || ''} company=${input.company || ''} page=${input.pagePath || ''}`,
                  purpose: 'transactional',
                  label: 'partial-lead-notification',
                  idempotency_key: `partial-${input.sessionId}`,
                  queued_at: new Date().toISOString(),
                },
              })
              await supabase
                .from('partial_leads')
                .update({ converted_at: new Date().toISOString() })
                .eq('session_id', input.sessionId)
            }
          } catch (err) {
            console.error('partial notify failed', err)
          }
        }

        return Response.json({ ok: true }, { headers: { 'Access-Control-Allow-Origin': '*' } })
      },
    },
  },
})
