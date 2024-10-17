interface Brand {
  id: number;
  name: string;
  country: string;
}
interface Collection {
  id: number;
  name: string;
  description?: string;
  brand: number;
}
interface Material {
  id: number;
  name: string;
  collections: number[];
}

export interface Item {
  id: number;
  name: string;
  brand: Brand;
  collection?: Collection;
  designer?: { id: number; name: string };
  material: Material;
  type: { id: number; name: string };
  lwh: [number, number, number];
  volume?: number;
  weight?: number;
  moysklad_id: string;
  price: number;
  quantity: number;
  full_name: string;

  amount?: number;
}

export interface ItemGroup {
  id: number;
  name: string;
  department: number;
}

export interface Filters {
  brands: Brand[];
  collections: Collection[];
  materials: Material[];
}

export type SearchParams = {
  [key in
    | "type"
    | "search"
    | "brands"
    | "collections"
    | "designers"
    | "materials"
    | "order"
    | "limit"]?: string;
};
