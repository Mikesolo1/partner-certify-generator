
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

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
    (async () => {
      setLoading(true);
      const { data: partnerData } = await supabase.from("partners").select("*");
      setPartners(partnerData || []);
      const { data: clientData } = await supabase.from("clients").select("*");
      setClients(clientData || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Админка: управление пользователями и клиентами</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Загрузка...</div>
            ) : (
              <Tabs defaultValue="partners">
                <TabsList>
                  <TabsTrigger value="partners">Партнёры</TabsTrigger>
                  <TabsTrigger value="clients">Клиенты</TabsTrigger>
                </TabsList>
                <TabsContent value="partners">
                  <table className="w-full border mb-6">
                    <thead>
                      <tr>
                        <th className="p-2 text-left">Компания</th>
                        <th className="p-2 text-left">Контакт</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Статус</th>
                        <th className="p-2 text-left">Роль</th>
                      </tr>
                    </thead>
                    <tbody>
                      {partners.map((p) => (
                        <tr key={p.id}>
                          <td className="p-2">{p.company_name}</td>
                          <td className="p-2">{p.contact_person}</td>
                          <td className="p-2">{p.email}</td>
                          <td className="p-2">{p.test_passed ? "Тест пройден" : "Нет"}</td>
                          <td className="p-2">{p.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>
                <TabsContent value="clients">
                  <table className="w-full border">
                    <thead>
                      <tr>
                        <th className="p-2 text-left">Клиент</th>
                        <th className="p-2 text-left">Email</th>
                        <th className="p-2 text-left">Телефон</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((c) => (
                        <tr key={c.id}>
                          <td className="p-2">{c.name}</td>
                          <td className="p-2">{c.email}</td>
                          <td className="p-2">{c.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>
              </Tabs>
            )}
            <div className="mt-4">
              <Button onClick={() => window.location.reload()} className="bg-certificate-blue text-white">
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
