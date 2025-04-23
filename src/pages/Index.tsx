
import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Users, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Официальный интегратор WhatsApp Business API</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Автоматизируйте общение с клиентами через WhatsApp и повышайте эффективность вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-white text-certificate-blue hover:bg-gray-100 font-medium text-lg px-8 py-6"
              >
                Стать партнером
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="bg-transparent text-white border-white hover:bg-white/10 font-medium text-lg px-8 py-6"
              >
                Войти
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Преимущества работы с нами</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-certificate-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-certificate-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Официальная интеграция</h3>
              <p className="text-gray-600">
                Мы являемся официальным интегратором WhatsApp Business API, что гарантирует полное соответствие правилам и требованиям платформы.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-certificate-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-certificate-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Выгодная партнерская программа</h3>
              <p className="text-gray-600">
                Получайте комиссию от платежей привлеченных клиентов и повышайте свой партнерский статус для увеличения дохода.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-certificate-blue/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-certificate-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Техническая поддержка</h3>
              <p className="text-gray-600">
                Наша команда экспертов помогает с настройкой и интеграцией WhatsApp Business API для ваших клиентов.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">О компании S3 Tech</h2>
            <p className="text-lg text-gray-600 mb-6">
              S3 Tech – лидер в сфере интеграции WhatsApp Business API. Мы помогаем компаниям автоматизировать коммуникацию с клиентами через самый популярный мессенджер в мире.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Как официальный интегратор WABA (WhatsApp Business API), мы предоставляем полный спектр услуг по настройке и оптимизации бизнес-аккаунта WhatsApp для эффективного взаимодействия с клиентами.
            </p>
            <p className="text-lg text-gray-600">
              Наша миссия – сделать коммуникацию бизнеса с клиентами максимально эффективной и удобной через инновационные технологии обмена сообщениями.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Присоединяйтесь к партнерской программе</h2>
            <p className="text-lg text-gray-600 mb-8">
              Начните зарабатывать на интеграции WhatsApp Business API уже сегодня
            </p>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-certificate-blue to-certificate-darkBlue text-white font-medium text-lg px-8 py-6"
            >
              Зарегистрироваться как партнер
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="font-bold text-2xl">S3</div>
            <div className="ml-2 text-xl font-medium text-gray-300">Tech</div>
          </div>
          <p>&copy; {new Date().getFullYear()} S3 Tech. Официальный интегратор WhatsApp Business API.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
