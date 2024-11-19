interface Brand {
  id: number;
  name: string;
  country: string;
  description?: string;
  categories: number[];
}

interface Collection {
  id: number;
  name: string;
  description?: string;
  brand: number | Brand;
  categories: number[];
}

interface Material {
  id: number;
  name: string;
  collections: number[];
  categories: number[];
}

interface Color {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name?: string;
  brand: Brand;
  collection?: Collection;
  designer?: { id: number; name: string };
  material: Material;
  category: { id: number; name: string; single?: string };
  colors: Color[];
  lwh: number[];
  volume?: number;
  weight?: number;
  wms_id: string;
  price: number;
  variants?: number[];
  quantity: number;
  single?: string;

  amount?: number;
}

export interface Category {
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
    | "category"
    | "search"
    | "brands"
    | "collections"
    | "designers"
    | "materials"
    | "order"
    | "limit"
    | "secret"]?: string;
};
