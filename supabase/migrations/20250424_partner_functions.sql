
-- Function to get partner by credentials securely
CREATE OR REPLACE FUNCTION public.get_partner_by_credentials(
  p_email TEXT,
  p_password TEXT
)
RETURNS SETOF partners
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM partners
  WHERE email = p_email AND password = p_password
  LIMIT 1;
END;
$$;
