import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Mail,
  Phone,
  FileText,
  Edit3,
  Calendar,
  ShieldCheck,
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
    <MobileShell>
      <div className="flex flex-col min-h-full pb-6 w-full max-w-4xl mx-auto">
        {/* Top Header */}
        <Header showBrand />

        {/* Personalized Greeting */}
        <div className="mb-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-light dark:text-text-dark">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-300 mt-1">
                Here is your Atedd AI profile overview.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Account
              </span>
            </div>
          </div>
        </div>

        {/* Responsive Profile Card - Single-column on phone, two-column on laptop */}
        <Card variant="elevated" className="mb-6 p-5 sm:p-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Identity Column: Centered on mobile, clean left sidebar on laptop */}
            <div className="md:col-span-4 flex flex-col items-center text-center pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-border-light dark:border-border-dark md:pr-6 relative">
              <Avatar name={user.name} src={user.avatarUrl} size="xl" showBadge className="mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-text-light dark:text-text-dark">
                {displayName}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate max-w-[200px]">{user.email}</span>
              </div>

              {/* Subtle gold accent divider */}
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mx-auto mt-4" />

              {/* Laptop Quick Actions */}
              <div className="hidden md:flex flex-col w-full gap-2.5 mt-6">
                <Link href="/dashboard/edit" className="w-full">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    leftIcon={<Edit3 className="w-4 h-4 mr-1" />}
                  >
                    Edit Profile
                  </Button>
                </Link>
                <LogoutButton />
              </div>
            </div>

            {/* Profile Details Column */}
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Profile Details
              </h3>

              {/* Phone */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-border-light dark:border-border-dark flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary dark:text-indigo-300 shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Phone Number
                  </p>
                  <p className="text-text-light dark:text-text-dark font-medium mt-1 text-sm break-all">
                    {user.phone || (
                      <span className="text-slate-500 dark:text-slate-400 italic text-xs font-normal">
                        No phone number added
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-border-light dark:border-border-dark flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center text-secondary dark:text-violet-300 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Bio / Notes
                  </p>
                  <p className="text-text-light dark:text-text-dark font-medium mt-1 text-sm leading-relaxed">
                    {user.bio || (
                      <span className="text-slate-500 dark:text-slate-400 italic text-xs font-normal">
                        No bio provided yet. Tap &apos;Edit Profile&apos; to write something.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Member Since */}
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-border-light dark:border-border-dark flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Member Since
                  </p>
                  <p className="text-text-light dark:text-text-dark font-medium mt-1 text-sm">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Mobile-only Action Buttons at bottom */}
        <div className="md:hidden space-y-3 mt-auto pt-2">
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
