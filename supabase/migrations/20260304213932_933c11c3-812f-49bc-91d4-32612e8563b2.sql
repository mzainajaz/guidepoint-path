
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS business_type text,
  ADD COLUMN IF NOT EXISTS contact_preference text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS setup_preference text,
  ADD COLUMN IF NOT EXISTS budget text,
  ADD COLUMN IF NOT EXISTS additional_services text[] DEFAULT '{}';
