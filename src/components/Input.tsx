import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>}
        <div className="relative">
          {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
          <input
            ref={ref}
            className={clsx(
              "w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500",
              "transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-transparent",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              error && "border-red-500 focus:ring-red-500",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
  characterLimit?: number;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helper, characterLimit, className, value, onChange, ...props }, ref) => {
    const characterCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-900">{label}</label>
            {characterLimit && (
              <span className={clsx("text-xs", characterCount > characterLimit * 0.9 ? "text-red-600" : "text-gray-500")}>
                {characterCount} / {characterLimit}
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          className={clsx(
            "w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900 placeholder-gray-500",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-transparent",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "resize-vertical min-h-[120px]",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          value={value}
          onChange={onChange}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helper && <p className="mt-1 text-sm text-gray-500">{helper}</p>}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>}
        <select
          ref={ref}
          className={clsx(
            "w-full px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-900",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 focus:border-transparent",
            "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
            "appearance-none cursor-pointer",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
