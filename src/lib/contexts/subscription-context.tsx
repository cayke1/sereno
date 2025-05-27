"use client";
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { subscriptionService } from "../services/subscription";
import { useRouter } from "next/navigation";

interface SubscriptionContextType {
  isLoading: boolean;
  handleCheckout(plan: "basic" | "unlimited"): Promise<void>;
  handleCancel(professional_id: string): Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined
);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (plan: "basic" | "unlimited") => {
    setIsLoading(true);
    toast.loading("Processando link de checkout...");
    try {
      const response = await subscriptionService.checkout(plan);
      const { checkout_url } = response;
      router.push(checkout_url);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro durante o checkout");
      }
    }
  };

  const handleCancel = async (professional_id: string) => {
    const req = await subscriptionService.cancel(professional_id);
    return req;
  };

  return (
    <SubscriptionContext.Provider
      value={{ isLoading, handleCheckout, handleCancel }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider"
    );
  }
  return context;
}
