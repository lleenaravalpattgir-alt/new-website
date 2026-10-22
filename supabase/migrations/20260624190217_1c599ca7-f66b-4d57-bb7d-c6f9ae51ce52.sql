ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS company_phone TEXT,
  ADD COLUMN IF NOT EXISTS whatsapp_number TEXT,
  ADD COLUMN IF NOT EXISTS services_required TEXT,
  ADD COLUMN IF NOT EXISTS company_socials TEXT;