import Link from "next/link";
import { NavButton } from "@/components/common/nav-button";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary"><Link href={"/"}>ChatApp</Link></span>
          </div>

          <div className="flex items-center gap-4 bg-card">
            <NavButton size="default" path="/login" variant="secondary">
              Log In
            </NavButton>
          </div>
        </div>
      </div>
    </nav>
  );
}