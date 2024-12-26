import { useRouter } from "next/navigation";
import { Home, RotateCcw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* error ilustration */}
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full" />
            <div className="relative bg-background p-6 rounded-full">
              <XCircle className="w-16 h-16 text-primary/70" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Something went wrong!
          </h1>
          <p className="text-xl text-muted-foreground">
            An unexpected error occurred
          </p>
          {error.digest && (
            <p className="text-sm text-muted-foreground">
              Error ID: {error.digest}
            </p>
          )}
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={reset} className="px-8">
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push("/")}
              className="px-8"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
