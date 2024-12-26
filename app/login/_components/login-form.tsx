"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/form-input";
import axios from "axios";
import { AUTH_TOKEN_KEY_NAME, AUTH_USER_KEY_NAME, BACKEND_BASE_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { loginSchema, LoginFormData } from "@/lib/validations/login-schema";
import { useAppDispatch } from "@/redux-store/hooks";
import { setUser } from "@/redux-store/features/auth-slice";

const initialFormState = {
  email: "",
  password: "",
};

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginFormData>(initialFormState);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
// handle is user already login
useEffect(()=>{
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  const user = localStorage.getItem(AUTH_USER_KEY_NAME);
  if(user && token) return router.push("/chat");
},[]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Validate form data using Zod schema
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        password: fieldErrors.password?.[0],
        email: fieldErrors.email?.[0],
      });
      return;
    }

    try {
      // Make API request to backend to login user
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/users/login`,
        formData
      );

      if (res && res.status === 200) {
        // show success message to user
        toast({
          title: "LoggedIn Successfully",
          description: "redirecting to chat page",
        });

        const { user, token } = res.data;
        // save token and user info to local storage
        localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
        localStorage.setItem(AUTH_USER_KEY_NAME, JSON.stringify(user));
        // dispatch user info to redux store
        dispatch(setUser({ ...user }));

        // Navigate to chat page after successful login
        router.push("/chat");
      }else{
        alert("An error occurred while submitting the form.");
      }
    } catch (error: any) {
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
      setFormData(initialFormState);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="name@example.com"
      />

      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="••••••••"
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Log In
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/signup" className="text-primary hover:text-primary/90">
          Sign up
        </Link>
      </p>
    </form>
  );
}
