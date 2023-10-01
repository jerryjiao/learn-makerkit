import { cookies } from 'next/headers';
import { cache } from 'react';
 
import { createClient } from '@supabase/supabase-js';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
 
import type { Database } from '@/database.types';
 
const createServerSupabaseClient = cache(() => {
  const cookieStore = cookies();
 
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});
 
/**
 * @name getSupabaseServerClient
 * @description Get a Supabase client for use in the Server Routes
 * @param params
 */
function getSupabaseServerClient(
  params = {
    admin: false,
  },
) {
  const env = process.env;
 
  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error(`Supabase URL was not provided`);
  }
 
  if (params.admin) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
 
    if (!serviceRoleKey) {
      throw new Error(`Supabase Service Role Key was not provided`);
    }
 
    return createClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
        },
      },
    );
  }
 
  return createServerSupabaseClient();
}
 
export default getSupabaseServerClient;