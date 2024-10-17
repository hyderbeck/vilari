import { SearchParams } from "./interfaces";

export function buildRef(searchParams: SearchParams) {
  let ref = "/";
  let delim = "?";
  if (searchParams.type) {
    ref += delim + `type=${searchParams.type}`;
    delim = "&";
  } else if (searchParams.search) {
    ref += delim + `search=${searchParams.search}`;
    delim = "&";
  }

  if (searchParams.brands) ref += delim + `brands=${searchParams.brands}`;
  if (searchParams.collections)
    ref += delim + `collections=${searchParams.collections}`;
  if (searchParams.designers)
    ref += delim + `designers=${searchParams.designers}`;
  if (searchParams.materials)
    ref += delim + `materials=${searchParams.materials}`;

  if (searchParams.order) ref += delim + `order=${searchParams.order}`;
  if (searchParams.limit) ref += delim + `limit=${searchParams.limit}`;
  return ref;
}
