
import React, { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";

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

const AdminPage = () => {
  const [partners, setPartners] = useState<PartnerRow[]>([]);
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: partnerData, error: partnerError } = await supabase.from("partners").select("*");
        
        if (partnerError) {
          console.error("Error fetching partners:", partnerError);
        } else {
          setPartners(partnerData || []);
        }
        
        const { data: clientData, error: clientError } = await supabase.from("clients").select("*");
        
        if (clientError) {
          console.error("Error fetching clients:", clientError);
        } else {
          setClients(clientData || []);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-brand">Админка: управление пользователями и клиентами</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-brand">Загрузка данных...</p>
              </div>
            ) : (
              <Tabs defaultValue="partners">
                <TabsList>
                  <TabsTrigger value="partners">Партнёры</TabsTrigger>
                  <TabsTrigger value="clients">Клиенты</TabsTrigger>
                </TabsList>
                <TabsContent value="partners">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-brand">Компания</TableHead>
                          <TableHead className="text-brand">Контакт</TableHead>
                          <TableHead className="text-brand">Email</TableHead>
                          <TableHead className="text-brand">Статус</TableHead>
                          <TableHead className="text-brand">Роль</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partners.length > 0 ? (
                          partners.map((p) => (
                            <TableRow key={p.id}>
                              <TableCell className="font-medium">{p.company_name}</TableCell>
                              <TableCell>{p.contact_person}</TableCell>
                              <TableCell>{p.email}</TableCell>
                              <TableCell>{p.test_passed ? "Тест пройден" : "Нет"}</TableCell>
                              <TableCell>{p.role}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">Нет данных</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="clients">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-brand">Клиент</TableHead>
                          <TableHead className="text-brand">Email</TableHead>
                          <TableHead className="text-brand">Телефон</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients.length > 0 ? (
                          clients.map((c) => (
                            <TableRow key={c.id}>
                              <TableCell className="font-medium">{c.name}</TableCell>
                              <TableCell>{c.email}</TableCell>
                              <TableCell>{c.phone || "—"}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4">Нет данных</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            )}
            <div className="mt-4">
              <Button onClick={() => window.location.reload()} className="bg-brand text-white">
                Обновить
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
