import { LoginForm } from "./_components/login-form";
import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: "ChatApp - Login",
  description: "Login to your account to continue chatting with friends and family",
}
 


export default function LoginPage() {     
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-lg border border-border ">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to continue to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    );
}