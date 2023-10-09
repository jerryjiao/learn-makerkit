import Link from 'next/link';
import { PencilIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { use } from 'react';
 
import { fetchPostByUid } from '@/lib/queries/posts';
import getSupabaseServerClient from '@/lib/supabase/server-client';
import DeletePostButton from './components/DeletePostButton';
 
interface PostPageParams {
  params: {
    id: string;
  };
}
 
function PostPage({ params }: PostPageParams) {
  const post = use(loadPost(params.id));
 
  return (
    <div className='flex flex-col space-y-4 max-w-3xl mx-auto pb-16'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>
          {post.title}
        </h1>
    
        <div className='flex space-x-2.5'>
          <Button variant={'link'} className='flex space-x-2'>
            <PencilIcon className='w-3 h-3' />
            <Link href={`/dashboard/${params.id}/edit`}>Edit</Link>
          </Button>

          <DeletePostButton uid={params.id} />
        </div>
      </div>
 
      <h2 className='text-lg font-medium'>
        {post.description}
      </h2>
 
      <div className='whitespace-break-spaces'>
        {post.content}
      </div>
    </div>
  );
}
 
async function loadPost(id: string) {
  const client = getSupabaseServerClient();
  const { data, error } = await fetchPostByUid(client, id);
 
  if (error) {
    throw error;
  }
 
  return data;
}
 
export default PostPage;