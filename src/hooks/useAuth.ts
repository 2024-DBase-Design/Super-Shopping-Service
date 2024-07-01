'use client'; // Ensures this component is only rendered on the client side

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useClientSide from './useClientSide';

const useAuth = (redirectTo: string) => {
  const router = useRouter();
  const isClient = useClientSide();

  useEffect(() => {
    if (isClient) {
      const token = window.localStorage.getItem('token');
      if (!token) {
        router.push(redirectTo);
      }
    }
  }, [router, redirectTo, isClient]);
};

export default useAuth;
