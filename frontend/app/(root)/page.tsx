import { InputBase } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const Page = () => {
  return (
    <main>
      <div className="flex flex-col items-start justify-center p-6 pt-10 sm:p-8 md:p-12">

        <div className="flex flex-col items-start gap-4 max-w-xl">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
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
              <SearchIcon/> Search
            </button>


          </div>



        </div>
      </div>
    </main>
  );
};

export default Page;