export interface FindAllProductsDto {
  products: {
    id: string;
    productId: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}
