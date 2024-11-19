import { Item, OrderItem, SearchParams } from "../interfaces";

export function formatRef(params: SearchParams) {
  let ref = "/";
  let delim = "?";

  ref +=
    delim +
    (params.category
      ? `category=${params.category}`
      : params.search
      ? `search=${params.search}`
      : "");

  delim = "&";

  params.brands && (ref += delim + `brands=${params.brands}`);
  params.collections && (ref += delim + `collections=${params.collections}`);
  params.materials && (ref += delim + `materials=${params.materials}`);
  params.designers && (ref += delim + `designers=${params.designers}`);

  params.order && (ref += delim + `order=${params.order}`);
  params.limit && (ref += delim + `limit=${params.limit}`);

  return ref;
}

export function formatPrice(price: number) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

export function formatName(item: Item) {
  return (
    (item.single || item.category?.single) /* localStorage */ +
    (item.name ? " " + item.name.toUpperCase() : "")
  );
}
