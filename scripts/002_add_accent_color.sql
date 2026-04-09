-- Add accent color column to posts table
-- Available accents: coral (default), sage, ocean, amber, plum, slate
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS accent TEXT DEFAULT 'coral';
