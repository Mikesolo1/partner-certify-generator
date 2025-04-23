
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegisterForm from '@/components/RegisterForm';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Регистрация партнера</CardTitle>
              <CardDescription>
                Станьте партнером S3 и начните зарабатывать с нами
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Уже зарегистрированы? <Link to="/login" className="text-certificate-blue hover:underline">Вход</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
