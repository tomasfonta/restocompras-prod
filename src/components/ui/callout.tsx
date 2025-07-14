import * as React from "react";
import { cn } from "@/lib/utils";

export interface CalloutProps {
  title?: string;
  description?: string;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onClose?: () => void;
}

const variantStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-900",
  success: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  error: "bg-red-50 border-red-200 text-red-900",
};

export const Callout: React.FC<CalloutProps> = ({
  title,
  description,
  variant = "info",
  className,
  children,
  dismissible = false,
  onClose,
}) => {
  const [open, setOpen] = React.useState(true);

  if (!open) return null;

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <div
      className={cn(
        "relative border rounded-lg p-4 shadow-lg w-full",
        variantStyles[variant],
        className
      )}
      role="status"
      aria-live="polite"
    >
      {dismissible && (
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-700 focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      )}
      {title && <div className="font-semibold mb-1">{title}</div>}
      {description && <div className="text-sm opacity-80">{description}</div>}
      {children}
    </div>
  );
};

Callout.displayName = "Callout";
