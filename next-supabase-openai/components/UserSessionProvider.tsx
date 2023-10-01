'use client';
 
import { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import UserSessionContext from './UserSessionContext';
 
function UserSessionProvider(props: React.PropsWithChildren<{
  session: Session | undefined;
}>) {
  const [session, setSession] = useState<Session | undefined>(props.session);
 
  return (
    <UserSessionContext.Provider value={{ session, setSession }}>
      {props.children}
    </UserSessionContext.Provider>
  );
}
 
export default UserSessionProvider;