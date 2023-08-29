import { Navbar } from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
};

export default Layout;
