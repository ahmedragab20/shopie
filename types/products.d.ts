export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  currencySymbol: string;
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
}
