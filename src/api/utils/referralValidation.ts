
import { safeRPC } from '@/api/utils/queryHelpers';

export interface ReferralValidationResult {
  isValid: boolean;
  referrerId?: string;
  referrerName?: string;
  referrerCompany?: string;
  error?: string;
}

export const validateReferralCode = async (referralCode: string): Promise<ReferralValidationResult> => {
  if (!referralCode || referralCode.trim() === '') {
    return { isValid: false, error: 'Реферальный код не может быть пустым' };
  }

  try {
    console.log('Validating referral code:', referralCode);
    
    const { data, error } = await safeRPC(
      'validate_referral_code',
      { p_referral_code: referralCode.trim().toUpperCase() },
      { retries: 2, delay: 1000 }
    );

    if (error) {
      console.error('Error validating referral code:', error);
      return { isValid: false, error: 'Ошибка проверки реферального кода' };
    }

    if (!data || data.length === 0) {
      return { isValid: false, error: 'Реферальный код не найден' };
    }

    const result = data[0];
    
    if (!result.is_valid) {
      return { 
        isValid: false, 
        error: 'Реферальный код недействителен или партнер не прошел тест' 
      };
    }

    return {
      isValid: true,
      referrerId: result.referrer_id,
      referrerName: result.referrer_name,
      referrerCompany: result.referrer_company
    };

  } catch (error) {
    console.error('Exception validating referral code:', error);
    return { isValid: false, error: 'Произошла ошибка при проверке реферального кода' };
  }
};
