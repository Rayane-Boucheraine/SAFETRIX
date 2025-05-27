import React from "react";

interface FormFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  placeholder,
  defaultValue = "",
  className = "",
  required = false,
  disabled = false,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-300 mb-1.5">
        {label} {required && <span className="text-emerald-400">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        className={`w-full bg-slate-800/70 border border-slate-700/60 text-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent shadow-sm ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

interface CheckboxFieldProps {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  description,
  defaultChecked = false,
  disabled = false,
}) => {
  return (
    <div className="flex items-start gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 hover:border-emerald-900/30 transition-colors">
      <div className="flex items-center h-5 mt-1">
        <input
          id={id}
          type="checkbox"
          defaultChecked={defaultChecked}
          disabled={disabled}
          className="h-4 w-4 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500/30"
        />
      </div>
      <div>
        <label htmlFor={id} className="font-medium text-slate-200">
          {label}
        </label>
        {description && (
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        )}
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="mb-8 last:mb-0">
      <h3 className="text-lg font-medium text-slate-200 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-400 mb-4">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary:
      "bg-emerald-600 hover:bg-emerald-700 border border-emerald-500 hover:border-emerald-400 text-white",
    secondary:
      "bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-200",
    danger: "bg-red-600 hover:bg-red-700 border border-red-500 text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
