export interface Item {
  id: string;
  price: number;
  quantity: number;
}

export interface ItemPreview extends Item {
  name: string;
  material: string;
  size: string;
  designer: { href: string; name: string };
  collection: { href: string; name: string };
  imageHref: string;
  itemType: string;
  stock: number;
}

export interface ItemTypes {
  [key: string]: { id: string; name: string }[];
}
