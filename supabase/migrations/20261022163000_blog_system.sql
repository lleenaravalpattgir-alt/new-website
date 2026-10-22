-- Migration: 20261022163000_blog_system.sql
-- Description: Create blog_posts and blog_categories tables with Row Level Security (RLS)

-- 1. Create blog_categories table
CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  seo_title TEXT,
  meta_description TEXT,
  excerpt TEXT,
  category TEXT NOT NULL,
  category_slug TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Leena Raval',
  author_role TEXT DEFAULT 'Founder & Strategic Growth Advisor, Rise Advisory',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  published_date TEXT,
  updated_date TEXT,
  scheduled_date TIMESTAMPTZ,
  read_time TEXT DEFAULT '5 min read',
  featured BOOLEAN NOT NULL DEFAULT false,
  primary_keyword TEXT,
  secondary_keywords TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  image_url TEXT DEFAULT '/logo.png',
  image_alt TEXT,
  canonical_url TEXT,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  toc JSONB DEFAULT '[]'::jsonb,
  related_service JSONB,
  disclaimer TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Grants
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT SELECT ON public.blog_categories TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_categories TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
GRANT ALL ON public.blog_categories TO service_role;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

-- 5. Policies for blog_posts
-- Public visitors can only view published posts
CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Authenticated admins can view all posts (including drafts and scheduled)
CREATE POLICY "Admins can view all blog posts"
  ON public.blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can insert new posts
CREATE POLICY "Admins can insert blog posts"
  ON public.blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated admins can update posts
CREATE POLICY "Admins can update blog posts"
  ON public.blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated admins can delete posts
CREATE POLICY "Admins can delete blog posts"
  ON public.blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Policies for blog_categories
CREATE POLICY "Public can view categories"
  ON public.blog_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.blog_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Indexes for performance
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_idx ON public.blog_posts (status);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON public.blog_posts (category_slug);
CREATE INDEX IF NOT EXISTS blog_posts_updated_at_idx ON public.blog_posts (updated_at DESC);
