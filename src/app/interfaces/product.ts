export interface Product  {
    _id?: string ; 
    title: string;
    slug: string;
    ingredients: string;
    description: string;
    prix: number;
    promotion: number;
    category: any
    images: any[];
    totalrating: number;
  }