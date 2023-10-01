import { SignInWithOAuthCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import useSupabase from '@/lib/supabase/use-supabase';
 
function useSignInWithOAuth() {
  const client = useSupabase();
 
  return useMutation(async (credentials: SignInWithOAuthCredentials) => {
    const response = await client.auth.signInWithOAuth(credentials);
 
    if (response.error) {
      throw response.error.message;
    }
 
    return response.data;
  });
}
 
export default useSignInWithOAuth;