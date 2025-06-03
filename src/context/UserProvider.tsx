'use client';

import React, {
  ReactNode,
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';

export type UserInfo = {
  id: string;
  username: string;
};

type UserContextType = {
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
};

type UserProviderProps = {
  children: ReactNode;
};

// Create context with undefined default to enforce usage within a provider
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider that holds user info state
export const UserProvider = ({ children }: UserProviderProps): React.JSX.Element => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
};

// Custom hook to access user context, throws if used outside UserProvider
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
