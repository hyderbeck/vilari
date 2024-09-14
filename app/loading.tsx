import { Spinner } from "@/components/icons";

export default function Loading() {
  return (
    <main>
      <div className="pt-6 flex justify-center">
        <Spinner />
      </div>
    </main>
  );
}
