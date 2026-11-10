"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setIsLoggingOut(false);
    }
  };

  return (
    <Button
      variant="secondary"
      size="md"
      onClick={handleLogout}
      isLoading={isLoggingOut}
      leftIcon={<LogOut className="w-4 h-4 mr-1 text-rose-500" />}
      className="border-slate-200 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-900 hover:bg-rose-50/40 dark:hover:bg-rose-950/20"
    >
      Log Out
    </Button>
  );
}

