
import { TestQuestion } from '@/types';

export const testQuestions: TestQuestion[] = [
  {
    id: '1',
    question: 'Что такое WABA?',
    options: [
      'Web Application Business Account',
      'WhatsApp Business Account',
      'Wide Area Business Administration',
      'Wireless Application Business API'
    ],
    correctAnswer: 1
  },
  {
    id: '2',
    question: 'Какая основная услуга предоставляется компанией S3?',
    options: [
      'Облачное хранилище',
      'Интеграция WABA',
      'Электронная коммерция',
      'Системная аналитика'
    ],
    correctAnswer: 1
  },
  {
    id: '3',
    question: 'Какое преимущество дает интеграция WABA?',
    options: [
      'Увеличение скорости загрузки сайта',
      'Официальное использование WhatsApp API',
      'Доступ к Google Analytics',
      'Оптимизация для поисковых систем'
    ],
    correctAnswer: 1
  },
  {
    id: '4',
    question: 'Какой минимальный партнерский уровень необходим для получения сертификата?',
    options: [
      'Бронзовый',
      'Серебряный',
      'Золотой',
      'Любой уровень дает доступ к сертификату'
    ],
    correctAnswer: 3
  },
  {
    id: '5',
    question: 'Как начисляется партнерская комиссия?',
    options: [
      'Фиксированная сумма за каждого клиента',
      'Процент от суммы оплаты клиентов',
      'На основе количества интеграций',
      'Единоразовый бонус за регистрацию клиента'
    ],
    correctAnswer: 1
  }
];
