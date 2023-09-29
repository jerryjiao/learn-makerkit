import Spinner from '@/components/Spinner';
 
function Loading(
  { children }: React.PropsWithChildren
) {
  return (
    <div className="flex flex-col space-y-8 items-center justify-center h-screen">
      <Spinner />
 
      <p className="text-gray-500 dark:text-gray-400">
        { children ?? `Loading...` }
      </p>
    </div>
  );
}
 
export default Loading;