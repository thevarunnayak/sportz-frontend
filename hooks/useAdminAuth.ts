import { useCallback, useEffect, useState } from 'react';

const ADMIN_AUTH_KEY = 'admin_authenticated';

export const isAdminAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
};

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => isAdminAuthenticated());

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(isAdminAuthenticated());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = useCallback((pin: string) => {
    const expected = import.meta.env.VITE_ADMIN_PIN;
    const isValid = Boolean(expected) && pin === expected;
    if (isValid) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAuthenticated(true);
    }
    return isValid;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
  };
};
