import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import Image from "next/image";
import ProfileFeed from "~/components/ProfileFeed";
import { generateSsgHelper } from "~/server/helpers/ssgHelper";
import PostView from "~/components/PostView";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.post.getById.useQuery({
    id,
  });

  if (!data) {
    return <div>404</div>;
  }
  return (
    <>
      <Head>
        <title>{data.author.username}</title>
      </Head>
      <Layout>
        <PostView {...data} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSsgHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.post.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
