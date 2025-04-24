
-- Function to check if a partner with the given email exists
CREATE OR REPLACE FUNCTION public.check_partner_exists(
  p_email TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  partner_exists BOOLEAN;
BEGIN
  SELECT EXISTS(SELECT 1 FROM partners WHERE LOWER(email) = LOWER(p_email)) INTO partner_exists;
  RETURN partner_exists;
END;
$$;
