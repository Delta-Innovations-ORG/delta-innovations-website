import React from 'react';
import { Link } from 'react-router-dom';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const variants = {
  primary:
    'bg-brand-gradient text-brand-navy font-semibold shadow-glow hover:opacity-95 hover:-translate-y-1 hover:shadow-lift',
  secondary:
    'bg-brand-navyCard text-brand-light font-semibold border border-brand-cyan/30 hover:border-brand-cyan hover:shadow-glow hover:-translate-y-0.5',
  outline:
    'bg-transparent border-2 border-brand-cyan/50 text-brand-cyan font-semibold hover:bg-brand-cyan/10 hover:border-brand-cyan hover:-translate-y-0.5',
  ghost: 'bg-transparent text-brand-muted font-medium hover:text-brand-cyan',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  className = '',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 transition-all duration-300 btn-shine ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
