import { SignInWithPasswordCredentials } from '@supabase/supabase-js';
import { useMutation } from '@tanstack/react-query';
import useSupabase from '@/lib/supabase/use-supabase';
 
function useSignInWithPassword() {
  const client = useSupabase();
 
  return useMutation((credentials: SignInWithPasswordCredentials) => {
    return client.auth.signInWithPassword(credentials).then((response) => {
      if (response.error) {
        throw response.error.message;
      }
 
      return response.data;
    });
  });
}
 
export default useSignInWithPassword;