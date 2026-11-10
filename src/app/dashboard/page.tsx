import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Mail,
  Phone,
  FileText,
  Edit3,
  Calendar,
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
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <MobileShell>
      <div className="flex flex-col min-h-full pb-6">
        {/* Top Header */}
        <Header showBrand />

        {/* Personalized Greeting */}
        <div className="mb-5 animate-fadeIn">
          <h1 className="text-2xl font-bold tracking-tight text-text-light dark:text-text-dark">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
            Here is your Atedd AI profile overview.
          </p>
        </div>

        {/* Profile Overview Card */}
        <Card variant="elevated" className="mb-5 animate-fadeIn">
          {/* Avatar and Main Identity */}
          <div className="flex flex-col items-center text-center pb-5 border-b border-border-light dark:border-border-dark relative">
            <Avatar name={user.name} src={user.avatarUrl} size="xl" showBadge className="mb-3" />
            <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
              {displayName}
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </div>

            {/* Subtle gold accent line under avatar identity */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mt-4" />
          </div>

          {/* Detailed Profile Info */}
          <div className="pt-4 space-y-3.5 text-sm">
            {/* Phone */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-indigo-300 shrink-0 mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="text-text-light dark:text-text-dark font-medium mt-0.5 break-all">
                  {user.phone || (
                    <span className="text-slate-500 dark:text-slate-300 italic text-xs font-normal">
                      No phone number added
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-violet-300 shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Bio / Notes
                </p>
                <p className="text-text-light dark:text-text-dark font-medium mt-0.5 text-xs leading-relaxed">
                  {user.bio || (
                    <span className="text-slate-500 dark:text-slate-300 italic text-xs font-normal">
                      No bio provided yet. Tap &apos;Edit Profile&apos; to write something.
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 shrink-0 mt-0.5">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Member Since
                </p>
                <p className="text-text-light dark:text-text-dark font-medium mt-0.5 text-xs">
                  {formattedDate}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Actions: Edit Profile and Log out */}
        <div className="space-y-3 mt-auto pt-2">
          <Link href="/dashboard/edit" className="block w-full">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Edit3 className="w-4 h-4 mr-1" />}
            >
              Edit Profile
            </Button>
          </Link>

          <LogoutButton />
        </div>
      </div>
    </MobileShell>
  );
}
