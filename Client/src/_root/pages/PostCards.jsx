import { useGetPosts } from '../../lib/reactQuery/queriesAndMutations';
import PostContents from '../../components/posts/PostContents';
import { Loader } from '../../components';
import { useError } from '../../hooks/customHooks';

const PostCards = () => {
  const { handleError } = useError();

  // Fetch posts : React Query
  const {
    data: posts,
    isPending: isPendingPosts,
    isError: isErrorPosts,
    error,
  } = useGetPosts();

  if (isPendingPosts) {
    return (<div className="h-full w-full mt-[25%] flex-center">
      <Loader size={"xl"} /></div>);
  }

  if (isErrorPosts) {
    handleError('apiGetPosts', 'Something went wrong.')
  }

  return (
    !posts ? 'No Posts' : posts.map((post, index) => (
      <div key={index} className="w-full flex-center px-5 pt-3 pb-20">
        <div className="w-full md:w-[80%] flex flex-col gap-1 lg:px-3 lg:gap-2 text-[16px]">

          <PostContents
            post={post}
            index={index}
          />
        </div>
      </div>
    )
    )
  )
}

export default PostCards