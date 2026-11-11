"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Phone,
  Check,
  AlertCircle,
  Mail,
  Lock,
  Camera,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";

interface InitialUserData {
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  bio: string;
}

// Preset avatars users can choose with 1-tap
const PRESET_AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
];

export function EditProfileForm({ initialUser }: { initialUser: InitialUserData }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(initialUser.name);
  const [avatarUrl, setAvatarUrl] = useState(initialUser.avatarUrl || "");
  const [phone, setPhone] = useState(initialUser.phone);
  const [bio, setBio] = useState(initialUser.bio);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Handle uploading image from user device/camera
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors({ ...errors, avatar: "Image size must be under 2MB" });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarUrl(reader.result as string);
      if (errors.avatar) setErrors({ ...errors, avatar: "" });
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!name.trim()) {
      errs.name = "Full name is required";
    } else if (name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (phone && phone.trim().length > 25) {
      errs.phone = "Phone number is too long (max 25 characters)";
    }

    if (bio && bio.length > 250) {
      errs.bio = "Bio must not exceed 250 characters";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError(null);

    if (!validate()) return;

    setIsSaving(true);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          avatarUrl: avatarUrl.trim() || null,
          phone: phone.trim() || null,
          bio: bio.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setGlobalError(data.error || "Failed to update profile.");
        setIsSaving(false);
        return;
      }

      // Success -> Return to dashboard and refresh data
      router.push("/dashboard");
      router.refresh();
    } catch {
      setGlobalError("Network error. Please check your connection.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left animate-fadeIn">
      {globalError && (
        <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-sm flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center pb-3">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Avatar name={name} src={avatarUrl} size="xl" className="ring-2 ring-amber-400/50 shadow-md shadow-amber-500/10" />
          <div className="absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-semibold">Change</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-surfaceCard-dark"
            title="Upload photo"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {errors.avatar && (
          <p className="text-xs text-rose-500 mt-1">{errors.avatar}</p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-semibold text-primary dark:text-indigo-300 hover:text-indigo-600 dark:hover:text-indigo-200 hover:underline"
          >
            Upload Photo
          </button>
          {avatarUrl && (
            <>
              <span className="text-muted-light dark:text-muted-dark text-xs">&bull;</span>
              <button
                type="button"
                onClick={() => setAvatarUrl("")}
                className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </button>
            </>
          )}
        </div>

        {/* Quick presets */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] text-muted-light dark:text-muted-dark">Or pick:</span>
          <div className="flex gap-1.5">
            {PRESET_AVATARS.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Preset avatar ${i + 1}`}
                onClick={() => setAvatarUrl(url)}
                className={`w-7 h-7 rounded-full object-cover cursor-pointer transition-transform hover:scale-110 border-2 ${
                  avatarUrl === url ? "border-primary scale-110" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Name */}
      <Input
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors({ ...errors, name: "" });
        }}
        error={errors.name}
        leftIcon={<User className="w-5 h-5" />}
        required
      />

      {/* Email (Read-only) */}
      <div className="w-full space-y-1.5 text-left">
        <label className="block text-sm font-semibold text-text-light dark:text-text-dark tracking-tight">
          Email Address
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-muted-light dark:text-muted-dark">
            <Mail className="w-5 h-5" />
          </div>
          <input
            type="email"
            value={initialUser.email}
            disabled
            className="w-full min-h-[50px] text-base pl-11 pr-10 rounded-2xl bg-slate-100 dark:bg-slate-800/60 text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark cursor-not-allowed select-none opacity-85"
          />
          <div className="absolute right-3.5 text-muted-light dark:text-muted-dark">
            <Lock className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[11px] text-muted-light dark:text-muted-dark pl-1">
          Account email is managed by your organization.
        </p>
      </div>

      {/* Phone Number */}
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+91 98765 43210"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
          if (errors.phone) setErrors({ ...errors, phone: "" });
        }}
        error={errors.phone}
        hint="Optional - e.g. +91 98765 43210"
        leftIcon={<Phone className="w-5 h-5" />}
      />

      {/* Bio */}
      <div className="w-full space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label
            htmlFor="bio"
            className="block text-sm font-semibold text-text-light dark:text-text-dark tracking-tight"
          >
            Personal Bio
          </label>
          <span className="text-[11px] text-muted-light dark:text-muted-dark">
            {bio.length}/250
          </span>
        </div>
        <div className="relative">
          <textarea
            id="bio"
            rows={3}
            placeholder="Share a short summary about yourself..."
            value={bio}
            maxLength={250}
            onChange={(e) => {
              setBio(e.target.value);
              if (errors.bio) setErrors({ ...errors, bio: "" });
            }}
            className="w-full text-base p-3.5 rounded-2xl bg-white dark:bg-surfaceCard-dark text-text-light dark:text-text-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary dark:focus:border-indigo-500 placeholder:text-muted-light/60 dark:placeholder:text-muted-dark/50 resize-none transition-all"
          />
        </div>
        {errors.bio && (
          <p className="text-xs font-medium text-rose-500 pl-1">{errors.bio}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSaving}
          className="flex-1"
          rightIcon={<Check className="w-5 h-5 ml-1" />}
        >
          Save Changes
        </Button>

        <Link href="/dashboard" className="flex-1">
          <Button variant="ghost" size="lg" className="w-full">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
