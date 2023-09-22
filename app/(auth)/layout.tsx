import Navbar from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar isAuth={true} />
      <main className="container mx-auto max-w-screen-2xl pt-16 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;
