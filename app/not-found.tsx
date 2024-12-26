import { NavButton } from "@/components/common/nav-button";
import { XCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
        <div className="relative">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
      <div className="relative">
        <XCircle className="w-24 h-24 text-primary/70" />
      </div>
    </div>
        </div>
        <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-primary">{"Page Not Found"}</h1>
      <p className="text-xl text-muted-foreground max-w-md mx-auto">
        {"Oops! The page you're looking for doesn't exist or has been moved."}
      </p>
    </div>
      
        <div className="flex justify-center">
        <div className="flex flex-col sm:flex-row gap-4">
      <NavButton
        size="lg"
        path="/"
        variant="secondary"
        className="px-8"
      >
        Go Home
      </NavButton>
      <NavButton
        size="lg"
        variant="outline"
        className="px-8"
        path="-1"
      >
        Go Back
      </NavButton>
    </div>
        </div>
      </div>
    </div>
  );
}