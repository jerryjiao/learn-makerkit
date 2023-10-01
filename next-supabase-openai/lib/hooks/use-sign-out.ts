import { useCallback } from "react";
import useSupabase from "@/lib/supabase/use-supabase";
 
function useSignOut() {
  const client = useSupabase();
 
  return useCallback(async () => {
    await client.auth.signOut();
  }, [client.auth]);
}
 
export default useSignOut;