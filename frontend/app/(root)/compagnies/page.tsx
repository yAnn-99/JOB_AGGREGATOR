import Card from "@/component/card";

const Page = () => {
  const card = [1, 2, 3, 4, 5, 6, 7];
  return (
    <main className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4">
      {card.map((element) => (
        <Card key={element} />
      ))}
    </main>
  );
};

export default Page;
