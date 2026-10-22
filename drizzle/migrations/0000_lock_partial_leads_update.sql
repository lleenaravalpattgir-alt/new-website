DROP POLICY IF EXISTS "anyone can update partial lead by session" ON public.partial_leads;
DROP POLICY IF EXISTS "anyone can insert partial lead" ON public.partial_leads;
REVOKE INSERT, UPDATE, DELETE, SELECT ON public.partial_leads FROM anon, authenticated;
GRANT ALL ON public.partial_leads TO service_role;