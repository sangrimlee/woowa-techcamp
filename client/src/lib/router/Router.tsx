import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextState {
  path: string;
  navigate: (href: string, replace?: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const RouterContext = createContext<RouterContextState>(null!);

export const useRouter = () => useContext(RouterContext);

interface RouterProps {
  children: React.ReactNode;
}

export default function Router({ children }: RouterProps) {
  const [path, setPath] = useState<string>(window.location.pathname);

  const navigate = (href: string, replace = false) => {
    setPath(href.split('?')[0]);
    if (path === href || replace) {
      window.history.replaceState(null, '', href);
    } else {
      window.history.pushState(null, '', href);
    }
  };

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}
