import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import useClientSide from './useClientSide';

interface DecodedToken {
  id: number;
  email: string;
  role: string;
  exp: number;
}

/**
 * Hook to check if the user has the required role
 *
 * @param allowedRoles
 * @param redirectTo
 */
const useRoleAuth = (allowedRoles: string[], redirectTo: string) => {
  const router = useRouter();
  const isClient = useClientSide();

  useEffect(() => {
    if (isClient) {
      const token = window.localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const decoded = jwtDecode<DecodedToken>(token);
        if (!allowedRoles.includes(decoded.role)) {
          router.push(redirectTo);
        }
      } catch (error) {
        window.localStorage.removeItem('token');
        router.push('/login');
      }
    }
  }, [router, isClient, allowedRoles, redirectTo]);
};

export default useRoleAuth;
