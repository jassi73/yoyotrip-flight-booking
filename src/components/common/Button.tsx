import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 rounded-xl';

  const variants = {
    primary: 'bg-yovo-red text-white hover:bg-yovo-red-hover focus:ring-yovo-red shadow-md hover:shadow-yovo-glow',
    secondary: 'bg-yovo-slate text-white hover:bg-yovo-navy focus:ring-yovo-slate',
    outline: 'border-2 border-yovo-red/30 text-yovo-red hover:bg-yovo-red-50 hover:border-yovo-red focus:ring-yovo-red',
    ghost: 'text-yovo-slate hover:bg-slate-100 focus:ring-slate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5 font-semibold',
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
      ) : leftIcon ? (
        <span className="shrink-0">{leftIcon}</span>
      ) : null}
      {children}
      {!isLoading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
    </button>
  );
};
