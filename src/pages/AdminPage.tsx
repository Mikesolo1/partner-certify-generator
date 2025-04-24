
import React, { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { usePartners } from "@/contexts/PartnersContext";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/alert-dialog";

interface PartnerRow {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  partner_level: string;
  role: string;
  test_passed: boolean;
}

interface ClientRow {
  id: string;
  partner_id: string;
  name: string;
  email: string;
  phone: string;
}

interface PaymentRow {
  id: string;
  client_id: string;
  amount: number;
  date: string;
  status: string;
  commission_amount: number;
}

interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

interface Notification {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const AdminPage = () => {
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentPartner } = usePartners();

  useEffect(() => {
    // Проверка, что доступ к админке имеет только администратор
    const checkAdminAccess = async () => {
      if (!currentPartner || currentPartner.role !== 'admin') {
        toast({
          title: "Доступ запрещен",
          description: "У вас нет доступа к этой странице",
          variant: "destructive",
        });
        navigate('/dashboard');
      } else {
        // Загрузка данных, если пользователь админ
        fetchData();
      }
    };
    
    checkAdminAccess();
  }, [currentPartner, navigate, toast]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Загрузка партнеров
      const { data: partnerData, error: partnerError } = await supabase
        .from("partners")
        .select("*");
      
      if (partnerError) {
        console.error("Error fetching partners:", partnerError);
        toast({
          title: "Ошибка загрузки",
          description: "Не удалось загрузить список партнеров",
          variant: "destructive",
        });
      } else {
        setPartners(partnerData || []);
      }
      
      // Загрузка клиентов
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("*");
      
      if (clientError) {
        console.error("Error fetching clients:", clientError);
      } else {
        setClients(clientData || []);
      }
      
      // Загрузка платежей
      const { data: paymentData, error: paymentError } = await supabase
        .from("payments")
        .select("*");
        
      if (paymentError) {
        console.error("Error fetching payments:", paymentError);
      } else {
        setPayments(paymentData || []);
      }
      
      // Загрузка вопросов теста
      const { data: questionsData, error: questionsError } = await supabase
        .from("test_questions")
        .select("*");
        
      if (questionsError) {
        console.error("Error fetching test questions:", questionsError);
      } else {
        setTestQuestions(questionsData || []);
      }
      
      // Загрузка уведомлений
      const { data: notificationsData, error: notificationsError } = await supabase
        .from("notifications")
        .select("*")
        .order('created_at', { ascending: false });
        
      if (notificationsError) {
        console.error("Error fetching notifications:", notificationsError);
      } else {
        setNotifications(notificationsData || []);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Ошибка",
        description: "Произошла непредвиденная ошибка при загрузке данных",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updatePartnerRole = async (partnerId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('partners')
        .update({ role: newRole })
        .eq('id', partnerId);
        
      if (error) {
        throw error;
      }
      
      setPartners(partners.map(partner => 
        partner.id === partnerId ? { ...partner, role: newRole } : partner
      ));
      
      toast({
        title: "Роль обновлена",
        description: "Роль партнера успешно изменена",
      });
    } catch (error) {
      console.error("Error updating partner role:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить роль партнера",
        variant: "destructive",
      });
    }
  };
  
  const createNewNotification = async (title: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([{ title, content }])
        .select();
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setNotifications([...data, ...notifications]);
        toast({
          title: "Уведомление создано",
          description: "Новое уведомление успешно добавлено",
        });
      }
    } catch (error) {
      console.error("Error creating notification:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать уведомление",
        variant: "destructive",
      });
    }
  };
  
  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin':
        return <Badge className="bg-purple-600">Администратор</Badge>;
      case 'partner':
        return <Badge className="bg-blue-600">Партнер</Badge>;
      default:
        return <Badge className="bg-gray-600">Пользователь</Badge>;
    }
  };
  
  const getTestStatusBadge = (passed: boolean) => {
    return passed 
      ? <Badge className="bg-green-600">Пройден</Badge>
      : <Badge className="bg-yellow-600">Не пройден</Badge>;
  };
  
  const getPartnerClients = (partnerId: string) => {
    return clients.filter(client => client.partner_id === partnerId);
  };
  
  const getClientPayments = (clientId: string) => {
    return payments.filter(payment => payment.client_id === clientId);
  };
  
  const getTotalEarnings = (partnerId: string) => {
    const partnerClients = getPartnerClients(partnerId);
    let total = 0;
    
    partnerClients.forEach(client => {
      const clientPayments = getClientPayments(client.id);
      clientPayments.forEach(payment => {
        if (payment.status === 'оплачено') {
          total += payment.commission_amount;
        }
      });
    });
    
    return total;
  };

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand">Админка: управление пользователями и данными</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-brand">Загрузка данных...</p>
              </div>
            ) : (
              <Tabs defaultValue="partners">
                <TabsList className="mb-6">
                  <TabsTrigger value="partners">Партнёры</TabsTrigger>
                  <TabsTrigger value="clients">Клиенты</TabsTrigger>
                  <TabsTrigger value="payments">Платежи</TabsTrigger>
                  <TabsTrigger value="test">Редактор теста</TabsTrigger>
                  <TabsTrigger value="notifications">Уведомления</TabsTrigger>
                </TabsList>
                
                <TabsContent value="partners">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Компания</TableHead>
                          <TableHead>Контакт</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Статус теста</TableHead>
                          <TableHead>Роль</TableHead>
                          <TableHead>Уровень</TableHead>
                          <TableHead>Клиентов</TableHead>
                          <TableHead>Заработано</TableHead>
                          <TableHead>Действия</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partners.length > 0 ? (
                          partners.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell className="font-medium">{p.company_name}</TableCell>
                              <TableCell>{p.contact_person}</TableCell>
                              <TableCell>{p.email}</TableCell>
                              <TableCell>{getTestStatusBadge(p.test_passed)}</TableCell>
                              <TableCell>{getRoleBadge(p.role)}</TableCell>
                              <TableCell>{p.partner_level}</TableCell>
                              <TableCell>{getPartnerClients(p.id).length}</TableCell>
                              <TableCell>{getTotalEarnings(p.id).toLocaleString('ru-RU')} ₽</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="outline">Сменить роль</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Изменить роль пользователя</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Выберите новую роль для пользователя {p.contact_person}
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <div className="flex flex-col gap-2 my-4">
                                        <Button 
                                          variant={p.role === 'admin' ? "default" : "outline"} 
                                          onClick={() => updatePartnerRole(p.id, 'admin')}
                                        >
                                          Администратор
                                        </Button>
                                        <Button 
                                          variant={p.role === 'partner' ? "default" : "outline"}
                                          onClick={() => updatePartnerRole(p.id, 'partner')}
                                        >
                                          Партнер
                                        </Button>
                                        <Button 
                                          variant={p.role === 'user' ? "default" : "outline"}
                                          onClick={() => updatePartnerRole(p.id, 'user')}
                                        >
                                          Пользователь
                                        </Button>
                                      </div>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                  
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => setSelectedPartnerId(p.id === selectedPartnerId ? null : p.id)}
                                  >
                                    {p.id === selectedPartnerId ? "Скрыть" : "Детали"}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={9} className="text-center py-4">Нет данных</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {selectedPartnerId && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Клиенты партнера</h3>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Имя</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Телефон</TableHead>
                              <TableHead>Дата регистрации</TableHead>
                              <TableHead>Платежи</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getPartnerClients(selectedPartnerId).length > 0 ? (
                              getPartnerClients(selectedPartnerId).map(client => (
                                <TableRow key={client.id}>
                                  <TableCell>{client.name}</TableCell>
                                  <TableCell>{client.email}</TableCell>
                                  <TableCell>{client.phone || "—"}</TableCell>
                                  <TableCell>
                                    {new Date(client.date || client.registration_date).toLocaleDateString('ru-RU')}
                                  </TableCell>
                                  <TableCell>
                                    {getClientPayments(client.id).length} платежей на сумму{" "}
                                    {getClientPayments(client.id)
                                      .reduce((sum, payment) => sum + payment.amount, 0)
                                      .toLocaleString('ru-RU')} ₽
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={5} className="text-center py-4">У партнера нет клиентов</TableCell>
                              </TableRow>
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="clients">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Клиент</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Телефон</TableHead>
                          <TableHead>Партнер</TableHead>
                          <TableHead>Дата регистрации</TableHead>
                          <TableHead>Платежи</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients.length > 0 ? (
                          clients.map((c) => {
                            const partner = partners.find(p => p.id === c.partner_id);
                            const clientPayments = getClientPayments(c.id);
                            
                            return (
                              <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>{c.phone || "—"}</TableCell>
                                <TableCell>{partner ? partner.company_name : "—"}</TableCell>
                                <TableCell>
                                  {new Date(c.registration_date).toLocaleDateString('ru-RU')}
                                </TableCell>
                                <TableCell>
                                  {clientPayments.length} платежей на сумму{" "}
                                  {clientPayments
                                    .reduce((sum, payment) => sum + payment.amount, 0)
                                    .toLocaleString('ru-RU')} ₽
                                </TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">Нет данных</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="payments">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Сумма</TableHead>
                          <TableHead>Комиссия</TableHead>
                          <TableHead>Дата</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Клиент</TableHead>
                          <TableHead>Партнер</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payments.length > 0 ? (
                          payments.map((p) => {
                            const client = clients.find(c => c.id === p.client_id);
                            const partner = client 
                              ? partners.find(partner => partner.id === client.partner_id)
                              : null;
                              
                            return (
                              <TableRow key={p.id}>
                                <TableCell className="font-medium">
                                  {p.amount.toLocaleString('ru-RU')} ₽
                                </TableCell>
                                <TableCell className="text-green-600 font-medium">
                                  {p.commission_amount.toLocaleString('ru-RU')} ₽
                                </TableCell>
                                <TableCell>{new Date(p.date).toLocaleDateString('ru-RU')}</TableCell>
                                <TableCell>
                                  <Badge className={
                                    p.status === 'оплачено' 
                                      ? 'bg-green-600' 
                                      : p.status === 'в ожидании' 
                                        ? 'bg-yellow-600' 
                                        : 'bg-red-600'
                                  }>
                                    {p.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{client ? client.name : "—"}</TableCell>
                                <TableCell>{partner ? partner.company_name : "—"}</TableCell>
                              </TableRow>
                            );
                          })
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-4">Нет данных</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="test">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Вопросы теста для партнеров</h3>
                    <div className="space-y-6">
                      {testQuestions.map((question, index) => (
                        <Card key={question.id}>
                          <CardHeader>
                            <CardTitle className="text-base">
                              Вопрос {index + 1}: {question.question}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {question.options.map((option, optIndex) => (
                                <div 
                                  key={optIndex} 
                                  className={`p-3 border rounded-md ${
                                    question.correct_answer === optIndex 
                                      ? "border-green-600 bg-green-50" 
                                      : "border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <span className="font-medium mr-2">{optIndex + 1}.</span>
                                    <span>{option}</span>
                                    {question.correct_answer === optIndex && (
                                      <Badge className="ml-auto bg-green-600">Правильный ответ</Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => toast({
                    title: "Функциональность в разработке",
                    description: "Редактор теста будет доступен в следующем обновлении"
                  })}>
                    Добавить новый вопрос
                  </Button>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <div className="mb-6 space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Создать новое уведомление</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const title = (form.elements.namedItem('title') as HTMLInputElement).value;
                            const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
                            
                            if (title && content) {
                              createNewNotification(title, content);
                              form.reset();
                            } else {
                              toast({
                                title: "Ошибка",
                                description: "Заполните все поля",
                                variant: "destructive",
                              });
                            }
                          }}
                          className="space-y-4"
                        >
                          <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">
                              Заголовок уведомления
                            </label>
                            <input
                              id="title"
                              name="title"
                              className="w-full p-2 border rounded-md"
                              placeholder="Введите заголовок..."
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="content" className="text-sm font-medium">
                              Содержание уведомления
                            </label>
                            <textarea
                              id="content"
                              name="content"
                              className="w-full p-2 border rounded-md min-h-[100px]"
                              placeholder="Введите текст уведомления..."
                              required
                            />
                          </div>
                          
                          <Button type="submit">Опубликовать уведомление</Button>
                        </form>
                      </CardContent>
                    </Card>
                    
                    <h3 className="text-lg font-medium mt-6 mb-4">Опубликованные уведомления</h3>
                    
                    {notifications.length > 0 ? (
                      <div className="space-y-4">
                        {notifications.map((note) => (
                          <Card key={note.id}>
                            <CardHeader>
                              <CardTitle className="text-lg">{note.title}</CardTitle>
                              <p className="text-sm text-gray-500">
                                Опубликовано: {new Date(note.created_at).toLocaleString('ru-RU')}
                              </p>
                            </CardHeader>
                            <CardContent>
                              <p className="whitespace-pre-line">{note.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 border rounded-md">
                        <p className="text-gray-500">Нет опубликованных уведомлений</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <div className="mt-4">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-brand text-white"
              >
                Обновить данные
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
