import React from 'react';
import { useRouter } from './Router';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export default function NavLink({ href, children, ...props }: NavLinkProps) {
  const { navigate } = useRouter();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate(href);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
