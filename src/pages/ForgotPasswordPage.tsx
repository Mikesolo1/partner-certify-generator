
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ForgotPasswordForm from '@/components/ForgotPasswordForm';
import DashboardHeader from '@/components/DashboardHeader';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Восстановление пароля</CardTitle>
              <CardDescription>
                Введите ваш email адрес и мы отправим ссылку для восстановления пароля
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ForgotPasswordForm />
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Вспомнили пароль? <Link to="/login" className="text-certificate-blue hover:underline">Войти</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
