export interface ProductOptionChoice {
  name: string;
  price: number;
}

export interface ProductOption {
  id: string;
  name: string;
  optionType: 'Radio' | 'Checkbox';
  choices: ProductOptionChoice[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  thumbnail?: string;
  status: 'None' | 'Best' | 'New';
  soldout: boolean;
  productOptions: ProductOption[];
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}
