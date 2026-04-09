-- Create posts table for the blog
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policy for public to read published posts
CREATE POLICY "Anyone can read published posts" ON posts
  FOR SELECT
  USING (status = 'published');

-- Policy for authenticated users to manage their own posts
CREATE POLICY "Authors can manage their own posts" ON posts
  FOR ALL
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Create index for faster slug lookups
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts(slug);

-- Create index for faster status filtering
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts(status);

-- Create index for ordering by published_at
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts(published_at DESC);
