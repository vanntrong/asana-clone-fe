import Navbar from "@/components/navbar";
import AppProvider from "@/providers/AppProvider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col h-screen overflow-y-hidden">
      <Navbar />
      <div>
        <AppProvider>
          <main className="mx-auto flex-grow">{children}</main>
        </AppProvider>
      </div>
      <footer className="w-full flex items-center justify-center py-3"></footer>
    </div>
  );
};

export default Layout;
