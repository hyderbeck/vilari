export interface Item {
  id: string;
}

export interface ItemPreview extends Item {
  name: string;
  price: string;
  code: string;
}

export interface ItemPage extends ItemPreview {
  itemType: string;
}

export interface ItemPosition extends Item {
  price: number;
  quantity: number;
}
