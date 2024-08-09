import Preview from "@/components/preview";

export default function Checkout() {
  return (
    <main>
      <h2></h2>
      <form className="flex flex-col items-center">
        <label>
          <input type="text" />
        </label>
        <label>
          <input type="tel" />
        </label>
        <label>
          <input type="text" />
        </label>
        <label>
          <textarea />
        </label>
      </form>
      <section>
        <Preview />
      </section>
    </main>
  );
}
