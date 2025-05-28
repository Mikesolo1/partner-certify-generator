
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateReferralCode } from '@/api/partnersApi/referrals';
import { usePartners } from '@/contexts/PartnersContext';

const ReferralLink = () => {
  const { currentPartner } = usePartners();
  const { toast } = useToast();
  const [referralCode, setReferralCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentPartner?.referralCode || currentPartner?.referral_code) {
      setReferralCode(currentPartner.referralCode || currentPartner.referral_code || '');
    } else if (currentPartner?.id && currentPartner?.testPassed && (currentPartner?.referralAccessEnabled || currentPartner?.referral_access_enabled)) {
      // Генерируем реферальный код если его нет и есть доступ
      generateCode();
    }
  }, [currentPartner]);

  const generateCode = async () => {
    if (!currentPartner?.id) return;
    
    setLoading(true);
    try {
      const code = await generateReferralCode(currentPartner.id);
      setReferralCode(code);
      
      toast({
        title: "Реферальный код создан",
        description: "Ваш реферальный код готов к использованию!",
      });
    } catch (error) {
      console.error("Error generating referral code:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать реферальный код",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const referralUrl = referralCode ? 
    `${window.location.origin}/register?ref=${referralCode}` : '';

  const copyToClipboard = async () => {
    if (!referralUrl) return;
    
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Ссылка скопирована",
        description: "Реферальная ссылка скопирована в буфер обмена",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ссылку",
        variant: "destructive",
      });
    }
  };

  // Проверяем доступ к реферальной программе
  if (!currentPartner?.testPassed || (!currentPartner?.referralAccessEnabled && !currentPartner?.referral_access_enabled)) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Реферальная программа
        </CardTitle>
        <CardDescription>
          Приглашайте новых партнеров и получайте 3% от их комиссий
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {referralCode ? (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ваша реферальная ссылка</label>
              <div className="flex gap-2">
                <Input
                  value={referralUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ваш реферальный код</label>
              <div className="flex gap-2">
                <Input
                  value={referralCode}
                  readOnly
                  className="font-mono text-sm font-bold"
                />
                <Button
                  onClick={() => navigator.clipboard.writeText(referralCode)}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Как это работает:</strong> Когда новый партнер регистрируется по вашей ссылке, 
                вы будете получать 3% от комиссий их клиентов.
              </p>
            </div>
          </>
        ) : (
          <Button 
            onClick={generateCode} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Создание..." : "Создать реферальную ссылку"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReferralLink;
