import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700',
        outline: 'border-2 border-orange-500 text-orange-500 hover:bg-orange-50',
        ghost: 'text-orange-500 hover:bg-orange-50',
        link: 'text-orange-500 underline-offset-4 hover:underline',
        secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
);

const Button = React.forwardRef(({ 
  className,
  variant,
  size,
  fullWidth,
  children,
  ...props
}, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };