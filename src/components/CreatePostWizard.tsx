import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";
import { LoadingSpinner } from "./LoadingPage";
import Router from "next/router";

const CreatePostWizard = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  if (!user) {
    return null;
  }
  return (
    <div className="flex w-full gap-3">
      <Image
        src={user.profileImageUrl}
        alt=" Profile Image"
        className="rounded-full"
        width={56}
        height={56}
      />
      <input
        type="text"
        placeholder="What is happening?"
        className="grow bg-transparent outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isPosting}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
      />
      {input !== "" && !isPosting && (
        <button
          className="rounded-2xl bg-[#1D9BF0] px-5 text-white"
          onClick={() => mutate({ content: input })}
        >
          Post
        </button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
      <button
        className="ml-2 rounded-2xl bg-[#1D9BF0] p-2 text-white"
        onClick={() => {
          signOut()
            .then(() =>
              Router.push("/login").catch((err) => console.error(err))
            )
            .catch((err) => console.error(err));
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default CreatePostWizard;
