
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150';

  const variantStyles = {
    primary: 'bg-primary-blue text-white hover:bg-secondary-blue focus:ring-primary-blue',
    secondary: 'bg-accent-blue text-white hover:bg-secondary-blue focus:ring-accent-blue',
    outline: 'bg-white text-primary-blue border border-primary-blue hover:bg-light-blue focus:ring-primary-blue',
    ghost: 'bg-transparent text-primary-blue hover:bg-light-blue focus:ring-primary-blue',
    danger: 'bg-danger-red text-white hover:bg-red-700 focus:ring-danger-red',
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
