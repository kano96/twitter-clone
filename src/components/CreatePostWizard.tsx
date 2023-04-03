import { useUser } from "@clerk/nextjs";
import Image from "next/image";
const CreatePostWizard = () => {
  const { user } = useUser();

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
      />
    </div>
  );
};

export default CreatePostWizard;
