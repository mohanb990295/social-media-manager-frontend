import React from "react";
import clsx from "clsx";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "default";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = "default", size = "md", children, className }) => {
  const variantStyles = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-800",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span className={clsx("inline-flex items-center font-medium rounded-full", variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </span>
  );
};

interface StatusBadgeProps {
  status: "draft" | "review" | "approved" | "published" | "rejected" | "scheduled";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const statusConfig = {
    draft: { variant: "default" as const, label: "Draft" },
    review: { variant: "warning" as const, label: "In Review" },
    approved: { variant: "success" as const, label: "Approved" },
    published: { variant: "success" as const, label: "Published" },
    rejected: { variant: "error" as const, label: "Rejected" },
    scheduled: { variant: "info" as const, label: "Scheduled" },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size="sm" className={className}>
      {config.label}
    </Badge>
  );
};
