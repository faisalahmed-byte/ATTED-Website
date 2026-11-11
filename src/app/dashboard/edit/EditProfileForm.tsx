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

      router.push("/dashboard");
      router.refresh();
    } catch {
      setGlobalError("Network error. Please check your connection.");
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left animate-fadeIn" noValidate>
      {globalError && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
          <span>{globalError}</span>
        </div>
      )}

      {/* Profile Picture Section */}
      <div className="flex flex-col items-center pb-2">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <Avatar name={name} src={avatarUrl} size="xl" className="ring-2 ring-[#D5AD55]/70" />
          <div className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold">Change</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#D5AD55] text-[#111111] flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-[#111111]"
            title="Upload photo"
            aria-label="Upload photo"
          >
            <Camera className="w-3.5 h-3.5" />
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

        <div className="mt-2.5 flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="font-semibold text-[#D5AD55] hover:underline"
          >
            Upload Photo
          </button>
          {avatarUrl && (
            <>
              <span className="text-[#777777]">&bull;</span>
              <button
                type="button"
                onClick={() => setAvatarUrl("")}
                className="font-semibold text-rose-500 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </button>
            </>
          )}
        </div>

        {/* Quick Presets */}
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-[11px] text-[#777777] dark:text-[#A3A3A3]">Or choose:</span>
          <div className="flex gap-1.5">
            {PRESET_AVATARS.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Preset avatar ${i + 1}`}
                onClick={() => setAvatarUrl(url)}
                className={`w-7 h-7 rounded-full object-cover cursor-pointer transition-transform hover:scale-110 border ${
                  avatarUrl === url ? "border-[#D5AD55] ring-2 ring-[#D5AD55]/40 scale-105" : "border-transparent"
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
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors({ ...errors, name: "" });
        }}
        error={errors.name}
        leftIcon={<User className="w-4 h-4" />}
        required
      />

      {/* Email (Read-only) */}
      <div className="w-full space-y-1.5 text-left">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#171717] dark:text-[#F7F7F5]">
          Email Address
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-[#777777] dark:text-[#A3A3A3]">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={initialUser.email}
            disabled
            className="w-full min-h-[48px] text-base pl-11 pr-10 rounded-xl bg-black/5 dark:bg-white/5 text-[#777777] dark:text-[#A3A3A3] border border-[#E8E8E6] dark:border-[#2A2A2A] cursor-not-allowed select-none"
          />
          <div className="absolute right-3.5 text-[#777777] dark:text-[#A3A3A3]">
            <Lock className="w-4 h-4" />
          </div>
        </div>
        <p className="text-[11px] text-[#777777] dark:text-[#A3A3A3] pl-0.5">
          Email address is tied to your account identity.
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
        leftIcon={<Phone className="w-4 h-4" />}
      />

      {/* Bio */}
      <div className="w-full space-y-1.5 text-left">
        <div className="flex items-center justify-between">
          <label
            htmlFor="bio"
            className="block text-xs font-semibold uppercase tracking-wider text-[#171717] dark:text-[#F7F7F5]"
          >
            Personal Bio
          </label>
          <span className="text-[11px] text-[#777777] dark:text-[#A3A3A3]">
            {bio.length}/250
          </span>
        </div>
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
          className="w-full text-base p-3.5 rounded-xl bg-white dark:bg-[#1B1B1B] text-[#171717] dark:text-[#F7F7F5] border border-[#E8E8E6] dark:border-[#2A2A2A] focus:outline-none focus:border-[#D5AD55] focus:ring-2 focus:ring-[#D5AD55]/30 placeholder:text-[#777777]/60 dark:placeholder:text-[#777777] resize-none transition-colors"
        />
        {errors.bio && (
          <p className="text-xs font-medium text-rose-600 dark:text-rose-400 pl-0.5">{errors.bio}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSaving}
          className="flex-1"
          rightIcon={<Check className="w-4 h-4 ml-1" />}
        >
          Save Changes
        </Button>

        <Link href="/dashboard" className="flex-1">
          <Button variant="secondary" size="md" className="w-full">
            Cancel
          </Button>
        </Link>
      </div>
    </form>
  );
}
