import { MouseEventHandler, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type AppButtonProps = {
  children: ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  size?: "default" | "icon" | "sm" | "lg" | null | undefined;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export const AppButton = ({
  children,
  onClick,
  size = "sm",
  variant = "default",
  className = "",
}: AppButtonProps) => {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};
