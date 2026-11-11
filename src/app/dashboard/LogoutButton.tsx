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
      leftIcon={<LogOut className="w-4 h-4 mr-1 text-[#777777] dark:text-[#A3A3A3]" />}
      className="border-[#E8E8E6] dark:border-[#2A2A2A] hover:border-rose-300 dark:hover:border-rose-900/60 hover:text-rose-600 dark:hover:text-rose-400"
    >
      Log Out
    </Button>
  );
}
