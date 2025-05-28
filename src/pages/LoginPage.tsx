
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { usePartners } from '@/contexts/PartnersContext';
import LoginForm from '@/components/LoginForm';
import DashboardHeader from '@/components/DashboardHeader';

const LoginPage = () => {
  const { currentPartner, loading } = usePartners();

  // Если идет загрузка, показываем загрузку
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  // Если пользователь уже авторизован, перенаправляем на дашборд
  if (currentPartner) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Вход в личный кабинет</CardTitle>
              <CardDescription>
                Войдите, чтобы получить доступ к сертификатам и управлению клиентами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Еще не зарегистрированы? <Link to="/register" className="text-certificate-blue hover:underline">Регистрация</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
