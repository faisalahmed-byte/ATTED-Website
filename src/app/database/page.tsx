"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Database, RefreshCw, ExternalLink, ShieldCheck, User } from "lucide-react";
import { MobileShell } from "@/components/layout/MobileShell";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  avatarUrl: string | null;
  passwordHash: string | null;
  createdAt: string;
  updatedAt: string;
}

interface DatabaseResponse {
  status: string;
  database: string;
  provider: string;
  host: string;
  databaseName: string;
  totalUsers: number;
  users: UserRecord[];
}

export default function DatabaseViewerPage() {
  const [data, setData] = useState<DatabaseResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDatabaseData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/database", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load PostgreSQL data");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Failed to query database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatabaseData();
  }, []);

  return (
    <MobileShell>
      <div className="flex flex-col min-h-full pb-8">
        <Header />

        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-muted-light dark:text-muted-dark hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Home
          </Link>
        </div>

        {/* Header Title */}
        <div className="mb-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold text-text-light dark:text-text-dark flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              PostgreSQL Data
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDatabaseData}
              disabled={loading}
              className="h-9 px-3 text-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <p className="text-xs text-muted-light dark:text-muted-dark mt-1">
            Live query from PostgreSQL <code className="bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono text-[11px]">users</code> table.
          </p>
        </div>

        {/* Database Info Card */}
        <Card className="p-4 mb-5 border-primary/20 bg-primary/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-light dark:text-muted-dark font-medium">Database Engine:</span>
            <span className="font-semibold text-text-light dark:text-text-dark flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              PostgreSQL 16 (Neon AWS)
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-light dark:text-muted-dark font-medium">Status:</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500">
              ● Active &amp; Synced
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-light dark:text-muted-dark font-medium">Total Registered Users:</span>
            <span className="font-mono font-bold text-primary">
              {data ? data.totalUsers : "—"}
            </span>
          </div>
          <div className="pt-2 border-t border-primary/10">
            <a
              href="https://neon.new/database/30ded866-ee35-44be-b880-21fd8a3ccf70"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 justify-center py-1"
            >
              Open Neon Cloud Console
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </Card>

        {/* Loading State */}
        {loading && !data && (
          <div className="py-12 text-center text-sm text-muted-light dark:text-muted-dark">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
            Querying PostgreSQL database...
          </div>
        )}

        {/* Error State */}
        {error && (
          <Card className="p-4 bg-red-500/10 border-red-500/20 text-red-500 text-sm">
            {error}
          </Card>
        )}

        {/* Users List */}
        {data && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-light dark:text-muted-dark px-1">
              Stored User Records ({data.totalUsers})
            </h2>

            {data.users.length === 0 ? (
              <Card className="p-8 text-center text-sm text-muted-light dark:text-muted-dark">
                No users found in database yet.
              </Card>
            ) : (
              data.users.map((user) => (
                <Card key={user.id} className="p-4 space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-sm text-text-light dark:text-text-dark">
                          {user.name}
                        </div>
                        <div className="text-xs text-muted-light dark:text-muted-dark font-mono">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-muted-light dark:text-muted-dark">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {user.phone && (
                    <div className="text-xs text-muted-light dark:text-muted-dark">
                      <span className="font-medium text-text-light dark:text-text-dark">Phone: </span>
                      {user.phone}
                    </div>
                  )}

                  {user.bio && (
                    <div className="text-xs text-text-light dark:text-text-dark bg-background-light dark:bg-background-dark p-2.5 rounded-lg border border-border-light dark:border-border-dark italic">
                      &ldquo;{user.bio}&rdquo;
                    </div>
                  )}

                  <div className="pt-2 border-t border-border-light dark:border-border-dark flex items-center justify-between text-[11px] font-mono text-muted-light dark:text-muted-dark">
                    <span>ID: {user.id.slice(0, 8)}...</span>
                    <span>Hash: {user.passwordHash}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Footer Link to Raw JSON */}
        <div className="mt-6 text-center">
          <a
            href="/api/database"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-mono"
          >
            Raw JSON API: /api/database
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </MobileShell>
  );
}
