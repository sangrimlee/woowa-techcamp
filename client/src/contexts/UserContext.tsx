import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { UserData } from 'types';
import { requestLogout } from 'api/auth';
import { requestGetMyProfile } from 'api/user';

interface UserContextData {
  user: UserData | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

interface Props {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const UserContext = createContext<UserContextData>(null!);

export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = useCallback(async () => {
    const { ok, data } = await requestGetMyProfile();
    if (ok && data) {
      setUser(data);
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(async () => {
    const { ok } = await requestLogout();
    if (ok) {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (isLoggedIn) return;
      await login();
      setIsLoading(false);
    })();
  }, [login, isLoggedIn]);

  return (
    <UserContext.Provider value={{ isLoading, user, isLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}
