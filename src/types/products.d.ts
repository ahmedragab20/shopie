export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  company: string;
  images: Image[];
  colors: Color[];
}

export interface Image {
  color: string;
  url: string;
  alt: string;
  title: string;
}

export interface Color {
  name: string;
  hex: string;
  bg_tailwind: string;
  color_tailwind: string;
  lighter_hex: string;
  darker_hex: string;
}

export interface ICartProduct extends Product {
  quantity: number;
  /**
   * the offer in case the product has one (0-100%)
   */
  offer: number;
  chosenColor: Color;
}
