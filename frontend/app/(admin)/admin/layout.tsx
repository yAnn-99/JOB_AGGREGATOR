"use client";
import Link from "next/link";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header className="border-b">
        <div className="flex items-center justify-between p-4 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold">
            <Link href="/">Jobly</Link>
          </h1>        
          <div className="flex flex-row text-xl md:text-2xl font-bold font-montserrat ">Admin page</div>

        </div>

          
      </header>

      {children}
    </div>
  );
};

export default Layout;
