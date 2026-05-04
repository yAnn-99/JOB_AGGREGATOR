"use client";
import { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header className="border-b">
        <div className="flex items-center justify-between p-4 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold"><a href="/">Jobly</a></h1>

          <div className="hidden md:flex items-center gap-12">
            <nav>
              <ul className="flex items-center gap-8">
                <li><a href="/compagnies">jobs</a></li>
                <li>entreprise</li>
                <li>salaire</li>
                <li>conseils</li>
              </ul>
            </nav>

            <nav>
              <ul className="flex items-center gap-6">
                <li>sign up</li>
                <li className="px-4 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition">
                  inscription
                </li>
              </ul>
            </nav>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden px-4 pb-4">
            <ul className="flex flex-col gap-4">
              <li>jobs</li>
              <li>entreprise</li>
              <li>salaire</li>
              <li>conseils</li>
            </ul>

            <div className="mt-4 flex flex-col gap-3">
              <button>sign up</button>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                inscription
              </button>
            </div>
          </div>
        )}
      </header>

      {children}
    </div>
  );
};

export default Layout;
