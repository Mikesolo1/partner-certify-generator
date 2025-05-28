
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import DashboardHeader from '@/components/DashboardHeader';

const ResetPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Новый пароль</CardTitle>
              <CardDescription>
                Введите новый пароль для вашего аккаунта
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
