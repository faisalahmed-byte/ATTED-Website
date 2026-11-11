import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { EditProfileForm } from "./EditProfileForm";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <MobileShell containerClassName="max-w-2xl">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 max-w-2xl w-full mx-auto">
        <Header backHref="/dashboard" title="Edit Profile" />

        <Card className="my-auto py-5 sm:py-7 px-5 sm:px-7 border-[#E8E8E6] dark:border-[#2A2A2A] animate-fadeIn">
          <EditProfileForm
            initialUser={{
              name: user.name,
              email: user.email,
              avatarUrl: user.avatarUrl || "",
              phone: user.phone || "",
              bio: user.bio || "",
            }}
          />
        </Card>

        {/* Reassurance Footer */}
        <p className="text-center text-xs text-[#777777] dark:text-[#A3A3A3] py-4">
          ATEDD AI &bull; Encrypted Session
        </p>
      </div>
    </MobileShell>
  );
}
