import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg',
          'font-medium transition-all duration-150 focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-40',
          // Variants
          variant === 'default' &&
            'bg-gray-900 text-white shadow hover:bg-gray-800 active:scale-[0.98]',
          variant === 'outline' &&
            'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300',
          variant === 'ghost' && 'text-gray-700 hover:bg-gray-100',
          variant === 'link' && 'text-gray-900 underline-offset-4 hover:underline',
          // Sizes
          size === 'default' && 'h-10 px-4 py-2 text-sm',
          size === 'sm' && 'h-8 px-3 text-xs',
          size === 'lg' && 'h-11 px-6 text-base',
          size === 'icon' && 'h-10 w-10',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
