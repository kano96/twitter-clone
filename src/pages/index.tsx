import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import CreatePostWizard from "~/components/CreatePostWizard";
import Feed from "~/components/Feed";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching posts asap
  api.post.getAll.useQuery();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <Layout>
      <div className="flex border-b border-slate-400 p-4 ">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreatePostWizard />}
      </div>

      <Feed />
    </Layout>
  );
};

export default Home;
