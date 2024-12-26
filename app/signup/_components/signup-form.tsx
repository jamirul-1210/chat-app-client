"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInput } from "@/components/common/form-input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import {
  AUTH_TOKEN_KEY_NAME,
  AUTH_USER_KEY_NAME,
  BACKEND_BASE_URL,
} from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import {
  signupSchema,
  SignupFormData,
  ErrorSignupData,
} from "@/lib/validations/signup-schema";

const initialFormState: SignupFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "male",
  agreeToTerms: false,
};
export function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignupFormData>(initialFormState);
  const [errors, setErrors] = useState<ErrorSignupData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle is user already login
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
    const user = localStorage.getItem(AUTH_USER_KEY_NAME);
    if (user && token) return router.push("/chat");
  }, []);

  // handler for input element change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handler for input radio element change
  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value as "male" | "female" | "other",
    }));
  };

  // form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    // Validate form data using Zod
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0],
        password: fieldErrors.password?.[0],
        confirmPassword: fieldErrors.confirmPassword?.[0],
        email: fieldErrors.email?.[0],
        agreeToTerms: fieldErrors.agreeToTerms?.[0],
      });
      return;
    }

    setErrors({}); // Clear errors if validation passes
    setIsSubmitting(true);

    try {
      // Make API request to backend
      const res = await axios.post(
        `${BACKEND_BASE_URL}/api/users/create`,
        formData
      );
      if (res && res.status === 201) {
        // show successfull message
        toast({
          title: "Submitted Successfully",
          description: "Login to access chat feutres.",
        });
        // navigate to login route
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    } finally {
      setIsSubmitting(false);
      setFormData(initialFormState);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-secondary-foreground"
    >
      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="first last"
      />

      <FormInput
        label="Email"
        type="text"
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

      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="••••••••"
      />

      <div className="space-y-2">
        <Label>Gender</Label>
        <RadioGroup
          value={formData.gender}
          onValueChange={handleGenderChange}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({
              ...prev,
              agreeToTerms: checked as boolean,
            }))
          }
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a className="text-primary underline" target="_blank" href={"/terms"}>
            Terms
          </a>{" "}
          and{" "}
          <a className="text-primary underline" target="_blank" href={"/terms"}>
            Conditions
          </a>
        </Label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-500">{errors.agreeToTerms}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
}
