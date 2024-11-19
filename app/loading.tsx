import { Skeleton } from "@/components/skeleton";
import { Spinner } from "@/components/icons";

export default function Loading() {
  return (
    <Skeleton className="mt-32 flex-1">
      <Spinner />
    </Skeleton>
  );
}
