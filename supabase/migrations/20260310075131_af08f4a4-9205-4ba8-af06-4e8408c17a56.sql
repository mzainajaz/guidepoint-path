
-- Table for the How-To content library (195 articles × 10 languages)
CREATE TABLE public.howto_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  language text NOT NULL DEFAULT 'english',
  language_code text NOT NULL DEFAULT 'en',
  text_direction text NOT NULL DEFAULT 'ltr',
  article_number text NOT NULL,
  slug text NOT NULL,
  page_title text NOT NULL,
  meta_description text,
  primary_keyword text,
  word_count integer DEFAULT 0,
  content_html text NOT NULL DEFAULT '',
  content_markdown text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (language_code, slug)
);

-- Enable RLS
ALTER TABLE public.howto_articles ENABLE ROW LEVEL SECURITY;

-- Anyone can read published articles
CREATE POLICY "Anyone can view published howto articles"
  ON public.howto_articles FOR SELECT TO public
  USING (published = true OR (auth.uid() IS NOT NULL AND has_role(auth.uid(), 'admin'::app_role)));

-- Admins can insert
CREATE POLICY "Admins can insert howto articles"
  ON public.howto_articles FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update
CREATE POLICY "Admins can update howto articles"
  ON public.howto_articles FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete
CREATE POLICY "Admins can delete howto articles"
  ON public.howto_articles FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
