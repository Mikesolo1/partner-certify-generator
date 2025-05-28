
import React, { useState, useEffect } from 'react';
import { usePartners } from '@/contexts/PartnersContext';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { fetchTestQuestions } from '@/api/partnersApi/testQuestions';
import { TestQuestion } from '@/types';

const PartnerTestPage = () => {
  const { currentPartner, completeTest } = usePartners();
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | undefined>>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Загружаем актуальные вопросы теста при монтировании компонента
  useEffect(() => {
    const loadTestQuestions = async () => {
      try {
        setIsLoadingQuestions(true);
        const questions = await fetchTestQuestions();
        setTestQuestions(questions);
        setSelectedAnswers(new Array(questions.length));
      } catch (error) {
        console.error("Error loading test questions:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить вопросы теста",
          variant: "destructive",
        });
      } finally {
        setIsLoadingQuestions(false);
      }
    };

    loadTestQuestions();
  }, [toast]);

  if (isLoadingQuestions) {
    return (
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Тест для партнеров S3</h1>
          <p className="text-gray-600">Загрузка вопросов...</p>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">Загрузка...</div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  if (testQuestions.length === 0) {
    return (
      <DashboardLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Тест для партнеров S3</h1>
          <p className="text-gray-600">Вопросы теста не найдены</p>
        </div>
        <Card>
          <CardContent className="py-8">
            <div className="text-center">
              <p className="text-gray-500 mb-4">Вопросы теста пока не добавлены</p>
              <Button onClick={() => navigate('/dashboard')}>
                Вернуться в личный кабинет
              </Button>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }
  
  const currentQuestion = testQuestions[currentQuestionIndex];
  
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const goToNextQuestion = () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
      toast({
        title: "Выберите ответ",
        description: "Пожалуйста, выберите один из вариантов ответа.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestionIndex < testQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const calculateScore = () => {
    let correctAnswers = 0;
    testQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return {
      score: correctAnswers,
      total: testQuestions.length,
      percentage: (correctAnswers / testQuestions.length) * 100
    };
  };
  
  const handleCompleteTest = async () => {
    if (!currentPartner?.id) {
      toast({
        title: "Ошибка",
        description: "Сессия не найдена. Пожалуйста, войдите снова.",
        variant: "destructive",
      });
      return;
    }
    
    const result = calculateScore();
    
    if (result.percentage >= 60) {
      setIsSubmitting(true);
      
      try {
        console.log("Completing test for partner ID:", currentPartner.id);
        await completeTest(currentPartner.id);
        
        toast({
          title: "Тест пройден успешно!",
          description: `Вы правильно ответили на ${result.score} из ${result.total} вопросов. Сертификат доступен!`,
        });
        
        navigate('/dashboard/certificate');
      } catch (error) {
        console.error("Error completing test:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось обработать результаты теста. Пожалуйста, попробуйте снова.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      toast({
        title: "Тест не пройден",
        description: `Вы правильно ответили только на ${result.score} из ${result.total} вопросов. Требуется 60% для прохождения.`,
        variant: "destructive",
      });
      
      setCurrentQuestionIndex(0);
      setSelectedAnswers(new Array(testQuestions.length));
      setShowResults(false);
    }
  };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Тест для партнеров S3</h1>
        <p className="text-gray-600">
          Пройдите тест для получения доступа к вашему сертификату. Необходимо правильно ответить минимум на 60% вопросов.
        </p>
      </div>
      
      {showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>Результаты теста</CardTitle>
            <CardDescription>
              Проверьте ваши ответы и подтвердите завершение теста
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {testQuestions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              
              return (
                <div key={question.id} className="border-b pb-4">
                  <p className="font-medium mb-2">
                    {index + 1}. {question.question}
                  </p>
                  
                  <div className="ml-4">
                    <p>
                      Ваш ответ: <span className={isCorrect ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                        {question.options[selectedAnswers[index] as number]}
                      </span>
                    </p>
                    
                    {!isCorrect && (
                      <p className="text-green-600 mt-1">
                        Правильный ответ: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-lg font-medium">
                Ваш результат: {calculateScore().score} из {calculateScore().total} ({calculateScore().percentage.toFixed(0)}%)
              </p>
              <p className={calculateScore().percentage >= 60 ? "text-green-600" : "text-red-600"}>
                {calculateScore().percentage >= 60 
                  ? "Поздравляем! Вы успешно прошли тест."
                  : "К сожалению, вы не набрали достаточно баллов. Попробуйте еще раз."}
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-4">
            {calculateScore().percentage < 60 && (
              <Button variant="outline" onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswers(new Array(testQuestions.length));
                setShowResults(false);
              }}>
                Пройти заново
              </Button>
            )}
            <Button 
              onClick={handleCompleteTest} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Обработка...' : calculateScore().percentage >= 60 
                ? "Перейти к сертификату"
                : "Понятно"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Вопрос {currentQuestionIndex + 1} из {testQuestions.length}</CardTitle>
                <CardDescription>
                  Выберите один вариант ответа
                </CardDescription>
              </div>
              <div className="text-sm text-gray-500">
                {currentQuestionIndex + 1}/{testQuestions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-lg font-medium mb-4">{currentQuestion.question}</p>
              
              <RadioGroup 
                value={selectedAnswers[currentQuestionIndex]?.toString() || ''} 
                onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`answer-${index}`} />
                    <Label htmlFor={`answer-${index}`} className="cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Назад
            </Button>
            <Button onClick={goToNextQuestion}>
              {currentQuestionIndex < testQuestions.length - 1 ? "Далее" : "Завершить"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default PartnerTestPage;
