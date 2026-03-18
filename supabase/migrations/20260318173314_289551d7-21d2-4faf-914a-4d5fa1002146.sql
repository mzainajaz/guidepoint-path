
CREATE TABLE public.admin_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  setting_key text NOT NULL,
  setting_value text NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, setting_key)
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage their settings"
  ON public.admin_settings
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role) AND user_id = auth.uid())
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role) AND user_id = auth.uid());
