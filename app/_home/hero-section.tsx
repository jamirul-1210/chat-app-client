import { Stat } from "./stat";
import { NavButton } from "@/components/common/nav-button";

export function HeroSection() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Connect and Chat in Real-Time
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience seamless communication with our modern chat platform.
          Connect with friends, collaborate with teammates, and stay in touch
          with loved ones.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NavButton
            className="text-lg px-8"
            path="/signup"
            size="lg"
            variant="default"
          >
            Get Started
          </NavButton>
        </div>

        <div className="pt-8">
          <p className="text-muted-foreground">
            Join thousands of users who trust our platform
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <Stat number="10K+" label="Active Users" />
            <Stat number="5M+" label="Messages Sent" />
            <Stat number="99.9%" label="Uptime" />
          </div>
        </div>
      </div>
    </div>
  );
}
