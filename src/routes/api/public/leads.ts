import * as React from 'react'
import { render } from '@react-email/components'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'Rise Advisory'
const SENDER_DOMAIN = 'notify.ryzeadvisory.co'
const FROM_DOMAIN = 'ryzeadvisory.co'
const TEMPLATE_NAME = 'lead-notification'

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  companyPhone: z.string().trim().max(40).optional().or(z.literal('')),
  whatsappNumber: z.string().trim().max(40).optional().or(z.literal('')),
  servicesRequired: z.string().trim().max(400).optional().or(z.literal('')),
  companySocials: z.string().trim().max(400).optional().or(z.literal('')),
  source: z.string().trim().max(64).optional(),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export const Route = createFileRoute('/api/public/leads')({
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
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server misconfigured' }, { status: 500 })
        }

        let parsed
        try {
          parsed = LeadSchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'Invalid input' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })

        const lead = {
          name: parsed.name,
          email: parsed.email,
          company: parsed.company ? parsed.company : null,
          company_phone: parsed.companyPhone ? parsed.companyPhone : null,
          whatsapp_number: parsed.whatsappNumber ? parsed.whatsappNumber : null,
          services_required: parsed.servicesRequired ? parsed.servicesRequired : null,
          company_socials: parsed.companySocials ? parsed.companySocials : null,
          source: parsed.source || 'strategy_call',
        }

        const { data: inserted, error: insertError } = await supabase
          .from('leads')
          .insert(lead)
          .select('id, created_at')
          .single()

        if (insertError) {
          console.error('Lead insert failed', insertError)
          return Response.json({ error: 'Failed to save lead' }, { status: 500 })
        }

        // Fire-and-record email notification (best-effort)
        try {
          const template = TEMPLATES[TEMPLATE_NAME]
          const recipient = template.to!
          const messageId = crypto.randomUUID()
          const templateData = {
            ...lead,
            submittedAt: inserted.created_at,
          }

          // Suppression check
          const { data: suppressed } = await supabase
            .from('suppressed_emails')
            .select('id')
            .eq('email', recipient.toLowerCase())
            .maybeSingle()

          if (!suppressed) {
            // Get or create unsubscribe token
            let unsubscribeToken: string | null = null
            const { data: existingToken } = await supabase
              .from('email_unsubscribe_tokens')
              .select('token, used_at')
              .eq('email', recipient.toLowerCase())
              .maybeSingle()
            if (existingToken && !existingToken.used_at) {
              unsubscribeToken = existingToken.token
            } else if (!existingToken) {
              unsubscribeToken = generateToken()
              await supabase
                .from('email_unsubscribe_tokens')
                .upsert(
                  { token: unsubscribeToken, email: recipient.toLowerCase() },
                  { onConflict: 'email', ignoreDuplicates: true },
                )
              const { data: storedToken } = await supabase
                .from('email_unsubscribe_tokens')
                .select('token')
                .eq('email', recipient.toLowerCase())
                .maybeSingle()
              unsubscribeToken = storedToken?.token ?? unsubscribeToken
            }

            const element = React.createElement(template.component, templateData)
            const html = await render(element)
            const plainText = await render(element, { plainText: true })
            const subject =
              typeof template.subject === 'function'
                ? template.subject(templateData)
                : template.subject

            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: TEMPLATE_NAME,
              recipient_email: recipient,
              status: 'pending',
            })

            const { error: enqueueError } = await supabase.rpc('enqueue_email', {
              queue_name: 'transactional_emails',
              payload: {
                message_id: messageId,
                to: recipient,
                from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                sender_domain: SENDER_DOMAIN,
                subject,
                html,
                text: plainText,
                purpose: 'transactional',
                label: TEMPLATE_NAME,
                idempotency_key: `lead-${inserted.id}`,
                unsubscribe_token: unsubscribeToken,
                queued_at: new Date().toISOString(),
              },
            })

            if (enqueueError) {
              console.error('Failed to enqueue lead notification', enqueueError)
              await supabase.from('email_send_log').insert({
                message_id: messageId,
                template_name: TEMPLATE_NAME,
                recipient_email: recipient,
                status: 'failed',
                error_message: 'Failed to enqueue email',
              })
            }
          }
        } catch (err) {
          // Don't fail the lead submission if email fails
          console.error('Lead notification email error', err)
        }

        return Response.json(
          { success: true, id: inserted.id },
          { headers: { 'Access-Control-Allow-Origin': '*' } },
        )
      },
    },
  },
})
