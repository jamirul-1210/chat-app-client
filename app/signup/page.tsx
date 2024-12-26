import Link from "next/link";
import { SignupForm } from "./_components/signup-form";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: "ChatApp - Create an Account",
  description: "Sign up to start chatting with your friends",
}
 



export default function SignupPage() {  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 text-secondary-foreground ">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-muted-foreground mt-2">
            Sign up to start chatting with your friends
          </p>
        </div>
        <SignupForm />
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary/90">
            Login in
          </Link>
        </p>
      </div>
    </div>
  );
}