import React from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { EditProfileForm } from "./EditProfileForm";

export const dynamic = "force-dynamic";

export default async function EditProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <MobileShell>
      <div className="flex flex-col min-h-full pb-4">
        <Header backHref="/dashboard" title="Edit Profile" />

        <div className="flex-1 py-2">
          <EditProfileForm
            initialUser={{
              name: user.name,
              email: user.email,
              avatarUrl: user.avatarUrl || "",
              phone: user.phone || "",
              bio: user.bio || "",
            }}
          />
        </div>
      </div>
    </MobileShell>
  );
}
