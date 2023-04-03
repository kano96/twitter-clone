import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/utils/api";
const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.post.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.post.getAll.invalidate();
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
      />
      <button onClick={() => mutate({ content: input })}>Post</button>
    </div>
  );
};

export default CreatePostWizard;
