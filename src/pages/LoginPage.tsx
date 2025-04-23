
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
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
