'use client';
 
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@supabase/supabase-js';
 
import useSupabase from '@/lib/supabase/use-supabase';
 
export default function AuthChangeListener({
  children,
  session,
  redirectTo,
}: React.PropsWithChildren<{
  session: Session | undefined;
  redirectTo?: string;
}>) {
  const shouldActivateListener = typeof window !== 'undefined';
 
  // we only activate the listener if
  // we are rendering in the browser since we use Browser APIs
  if (!shouldActivateListener) {
    return <>{children}</>;
  }
 
  return (
    <AuthRedirectListener
      session={session}
      redirectTo={redirectTo}
    >
      {children}
    </AuthRedirectListener>
  );
}
 
function AuthRedirectListener({ children, session, redirectTo }: React.PropsWithChildren<{
  session: Session | undefined;
  redirectTo?: string;
}>) {
  const client = useSupabase();
  const router = useRouter();
  const accessToken = session?.access_token;
  const redirectUserAway = useRedirectUserAway();
 
  useEffect(() => {
    // keep this running for the whole session
    // unless the component was unmounted, for example, on log-outs
    const listener = client.auth.onAuthStateChange((state, user) => {
      // log user out if user is falsy
      if (!user && redirectTo) {
        return redirectUserAway(redirectTo)
      }
 
      // if the tokens are the same, we do not need to do anything
      // if the tokens are different, we need to refresh the page
      // to load the new access token
      const isOutOfSync = user?.access_token !== accessToken;
 
      // server and client are out of sync.
      // We need to recall active loaders after actions complete
      if (isOutOfSync) {
        void router.refresh();
      }
    });
 
    // destroy listener on un-mounts
    return () => {
      listener.data.subscription.unsubscribe();
    };
  }, [accessToken, client.auth, redirectUserAway, redirectTo, router]);
 
  return children;
};
 
function useRedirectUserAway() {
  return useCallback((path: string) => {
    const currentPath = window.location.pathname;
    const isNotCurrentPage = currentPath !== path;
 
    // we then redirect the user to the page
    // specified in the props of the component
    if (isNotCurrentPage) {
      window.location.assign(path);
    }
  }, []);
}