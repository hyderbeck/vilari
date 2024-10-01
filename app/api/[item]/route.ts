import { getImageHref } from "@/queries";

export async function GET(
  _request: Request,
  { params }: { params: { item: string } }
) {
  const res = await getImageHref(params.item);
  return Response.json(res || "");
}
