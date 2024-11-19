import { Item, SearchParams } from "./interfaces";

export function buildRef(searchParams: SearchParams) {
  let ref = "/";
  let delim = "?";
  if (searchParams.category) {
    ref += delim + `category=${searchParams.category}`;
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

export function fmtPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

export function formatName(item: Item) {
  return (
    (item.single || item.category?.single) /* localStorage */ +
    (item.name ? " " + item.name.toUpperCase() : "")
  );
}

export const departments = [
  { id: 1, name: "Столовые предметы", param: "tableware" },
  { id: 2, name: "Чайные предметы", param: "teaware" },
  { id: 3, name: "Декор", param: "decor" },
];
