import { SignUp } from "@clerk/nextjs";

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignUp path="/sign-up" routing="path" signInUrl="/login" />;
    </div>
  );
};

export default Register;
