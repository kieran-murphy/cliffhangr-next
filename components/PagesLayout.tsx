import React, { useEffect } from 'react';
import '../src/app/globals.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import LoadingSpinner from './LoadingSpinner';

import type { ReactNode } from 'react';

type PagesLayoutProps = {
  children: ReactNode;
};

const PagesLayout = ({ children }: PagesLayoutProps): React.JSX.Element => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <div className="text-center m-8">
      <main>{children}</main>
    </div>
  );
};

export default PagesLayout;
