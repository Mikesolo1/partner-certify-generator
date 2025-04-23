import React from 'react';
import { Button } from '@/components/ui/button';
import { Award, ArrowRight, Users, FileText, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const PartnerProgramSection = () => (
  <section className="py-16 bg-gradient-to-br from-certificate-blue/10 via-white to-certificate-darkBlue/5">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-certificate-blue">Партнёрская программа S3</h2>
      <div className="space-y-6 text-lg text-gray-700">
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
    <div className="min-h-screen flex flex-col bg-brand-light">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand to-brand-dark text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{background: "radial-gradient(circle at 70% 30%, rgba(98, 207, 214, 0.18) 0%, transparent 80%)"}} />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand drop-shadow">Официальный интегратор WhatsApp Business API</h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Автоматизируйте общение с клиентами через WhatsApp и повышайте эффективность вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-white text-brand hover:bg-brand/10 font-medium text-lg px-8 py-6 border-2 border-brand shadow hover:shadow-lg hover:scale-105 transition"
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
          <h2 className="text-3xl font-bold text-center mb-12 text-brand">Преимущества работы с нами</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 border-l-8 border-brand text-center">
              <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand">Официальная интеграция</h3>
              <p className="text-gray-600">
                Мы являемся официальным интегратором WhatsApp Business API, что гарантирует полное соответствие правилам и требованиям платформы.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 border-l-8 border-brand text-center">
              <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand">Выгодная партнерская программа</h3>
              <p className="text-gray-600">
                Получайте комиссию от платежей привлеченных клиентов и повышайте свой партнерский статус для увеличения дохода.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition hover:scale-105 border-l-8 border-brand text-center">
              <div className="bg-brand/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand">Техническая поддержка</h3>
              <p className="text-gray-600">
                Наша команда экспертов помогает с настройкой и интеграцией WhatsApp Business API для ваших клиентов.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Новый раздел о партнёрской программе */}
      <PartnerProgramSection />
      
      {/* About Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-brand">О компании S3 Tech</h2>
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
      <section className="bg-brand-light py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-brand">Присоединяйтесь к партнерской программе</h2>
            <p className="text-lg text-gray-600 mb-8">
              Начните зарабатывать на интеграции WhatsApp Business API уже сегодня
            </p>
            <Button 
              onClick={() => navigate('/register')}
              className="bg-gradient-to-r from-brand to-brand-dark text-white font-medium text-lg px-8 py-6 hover:from-brand-dark hover:to-brand"
            >
              Зарегистрироваться как партнер
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-brand text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="font-bold text-2xl">S3</div>
            <div className="ml-2 text-xl font-medium text-brand-dark">Tech</div>
          </div>
          <p>&copy; {new Date().getFullYear()} S3 Tech. Официальный интегратор WhatsApp Business API.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
