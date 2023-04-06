import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { appRouter } from "~/server/api/root";
import { api } from "~/utils/api";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { prisma } from "~/server/db";
import superjson from "superjson";
import Layout from "~/components/Layout";
import Image from "next/image";
import ProfileFeed from "~/components/ProfileFeed";
import { useUser } from "@clerk/nextjs";
import Router from "next/router";
import { useEffect } from "react";

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { isSignedIn } = useUser();
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  useEffect(() => {
    if (!isSignedIn) {
      Router.push("/login").catch((err) => console.error(err));
    }
  }, [isSignedIn]);

  if (!data) {
    return <div>404</div>;
  }
  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <Layout>
        <div className="relative h-36  bg-slate-600">
          <Image
            src={data.profilImageUrl}
            alt={`${data.username ?? ""} profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">
          {`@${data.username ?? ""}`}{" "}
        </div>
        <div className="w-full border-b border-slate-400"></div>
        <ProfileFeed userId={data.id} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, userId: null },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
