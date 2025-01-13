import { ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {

  return <ClerkProvider
    appearance={{
      layout: {
        unsafe_disableDevelopmentModeWarnings: true
      }
    }}
    dynamic>{children}</ClerkProvider>;
};

export default AuthWrapper;
