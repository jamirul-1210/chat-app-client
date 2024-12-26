"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type NavButtonProps = {
  size: "sm" | "lg" | "default" | "icon";
  variant:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "ghost"
    | "link";
  className?: string;
  path: string;
  children: React.ReactNode;
};

export const NavButton = ({
  size,
  className,
  path,
  children,
  variant,
}: NavButtonProps) => {
  const router = useRouter();
  return (
    <Button
      size={size}
      variant={variant}
      className={className}
      onClick={() => (path === "-1" ? router.back() : router.push(path))}
    >
      {children}
    </Button>
  );
};
