import {
  createClientComponentClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
 
import type { Database } from '@/database.types';
 
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
 
const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
 
if (!NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error(`Supabase URL was not provided`);
}
 
if (!NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(`Supabase Anon key was not provided`);
}
 
let client: SupabaseClient<Database>;
 
function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }
 
  client = createClientComponentClient<Database>({
    supabaseUrl: NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
 
  return client;
}
 
export default getSupabaseBrowserClient;