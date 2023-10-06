import Link from "next/link";
import { LucideLayoutDashboard } from "lucide-react";
 
import { Button } from "@/components/ui/button";
 
function DashboardPage() {
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
            <Link href='/new'>
              Create New Post
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
 
export default DashboardPage;