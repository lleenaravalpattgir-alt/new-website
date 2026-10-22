import React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  name?: string
  email?: string
  company?: string
  company_phone?: string
  whatsapp_number?: string
  services_required?: string
  company_socials?: string
  source?: string
  submittedAt?: string
}

const LeadNotificationEmail = ({
  name = 'Unknown',
  email = 'unknown@example.com',
  company,
  company_phone,
  whatsapp_number,
  services_required,
  company_socials,
  source = 'strategy_call',
  submittedAt,
}: Props) => {
  const when = submittedAt
    ? new Date(submittedAt).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New strategy call request from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={badge}>NEW LEAD · RYZE Advisory</Section>
          <Heading style={h1}>{name} requested a strategy call</Heading>
          <Text style={lede}>
            Someone just submitted the Free Strategy Call form on ryzeadvisory.co.
            Reply within 1 business day to keep your promise.
          </Text>

          <Section style={card}>
            <Row label="Name" value={name} />
            <Row label="Email" value={email} />
            <Row label="Company" value={company || '—'} />
            <Row label="Phone" value={company_phone || '—'} />
            <Row label="WhatsApp" value={whatsapp_number || '—'} />
            <Row label="Services" value={services_required || '—'} />
            <Row label="Socials" value={company_socials || '—'} />
            <Row label="Source" value={source} />
            <Row label="Submitted" value={when} />
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            This notification was sent automatically from RYZE Advisory. The
            full lead history is available in your Lovable Cloud dashboard.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <tbody>
      <tr>
        <td style={rowLabel}>{label}</td>
        <td style={rowValue}>{value}</td>
      </tr>
    </tbody>
  </table>
)

export const template = {
  component: LeadNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New strategy call request — ${data?.name || 'Unknown'}`,
  displayName: 'Lead Notification',
  to: 'lleenaravalpattgir@gmail.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    company: 'Acme Inc.',
    source: 'strategy_call',
    submittedAt: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '32px 24px', maxWidth: '560px', margin: '0 auto' }
const badge = {
  display: 'inline-block',
  padding: '4px 10px',
  borderRadius: '999px',
  backgroundColor: '#0a1f44',
  color: '#ffffff',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  marginBottom: '16px',
}
const h1 = { fontSize: '22px', color: '#0a1f44', margin: '0 0 12px', lineHeight: 1.3 }
const lede = { fontSize: '14px', color: '#475467', margin: '0 0 24px', lineHeight: 1.5 }
const card = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '16px 18px',
}
const rowLabel = {
  fontSize: '12px',
  color: '#64748b',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.06em',
  padding: '8px 12px 8px 0',
  width: '110px',
  verticalAlign: 'top' as const,
}
const rowValue = {
  fontSize: '14px',
  color: '#0f172a',
  padding: '8px 0',
  fontWeight: 600,
  wordBreak: 'break-word' as const,
}
const hr = { borderColor: '#e2e8f0', margin: '24px 0' }
const footer = { fontSize: '12px', color: '#94a3b8', lineHeight: 1.5 }
