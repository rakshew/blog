ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS cover_image_url text,
ADD COLUMN IF NOT EXISTS cover_image_alt text,
ADD COLUMN IF NOT EXISTS cover_image_caption text,
ADD COLUMN IF NOT EXISTS newsletter_sent_at timestamptz;

CREATE TABLE IF NOT EXISTS public.subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  confirmation_token uuid NOT NULL DEFAULT gen_random_uuid(),
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  CONSTRAINT subscribers_status_check CHECK (status IN ('pending', 'active', 'unsubscribed'))
);

CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_lower_unique ON public.subscribers (lower(email));
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_confirmation_token_unique ON public.subscribers (confirmation_token);
CREATE UNIQUE INDEX IF NOT EXISTS subscribers_unsubscribe_token_unique ON public.subscribers (unsubscribe_token);
