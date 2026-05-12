"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@mui/material";
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="font-montserrat">
      <header className="border-b">
        <div className="flex items-center justify-between p-4 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold">
            <TravelExploreRoundedIcon fontSize='large' className="mr-3"/>
            <Link className="text-4xl"href="/">Jobly</Link>
          </h1>

          <div className="hidden md:flex items-center gap-12">
            <nav>
              <ul className="flex items-center gap-8">
                <li>
                  <Link href="/compagnies">Jobs</Link>
                </li>
                <li>Entreprise</li>
                <li>Salaire</li>
                <li>Conseils</li>
              </ul>
            </nav>

            <nav>
              <ul className="flex items-center gap-3">
                <li>
                  <Button href="/log_in" variant="contained">log in</Button>

                </li>
                <li className="px-4 py-2 ">
                  <Button href = "/sign_up"variant="contained">sign up</Button>

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
            <nav>
              <ul className="flex flex-col gap-4">
                <li>jobs</li>
                <li>entreprise</li>
                <li>salaire</li>
                <li>conseils</li>
              </ul>
            </nav>

            <div className="mt-4 flex flex-col gap-3">
              <Link href="/log_in">
                <Button variant="contained">log in</Button>
              </Link>
              <Link href="/sign_up">
                <Button variant="contained">sign up</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {children}
    </div>
  );
};

export default Layout;
