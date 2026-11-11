import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(80, { message: "Full name cannot exceed 80 characters." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .max(25, { message: "Phone number is too long." })
    .optional()
    .nullable()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Please provide a valid email address." })
    .toLowerCase(),
  password: z
    .string()
    .min(1, { message: "Password is required." }),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters." })
    .max(80, { message: "Full name cannot exceed 80 characters." }),
  avatarUrl: z
    .string()
    .optional()
    .nullable()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .max(25, { message: "Phone number is too long." })
    .optional()
    .nullable()
    .or(z.literal("")),
  bio: z
    .string()
    .trim()
    .max(250, { message: "Bio cannot exceed 250 characters." })
    .optional()
    .nullable()
    .or(z.literal("")),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
