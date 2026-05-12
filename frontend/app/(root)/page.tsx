import { InputBase } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Image from "next/image";
import picture from '../../images/job.jpg'


const Page = () => {
  return (
    <main className="min-h-screen">
      <div className="flex flex-row h-full min-h-screen">
        <div className="flex flex-col items-start justify-start p-6 pt-10 sm:p-8 md:p-12  ">


          <div className="flex flex-col items-start gap-4 max-w-xl">

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-10">
              Trouvez rapidement le <span className="text-[#1976d2]">Job</span> <br /> qui  <span className="text-[#1976d2]">VOUS</span> correspond
            </h1>

            <h2 className="text-base sm:text-lg md:text-xl text-gray-600">
              {"Des milliers d'offres d'emploi pour booster votre carrière professionnelle"}
            </h2>

            <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-0  ">

              <input
                type="text"
                className="flex-1 px-3 py-2 border border-black/50 text-black rounded-md "
                placeholder="Rechercher..."
              />

              <button className="bg-[#1976d2] px-4 py-2 sm:ml-3  text-white shadow-md rounded-md">
                <SearchIcon /> Search
              </button>


            </div>

          </div>
        </div>
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          <div className="relative flex justify-center items-center">
            <div className="absolute w-255 h-255 bg-[#1976d2] rotate-45 translate-x-95" />
            <Image
              src={picture}
              width={800}
              height={800}
              alt="Job"
              className="relative bg-[#1976d2] p-4 rounded-md lg:visible md:invisible sm:invisible"
            />

          </div>
        </div>          
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[clamp(200px,80vw,80vw)] h-[clamp(200px,80vw,80vw)] bg-[#1976d2] rotate-45 rounded-md -z-10 lg:hidden pointer-events-none md:invisible"></div>

      </div>
    </main>
  );
};

export default Page;