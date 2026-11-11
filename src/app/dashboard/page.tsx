import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Mail,
  Phone,
  FileText,
  Edit3,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { getFirstName, formatName } from "@/lib/utils";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { LogoutButton } from "./LogoutButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const firstName = getFirstName(user.name);
  const displayName = formatName(user.name);
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <MobileShell containerClassName="max-w-xl">
      <div className="flex flex-col min-h-[90vh] justify-between flex-1 w-full mx-auto">
        {/* Top Header */}
        <Header showBrand />

        {/* Personalized Welcome */}
        <div className="my-auto py-4 sm:py-6 w-full animate-fadeIn">
          <div className="mb-6 text-left">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171717] dark:text-[#F7F7F5]">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#777777] dark:text-[#A3A3A3] mt-1">
              Here is your ATTED AI profile overview.
            </p>
          </div>

          {/* Profile Overview Card */}
          <Card className="p-6 sm:p-8 border-[#E8E8E6] dark:border-[#2A2A2A] shadow-sm mb-5">
            {/* Main Identity Banner */}
            <div className="flex flex-col items-center text-center pb-6 border-b border-[#E8E8E6] dark:border-[#2A2A2A] relative">
              <Avatar
                name={user.name}
                src={user.avatarUrl}
                size="xl"
                showBadge
                className="mb-3 ring-2 ring-[#D5AD55]/70"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717] dark:text-[#F7F7F5]">
                {displayName}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-black/5 dark:bg-white/5 text-xs text-[#777777] dark:text-[#A3A3A3] font-medium">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[240px]">{user.email}</span>
              </div>

              {/* Subtle gold accent divider */}
              <div className="w-12 h-0.5 bg-[#D5AD55]/50 mx-auto mt-4" />
            </div>

            {/* Profile Fields List */}
            <div className="pt-5 space-y-4 text-sm">
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#D5AD55] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#A3A3A3] uppercase tracking-wider">
                    Phone Number
                  </p>
                  <p className="text-[#171717] dark:text-[#F7F7F5] font-medium mt-0.5 text-xs sm:text-sm break-all">
                    {user.phone || (
                      <span className="text-[#777777] dark:text-[#777777] italic text-xs font-normal">
                        No phone number added
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#D5AD55] shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#A3A3A3] uppercase tracking-wider">
                    Bio / Notes
                  </p>
                  <p className="text-[#171717] dark:text-[#F7F7F5] font-medium mt-0.5 text-xs sm:text-sm leading-relaxed">
                    {user.bio || (
                      <span className="text-[#777777] dark:text-[#777777] italic text-xs font-normal">
                        No bio provided yet. Tap &apos;Edit Profile&apos; to write something.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#777777] dark:text-[#A3A3A3] shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#777777] dark:text-[#A3A3A3] uppercase tracking-wider">
                    Member Since
                  </p>
                  <p className="text-[#171717] dark:text-[#F7F7F5] font-medium mt-0.5 text-xs sm:text-sm">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-[#E8E8E6] dark:border-[#2A2A2A] flex flex-col sm:flex-row gap-3">
              <Link href="/dashboard/edit" className="flex-1">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  leftIcon={<Edit3 className="w-4 h-4 mr-1.5" />}
                >
                  Edit Profile
                </Button>
              </Link>
              <div className="flex-1">
                <LogoutButton />
              </div>
            </div>
          </Card>
        </div>

        {/* Reassurance Footer */}
        <div className="py-4 text-center text-xs text-[#777777] dark:text-[#A3A3A3] flex items-center justify-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#D5AD55]" />
          <span>Your data is secure &bull; ATTED AI</span>
        </div>
      </div>
    </MobileShell>
  );
}