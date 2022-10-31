import { PAGE_URL } from 'constants/url.constant';
import React from 'react';
import { useRouter } from './Router';

interface RoutesProps {
  children?: React.ReactNode;
}

export default function Routes({ children }: RoutesProps) {
  const { path } = useRouter();

  const matches: React.ReactElement[] = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      return;
    }
    if (child.props.path === path && child.props.children) {
      matches.push(child.props.children);
    }
  });

  if (matches.length === 0) {
    window.location.replace(PAGE_URL.MAIN);
  }

  return <React.Fragment>{matches}</React.Fragment>;
}
