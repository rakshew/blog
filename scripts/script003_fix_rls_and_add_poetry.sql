-- admin can manage everything
CREATE POLICY "Authenticated users can manage posts"
ON posts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- public can only read published posts
CREATE POLICY "Public can read published posts"
ON posts
FOR SELECT
TO anon, authenticated
USING (status = 'published');
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
