import React from 'react';
import { Link, NavLink } from 'react-router-dom';

type FooterTextLinkProps = {
  to: string;
  children: React.ReactNode;
  end?: boolean;
};

export function FooterTextLink({ to, children, end }: FooterTextLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `footer-text-link nav-link-hover ${isActive ? 'text-brand-cyan active' : ''}`
      }
    >
      {children}
    </NavLink>
  );
}

type FooterRouterTextLinkProps = {
  to: string;
  children: React.ReactNode;
};

export function FooterRouterTextLink({ to, children }: FooterRouterTextLinkProps) {
  return (
    <Link to={to} className="footer-text-link nav-link-hover">
      {children}
    </Link>
  );
}

type FooterExternalTextLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function FooterExternalTextLink({ href, children }: FooterExternalTextLinkProps) {
  return (
    <a href={href} className="footer-text-link nav-link-hover">
      {children}
    </a>
  );
}
