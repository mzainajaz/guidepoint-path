-- Remove the overly permissive anonymous insert policy
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Add a restrictive policy: only service_role (used by edge functions) can insert
-- Since service_role bypasses RLS, we don't need an explicit policy for it.
-- But we add one for authenticated users (admins) who might insert via dashboard
CREATE POLICY "Admins can insert leads"
ON public.leads
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));