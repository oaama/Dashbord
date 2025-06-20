import React, { forwardRef, ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { Link, LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  fullWidth?: boolean;
}

// Separate props for button and link elements
type ButtonElementProps = BaseButtonProps & {
  as?: 'button';
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  to?: never;
};

type LinkElementProps = BaseButtonProps & {
  as: 'a';
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  to?: never;
};

type RouterLinkProps = BaseButtonProps & {
  as: typeof Link;
  to: LinkProps['to'];
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: never;
};

type ButtonProps = ButtonElementProps | LinkElementProps | RouterLinkProps;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  loading = false,
  className = '',
  fullWidth = false,
  as: Component = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
  };
  
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const buttonClasses = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ].filter(Boolean).join(' ');

  // Handle icon rendering
  const renderIcon = () => {
    if (loading) {
      return <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />;
    }
    if (Icon) {
      return <Icon className="h-4 w-4" />;
    }
    return null;
  };

  // Handle children with spacing
  const renderChildren = () => (
    <>
      {renderIcon()}
      {children && (
        <span className={Icon || loading ? 'mr-2' : ''}>
          {children}
        </span>
      )}
    </>
  );

  // Handle anchor element
  if (Component === 'a') {
    const { as, ...rest } = props as LinkElementProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={buttonClasses}
        {...rest as any}
      >
        {renderChildren()}
      </a>
    );
  }

  if (Component === Link) {
    const { to, ...rest } = props as RouterLinkProps;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={to}
        className={buttonClasses}
        {...rest as any}
      >
        {renderChildren()}
      </Link>
    );
  }

  // Default to button
  const { type = 'button', ...rest } = props as ButtonElementProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || loading}
      className={buttonClasses}
      {...rest}
    >
      {renderChildren()}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;