
-- Function to get partner by credentials securely
CREATE OR REPLACE FUNCTION public.get_partner_by_credentials(
  p_email TEXT,
  p_password TEXT
)
RETURNS SETOF partners
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM partners
  WHERE LOWER(email) = LOWER(p_email) AND password = p_password
  LIMIT 1;
END;
$$;

-- Function to insert partner securely bypassing RLS
CREATE OR REPLACE FUNCTION public.insert_partner_direct(
  p_company_name TEXT,
  p_contact_person TEXT,
  p_email TEXT,
  p_password TEXT,
  p_partner_level TEXT DEFAULT 'Бронзовый',
  p_certificate_id TEXT DEFAULT NULL,
  p_commission INTEGER DEFAULT 20
)
RETURNS SETOF partners
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  partner_record partners;
  new_certificate_id TEXT;
BEGIN
  -- Generate certificate ID if not provided
  IF p_certificate_id IS NULL THEN
    new_certificate_id := 'CERT-' || floor(random() * 900000 + 100000)::text;
  ELSE
    new_certificate_id := p_certificate_id;
  END IF;
  
  -- Insert directly into partners table, bypassing all RLS policies
  INSERT INTO partners (
    company_name,
    contact_person,
    email,
    password,
    partner_level,
    join_date,
    certificate_id,
    test_passed,
    commission,
    role
  ) VALUES (
    p_company_name,
    p_contact_person,
    LOWER(p_email),
    p_password,
    p_partner_level,
    now(),
    new_certificate_id,
    FALSE,
    p_commission,
    'partner'  -- изменено с 'user' на 'partner'
  )
  RETURNING * INTO partner_record;
  
  -- Return the newly created partner
  RETURN NEXT partner_record;
END;
$$;
