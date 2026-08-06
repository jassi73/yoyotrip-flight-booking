import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 tracking-wide">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3 pointer-events-none text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={twMerge(
            clsx(
              'w-full h-10 bg-white border border-slate-200 text-slate-900 text-xs font-medium rounded-xl px-3.5 py-2 outline-none transition-all duration-200 focus:border-yovo-red focus:ring-2 focus:ring-yovo-red/20 placeholder:text-slate-400 shadow-2xs',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
              className
            )
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 pointer-events-none text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-[11px] text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-[11px] text-slate-500">{helperText}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
