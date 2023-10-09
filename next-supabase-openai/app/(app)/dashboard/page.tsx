import Link from "next/link";
import { redirect } from 'next/navigation';
import { use } from "react";
import { LucideLayoutDashboard } from "lucide-react";
 
import { Button } from "@/components/ui/button";
import { fetchPosts } from "@/lib/queries/posts";
import getSupabaseServerClient from "@/lib/supabase/server-client";
 
function DashboardPage() {
  const posts = use(fetchDashboardPageData());
 
  return (
    <div className='container'>
      <div className='flex flex-col flex-1 space-y-8'>
        <div className='flex justify-between items-start'>
          <h1 className='text-2xl font-semibold flex space-x-4 items-center'>
            <LucideLayoutDashboard className='w-5 h-5' />
 
            <span>
              Dashboard
            </span>
          </h1>
 
          <Button>
            <Link href="/new">Create New Post</Link>
          </Button>
        </div>
 
        <div className='flex flex-col space-y-4'>
          {posts.map((post) => {
            return (
              <Link href={'/dashboard/' + post.uuid} key={post.id}>
                <h2 className='text-lg font-medium'>
                  {post.title}
                </h2>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}
 
export default DashboardPage;
 
async function fetchDashboardPageData() {
  const client = getSupabaseServerClient();
  const sessionResponse = await client.auth.getSession();
  const user = sessionResponse.data?.session?.user;
 
  if (!user) {
    redirect('/auth/sign-in');
  }
 
  const { data, error } = await fetchPosts(client, user.id);
 
  if (error) {
    throw error;
  }
 
  return data;
}