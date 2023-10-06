import { Database } from '@/database.types';
import { SupabaseClient } from '@supabase/supabase-js';
 
type Client = SupabaseClient<Database>;
 
interface InsertPostParams {
  title: string;
  content: string;
  user_id: string;
}
 
export async function insertPost(
  client: Client,
  params: InsertPostParams
) {
  const { data, error } = await client
    .from('posts')
    .insert(params)
    .select('uuid')
    .single();
 
  if (error) {
    throw error;
  }
 
  return data;
}