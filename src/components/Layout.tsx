import type { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full overflow-y-scroll border-x   border-slate-400 scrollbar-hide md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
