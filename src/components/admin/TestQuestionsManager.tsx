
import React, { useState } from 'react';
import { TestQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit, Trash } from 'lucide-react';

interface TestQuestionsManagerProps {
  questions: TestQuestion[];
  onUpdateQuestion: (question: TestQuestion) => void;
  onCreateQuestion: (question: Omit<TestQuestion, 'id'>) => void;
  onDeleteQuestion: (id: string) => void;
}

export const TestQuestionsManager: React.FC<TestQuestionsManagerProps> = ({
  questions,
  onUpdateQuestion,
  onCreateQuestion,
  onDeleteQuestion,
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<TestQuestion | null>(null);
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [formData, setFormData] = useState<Omit<TestQuestion, 'id'>>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0
  });

  const handleEditQuestion = (question: TestQuestion) => {
    setSelectedQuestion(question);
    setFormData({
      question: question.question,
      options: [...question.options],
      correctAnswer: question.correctAnswer
    });
  };

  const handleUpdateQuestion = () => {
    if (selectedQuestion) {
      onUpdateQuestion({
        ...formData,
        id: selectedQuestion.id
      });
      setSelectedQuestion(null);
    }
  };

  const handleFormChange = (field: keyof typeof formData, value: string | string[] | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    handleFormChange('options', newOptions);
  };

  const resetForm = () => {
    setFormData({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0
    });
  };

  const handleCreateQuestion = () => {
    onCreateQuestion(formData);
    resetForm();
    setIsCreatingQuestion(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Вопросы теста</h2>
        <Dialog open={isCreatingQuestion} onOpenChange={setIsCreatingQuestion}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Добавить вопрос
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Добавить новый вопрос</DialogTitle>
              <DialogDescription>
                Создайте новый вопрос для теста партнеров
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-question">Вопрос</Label>
                <Textarea
                  id="new-question"
                  value={formData.question}
                  onChange={(e) => handleFormChange('question', e.target.value)}
                  placeholder="Введите вопрос"
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label>Варианты ответов</Label>
                <div className="space-y-2 mt-2">
                  {formData.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Вариант ${index + 1}`}
                      />
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="correct-answer"
                          id={`option-${index}`}
                          checked={formData.correctAnswer === index}
                          onChange={() => handleFormChange('correctAnswer', index)}
                          className="mr-2"
                        />
                        <Label htmlFor={`option-${index}`}>Верный</Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsCreatingQuestion(false)} variant="outline">Отмена</Button>
              <Button onClick={handleCreateQuestion} disabled={!formData.question || formData.options.some(o => !o)}>
                Создать
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {questions.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((question) => (
            <Card key={question.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-md">{question.question}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {question.options.map((option, index) => (
                    <li 
                      key={index}
                      className={`p-2 rounded ${
                        index === question.correctAnswer 
                          ? 'bg-green-100 border border-green-300' 
                          : 'bg-gray-50'
                      }`}
                    >
                      {option}
                      {index === question.correctAnswer && (
                        <span className="text-green-600 ml-2 text-sm">(Правильный)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t pt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditQuestion(question)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Изменить
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Редактировать вопрос</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-question">Вопрос</Label>
                        <Textarea
                          id="edit-question"
                          value={formData.question}
                          onChange={(e) => handleFormChange('question', e.target.value)}
                          placeholder="Введите вопрос"
                          className="min-h-[80px]"
                        />
                      </div>
                      <div>
                        <Label>Варианты ответов</Label>
                        <div className="space-y-2 mt-2">
                          {formData.options.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                placeholder={`Вариант ${index + 1}`}
                              />
                              <div className="flex items-center">
                                <input
                                  type="radio"
                                  name="correct-answer-edit"
                                  id={`edit-option-${index}`}
                                  checked={formData.correctAnswer === index}
                                  onChange={() => handleFormChange('correctAnswer', index)}
                                  className="mr-2"
                                />
                                <Label htmlFor={`edit-option-${index}`}>Верный</Label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => setSelectedQuestion(null)} variant="outline">Отмена</Button>
                      <Button 
                        onClick={handleUpdateQuestion}
                        disabled={!formData.question || formData.options.some(o => !o)}
                      >
                        Сохранить
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash className="h-4 w-4 mr-1" /> Удалить
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие нельзя отменить. Вопрос будет удален навсегда.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Отмена</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteQuestion(question.id)}>
                        Удалить
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border rounded">
          <p className="text-gray-500 mb-4">Нет вопросов для отображения</p>
          <Button onClick={() => setIsCreatingQuestion(true)}>Добавить первый вопрос</Button>
        </div>
      )}
    </div>
  );
};
