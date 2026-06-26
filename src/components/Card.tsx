import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "flat";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-gray-200 rounded-lg p-6 shadow-sm",
      elevated: "bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow",
      flat: "bg-gray-50 border border-gray-100 rounded-lg p-6",
    };

    return (
      <div ref={ref} className={clsx(variantStyles[variant], className)} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action, className, ...props }) => {
  return (
    <div className={clsx("flex items-start justify-between mb-4", className)} {...props}>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

CardHeader.displayName = "CardHeader";

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx("text-gray-700", className)} {...props}>
      {children}
    </div>
  );
});

CardBody.displayName = "CardBody";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={clsx("flex gap-2 mt-6 pt-4 border-t border-gray-200", className)} {...props}>
      {children}
    </div>
  );
});

CardFooter.displayName = "CardFooter";
