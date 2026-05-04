const Page = () => {
  return (
    <main>
      <div className="flex flex-col items-start justify-center p-6 sm:p-8 md:p-12">
        
        <div className="flex flex-col items-start gap-4 max-w-xl">
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Trouvez le Job <br /> qui VOUS correspond
          </h1>

          <h2 className="text-base sm:text-lg md:text-xl text-gray-600">
            Des milliers d'offres d'emploi pour booster votre carrière professionnelle
          </h2>

          <div className="flex w-full flex-col sm:flex-row items-stretch sm:items-center overflow-hidden rounded-md border">
            
            <input
              type="text"
              className="flex-1 px-3 py-2 outline-none"
              placeholder="Rechercher..."
            />

            <button className="bg-blue-500 px-4 py-2 text-white">
              Search
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Page;