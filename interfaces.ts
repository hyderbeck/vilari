interface Brand {
  id: number;
  name: string;
  country: string;
  description?: string;
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

interface Color {
  id: number;
  name: string;
}

export interface ItemVariant {
  material?: number | Material;
  moysklad_id?: string;
  price?: number;
  colors?: Color[];
  object_name?: string;
}

export interface Item {
  id: number;
  name: string;
  brand: Brand;
  collection?: Collection;
  designer?: { id: number; name: string };
  material: Material;
  type: { id: number; name: string; singular?: string };
  colors: Color[];
  lwh: number[];
  volume?: number;
  weight?: number;
  moysklad_id: string;
  price: number;
  object_name?: string;
  variants?: ItemVariant[];
  quantity?: number;
  collab?: {
    col: "brand" | "collection";
    val: Brand | Collection;
  };

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
