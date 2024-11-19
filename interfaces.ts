interface Field {
  id: number;
  name: string;
}
export interface Category extends Field {
  department: number;
  single?: string;
}
export interface Brand extends Field {
  country: string;
  description?: string;
  categories: number[];
}
export interface Collection extends Field {
  brand: number | Brand;
  description?: string;
  categories: number[];
}
export interface Material extends Field {
  collections: number[];
  categories: number[];
}
export interface OrderItem extends Field {
  brand: Field;
  collection?: Field;
  quantity: number;
  wms_id: string;
  price: number;
  amount: number;
  single: string;
}
export interface Item
  extends Omit<OrderItem, "brand" | "collection" | "amount"> {
  brand: Brand;
  collection?: Collection;
  designer: Field;
  material: Material;
  category: Category;
  colors: Field[];
  lwh: number[];
  volume?: number;
  tag?: string;
}
export type Page = "home" | "checkout" | "item";

export type Order = "order" | "pre";

export type SearchParams = {
  [key in
    | "category"
    | "search"
    | "limit"
    | "order"
    | "brands"
    | "collections"
    | "materials"
    | "designers"]?: string;
};
