import getSupabaseServerClient from "@/lib/supabase/server-client";
import { cache } from "react";
 
const loadSession = cache(async () => {
  const client = getSupabaseServerClient();
  const { data } = await client.auth.getSession();
 
  return data.session ?? undefined;
});
 
export default loadSession;