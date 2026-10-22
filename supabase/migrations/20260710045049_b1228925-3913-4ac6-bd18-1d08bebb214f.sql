CREATE TABLE IF NOT EXISTS public.partial_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL UNIQUE,
  name text,
  email text,
  company text,
  company_phone text,
  whatsapp_number text,
  company_socials text,
  services_required text,
  last_field text,
  fields_touched integer NOT NULL DEFAULT 0,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  referrer text,
  user_agent text,
  page_path text,
  converted_at timestamptz,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.partial_leads TO anon, authenticated;
GRANT ALL ON public.partial_leads TO service_role;

ALTER TABLE public.partial_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert partial lead"
  ON public.partial_leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(session_id) BETWEEN 8 AND 128
    AND (name IS NULL OR length(name) <= 200)
    AND (email IS NULL OR length(email) <= 320)
    AND (company IS NULL OR length(company) <= 200)
    AND (company_phone IS NULL OR length(company_phone) <= 60)
    AND (whatsapp_number IS NULL OR length(whatsapp_number) <= 60)
    AND (company_socials IS NULL OR length(company_socials) <= 600)
    AND (services_required IS NULL OR length(services_required) <= 600)
  );

CREATE POLICY "anyone can update partial lead by session"
  ON public.partial_leads FOR UPDATE TO anon, authenticated
  USING (true)
  WITH CHECK (
    length(session_id) BETWEEN 8 AND 128
    AND (name IS NULL OR length(name) <= 200)
    AND (email IS NULL OR length(email) <= 320)
  );

CREATE INDEX IF NOT EXISTS partial_leads_updated_at_idx ON public.partial_leads (updated_at DESC);

CREATE TABLE IF NOT EXISTS public.template_404_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  referrer text,
  user_agent text,
  alerted_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.template_404_alerts TO service_role;
ALTER TABLE public.template_404_alerts ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS template_404_alerts_recent_idx
  ON public.template_404_alerts (path, alerted_at DESC);