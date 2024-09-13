export interface FindProductInputDto {
  id: string;
}

export interface FindProductOutputDto {
  id: string;
  productId: string;
  name: string;
  description: string;
  salesPrice: number;
}
