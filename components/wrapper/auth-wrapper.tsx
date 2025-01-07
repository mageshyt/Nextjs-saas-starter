import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {

  return <ClerkProvider dynamic>{children}</ClerkProvider>;
};

export default AuthWrapper;
