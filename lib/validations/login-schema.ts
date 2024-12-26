import { z } from "zod";

// Define Zod schema for form validation
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/,
        "Password must contain at least one special character and one number"
      ),
  });

export  type LoginFormData = z.infer<typeof loginSchema>;