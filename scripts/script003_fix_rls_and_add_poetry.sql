-- Drop old restrictive policies
DROP POLICY IF EXISTS "Authors can manage their own posts" ON posts;

-- Make author_id nullable (single admin blog doesn't need it)
ALTER TABLE posts ALTER COLUMN author_id DROP NOT NULL;

-- Add poetry mode column
ALTER TABLE posts ADD COLUMN IF NOT EXISTS is_poetry BOOLEAN DEFAULT false;

-- Create simple admin policy - any authenticated user can manage posts
CREATE POLICY "Authenticated users can manage posts" ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
