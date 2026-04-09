CREATE POLICY "Public can read published posts"
ON posts
FOR SELECT
TO anon, authenticated
USING (status = 'published');
