import { api } from "~/utils/api";
import { LoadingPage } from "./LoadingPage";
import PostView from "./PostView";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.post.getPostsByUserId.useQuery({
    userId: props.userId,
  });
  if (isLoading) {
    return <LoadingPage />;
  }
  if (!data) {
    return <div>User has not posted</div>;
  }
  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default ProfileFeed;
