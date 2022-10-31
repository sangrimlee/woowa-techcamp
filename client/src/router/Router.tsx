import React from 'react';
import { useRecoilValue } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { userRegion } from 'recoil/atoms/region.atom';
import { currentUserState } from 'recoil/atoms/user.atom';
const LoggedInRoutes = React.lazy(() => import('./LoggedInRoutes'));
const NotSetRegionRoutes = React.lazy(() => import('./NotSetRegionRoutes'));
const NotLoggedInRoutes = React.lazy(() => import('./NotLoggedInRoutes'));

export default function Router() {
  const { isLoggedIn } = useRecoilValue(currentUserState);
  const { regions } = useRecoilValue(userRegion);

  const routes = () => {
    if (!isLoggedIn) return <NotLoggedInRoutes />;
    if (regions.length === 0) return <NotSetRegionRoutes />;
    return <LoggedInRoutes />;
  };

  return <BrowserRouter>{routes()}</BrowserRouter>;
}
