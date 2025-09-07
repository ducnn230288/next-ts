'use client';
import { useEffect } from 'react';

import { logout } from '@/shared/util';

// Custom hook for auth storage event/logout
const useAuthStorage = () => {
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (
        event.storageArea === localStorage &&
        event.key === 'isLoggedIn' &&
        event.newValue === 'false'
      ) {
        logout();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
};

export default useAuthStorage;
