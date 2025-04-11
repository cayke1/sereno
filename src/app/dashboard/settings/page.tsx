"use client";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import Footer from "@/components/layout/Footer";
import { PatientManagement } from "@/components/settings/PatientManagement";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";
import { Card } from "@/components/ui/card";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/contexts/auth-context";
import { useEffect, useState } from "react";

export default function Settings() {
  const { user, isLoading } = useAuth();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsUserLoading(false);
    }
  }, [user, isLoading]);
  return isUserLoading ? (
    <LoadingScreen />
  ) : (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="flex-grow py-10 px-4 md:px-6 bg-slate-50">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-heading mb-2">
              Configurações da Conta
            </h1>
            <p className="text-muted-foreground">
              Gerencie seu perfil, assinatura e acesso dos pacientes.
            </p>
          </div>

          <Card className="p-6">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="subscription">Assinatura</TabsTrigger>
                <TabsTrigger value="patients">Pacientes</TabsTrigger>
              </TabsList>
              <TabsContent value="profile">
                <ProfileSettings
                  email={user?.email}
                  name={user?.name}
                  title="Example"
                  specialty="Example"
                />
              </TabsContent>
              <TabsContent value="subscription">
                <SubscriptionSettings professional_id={user!.id} />
              </TabsContent>
              <TabsContent value="patients">
                <PatientManagement />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
