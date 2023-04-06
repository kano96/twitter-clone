import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";

import CreatePostWizard from "~/components/CreatePostWizard";
import Feed from "~/components/Feed";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";
import Router from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      Router.push("/login").catch((err) => console.error(err));
    }
  }, [isSignedIn]);

  // Start fetching posts asap
  api.post.getAll.useQuery();

  if (!userLoaded) {
    return <div />;
  }

  return (
    <>
      <Layout>
        <div className="flex border-b border-slate-400 p-4 ">
          <CreatePostWizard />
        </div>

        <Feed />
      </Layout>
    </>
  );
};

export default Home;
