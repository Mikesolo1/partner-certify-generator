import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Users, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const PartnerProgramSection = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-black">Партнёрская программа S3</h2>
      <div className="space-y-6 text-lg text-gray-800">
        <p>
          Присоединяйтесь к партнёрской программе официального интегратора WABA (WhatsApp Business API) – компании S3 Tech!
        </p>
        <ul className="mb-3 list-disc ml-8">
          <li>Получайте до 20% комиссии от платежей ваших клиентов — вывод в любой момент.</li>
          <li>Доступ к персональному кабинету для управления клиентами и отслеживания выплат.</li>
          <li>Официальный именной сертификат партнёра WABA — доступен после онлайн-теста.</li>
          <li>Помощь персонального менеджера и техническая поддержка для вас и ваших клиентов.</li>
          <li>Разные уровни партнёрства: от Бронзового до Платинового, бонусы за активность!</li>
        </ul>
        <p>
          <span className="font-semibold text-certificate-blue">Как стать партнёром:</span><br />
          1. Зарегистрируйтесь на сайте.<br />
          2. Пройдите короткий сертификационный тест.<br />
          3. Получите доступ к сертификату и начните подключать клиентов к сервису WhatsApp Business API!
        </p>
        <p>
          <span className="font-semibold text-certificate-blue">Условия:</span> Партнёром может стать любая компания или индивидуальный предприниматель, сотрудничающий с бизнес-клиентами.
        </p>
        <p>
          <a href="https://s3-tech.ru/partner-program" target="_blank" rel="noopener noreferrer" className="underline text-certificate-darkBlue font-medium hover:opacity-80">Подробнее о программе на официальном сайте S3 →</a>
        </p>
      </div>
    </div>
  </section>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-brand/10 text-black py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black">Официальный интегратор WhatsApp Business API</h1>
            <p className="text-lg md:text-xl mb-8 text-gray-800">
              Автоматизируйте общение с клиентами через WhatsApp и повышайте эффективность вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-brand text-white hover:bg-brand/90 font-medium text-lg px-8 py-6"
              >
                Стать партнером
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/login')}
                className="bg-transparent text-black border-brand hover:bg-brand/10"
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
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Преимущества работы с нами</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 border-l-4 border-brand text-center">
              <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Официальная интеграция</h3>
              <p className="text-gray-700">
                Мы являемся официальным интегратором WhatsApp Business API, что гарантирует полное соответствие правилам и требованиям платформы.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 border-l-4 border-brand text-center">
              <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Выгодная партнерская программа</h3>
              <p className="text-gray-700">
                Получайте комиссию от платежей привлеченных клиентов и повышайте свой партнерский статус для увеличения дохода.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 border-l-4 border-brand text-center">
              <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-black">Техническая поддержка</h3>
              <p className="text-gray-700">
                Наша команда экспертов помогает с настройкой и интеграцией WhatsApp Business API для ваших клиентов.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <PartnerProgramSection />
      
      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">О компании S3 Tech</h2>
            <p className="text-lg text-gray-800 mb-6">
              S3 Tech – лидер в сфере интеграции WhatsApp Business API. Мы помогаем компаниям автоматизировать коммуникацию с клиентами через самый популярный мессенджер в мире.
            </p>
            <p className="text-lg text-gray-800 mb-6">
              Как официальный интегратор WABA (WhatsApp Business API), мы предоставляем полный спектр услуг по настройке и оптимизации бизнес-аккаунта WhatsApp для эффективного взаимодействия с клиентами.
            </p>
            <p className="text-lg text-gray-800">
              Наша миссия – сделать коммуникацию бизнеса с клиентами максимально эффективной и удобной через инновационные технологии обмена сообщениями.
            </p>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">Присоединяйтесь к партнерской программе</h2>
            <p className="text-lg text-gray-800 mb-8">
              Начните зарабатывать на интеграции WhatsApp Business API уже сегодня
            </p>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-brand text-white font-medium text-lg px-8 py-6 hover:bg-brand/90"
            >
              Зарегистрироваться как партнер
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white text-black py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="font-bold text-2xl text-black">S3</div>
            <div className="ml-2 text-xl font-medium text-gray-800">Tech</div>
          </div>
          <p className="text-gray-800">&copy; {new Date().getFullYear()} S3 Tech. Официальный интегратор WhatsApp Business API.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
