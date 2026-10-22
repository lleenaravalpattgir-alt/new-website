import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

const InputSchema = z.object({
  password: z.string().min(1),
  from: z.string().optional(),
  to: z.string().optional(),
  source: z.string().optional(),
  emailStatus: z.string().optional(),
})

export const fetchAdminLeads = createServerFn({ method: 'POST' })
  .validator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_DASHBOARD_PASSWORD
    if (!expected) throw new Error('ADMIN_DASHBOARD_PASSWORD not configured')
    if (data.password !== expected) throw new Error('Unauthorized')

    const { supabaseAdmin } = await import('@/integrations/supabase/client.server')

    let q = supabaseAdmin
      .from('leads')
      .select('id, name, email, company, source, created_at')
      .order('created_at', { ascending: false })
      .limit(1000)

    if (data.from) q = q.gte('created_at', data.from)
    if (data.to) q = q.lte('created_at', data.to)
    if (data.source && data.source !== 'all') q = q.eq('source', data.source)

    const { data: leads, error } = await q
    if (error) throw new Error(error.message)

    // Pull latest email status per recipient (deduped by message_id)
    const emails = new Map<string, { status: string; created_at: string; error: string | null }>()
    if (leads && leads.length) {
      const recipients = Array.from(new Set(leads.map((l) => l.email)))
      const { data: logs } = await supabaseAdmin
        .from('email_send_log')
        .select('message_id, recipient_email, status, error_message, created_at')
        .in('recipient_email', recipients)
        .order('created_at', { ascending: false })
        .limit(2000)

      const seen = new Set<string>()
      for (const row of logs ?? []) {
        const key = row.message_id ?? `${row.recipient_email}-${row.created_at}`
        if (seen.has(key)) continue
        seen.add(key)
        const prev = emails.get(row.recipient_email)
        if (!prev || new Date(row.created_at) > new Date(prev.created_at)) {
          emails.set(row.recipient_email, {
            status: row.status,
            created_at: row.created_at,
            error: row.error_message,
          })
        }
      }
    }

    const enriched = (leads ?? []).map((l) => ({
      ...l,
      email_status: emails.get(l.email)?.status ?? null,
      email_error: emails.get(l.email)?.error ?? null,
    }))

    const filtered = data.emailStatus && data.emailStatus !== 'all'
      ? enriched.filter((l) =>
          data.emailStatus === 'none' ? !l.email_status : l.email_status === data.emailStatus,
        )
      : enriched

    return { leads: filtered, total: filtered.length }
  })
