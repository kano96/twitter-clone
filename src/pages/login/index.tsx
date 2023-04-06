import { SignIn } from "@clerk/nextjs";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <SignIn path="/login" routing="path" signUpUrl="/sign-up" />;
    </div>
  );
};

export default Login;
