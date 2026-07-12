import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'white';
type Size = 'sm' | 'md';

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-semibold ' +
  'transition-[background-color,border-color,color,transform] duration-200 ease-out ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 ' +
  'whitespace-nowrap select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-fg-strong shadow-[inset_0_0_0_1px_rgba(255,255,255,0.145)] hover:bg-brand-hover active:bg-brand-active disabled:bg-fg-subtle disabled:text-fg-disabled',
  secondary:
    'border border-fg-subtle bg-surface text-fg shadow-[inset_0_0_0_1px_rgba(255,255,255,0.145)] hover:border-fg hover:bg-surface-2 active:bg-surface-3 active:text-fg-strong',
  ghost: 'text-fg hover:bg-fg/10 hover:text-fg-strong active:bg-fg/20',
  white: 'bg-fg-strong text-bg hover:bg-fg-strong/90 active:bg-fg-strong/80',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[13px] leading-5',
  md: 'px-5 py-3 text-sm leading-5',
};

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface ButtonAsButton extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  to?: never;
  href?: never;
}

interface ButtonAsLink extends BaseProps {
  /** Internal route — renders a React Router `Link`. */
  to: string;
  href?: never;
}

interface ButtonAsAnchor extends BaseProps {
  /** External URL — renders an anchor with safe rel attributes. */
  href: string;
  to?: never;
  download?: boolean;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('to' in rest && rest.to) {
    const { to, ...linkProps } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  if ('href' in rest && rest.href) {
    const { href, ...anchorProps } = rest as ButtonAsAnchor;
    const external = href.startsWith('http');

    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
