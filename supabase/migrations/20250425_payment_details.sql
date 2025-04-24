
-- Function to save partner payment details
CREATE OR REPLACE FUNCTION public.save_partner_payment_details(
  p_partner_id UUID,
  p_payment_type TEXT,
  p_details JSONB,
  p_is_primary BOOLEAN DEFAULT FALSE
) RETURNS SETOF payment_details
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result payment_details;
BEGIN
  -- If marked as primary, unset all other payment methods as primary
  IF p_is_primary THEN
    UPDATE public.payment_details
    SET is_primary = FALSE
    WHERE partner_id = p_partner_id;
  END IF;

  -- Insert new payment details
  INSERT INTO public.payment_details (
    partner_id,
    payment_type,
    details,
    is_primary,
    created_at,
    updated_at
  ) VALUES (
    p_partner_id,
    p_payment_type,
    p_details,
    p_is_primary,
    NOW(),
    NOW()
  )
  RETURNING * INTO result;

  RETURN NEXT result;
END;
$$;
