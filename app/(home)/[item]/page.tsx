export default function Item({ params }: { params: { item: string } }) {
  return (
    <main className="flex">
      <img alt="" />
      <h2 className="text-2xl">{params.item}</h2>
      <p></p>
      <p></p>
      <p></p>
      <button></button>
    </main>
  );
}
