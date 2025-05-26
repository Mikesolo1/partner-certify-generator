
import React from 'react';
import { TestQuestion } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TestQuestionsTableProps {
  testQuestions: TestQuestion[];
  setTestQuestions: React.Dispatch<React.SetStateAction<TestQuestion[]>>;
  loading: boolean;
}

export const TestQuestionsTable: React.FC<TestQuestionsTableProps> = ({
  testQuestions,
  setTestQuestions,
  loading
}) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Вопросы теста</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Загрузка вопросов...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Вопросы теста ({testQuestions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {testQuestions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">{index + 1}. {question.question}</h4>
              <div className="space-y-1">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex} 
                    className={`p-2 rounded ${
                      optionIndex === question.correctAnswer 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-50'
                    }`}
                  >
                    {optionIndex + 1}. {option}
                    {optionIndex === question.correctAnswer && (
                      <span className="ml-2 font-semibold">(Правильный ответ)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
