import { createContext } from "react";
import { Session } from "@supabase/supabase-js";
 
const UserSessionContext = createContext<{
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
}>({
  session: undefined,
  setSession: (_) => _,
});
 
export default UserSessionContext;