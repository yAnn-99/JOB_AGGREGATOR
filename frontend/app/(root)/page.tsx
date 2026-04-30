const Page = () => {
  return (
    <main>
      <div className="flex items-center p-8">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-6xl">
            Trouvez le Job <br /> qui VOUS correspond
          </h1>
          <h2 className="text-l">
            des millies d'offres d'emploies pour booster votre carriere
            professionnel
          </h2>
          <div className="items-center overflow-hidden rounded-md border">
            <input
              type="text"
              className="px-3 py-2 outline-none"
              placeholder="Rechercher..."
            />
            <button className="bg-blue-500 px-4 py-2 text-white">search</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;