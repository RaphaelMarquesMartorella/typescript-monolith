export interface AddProductInputDto {
  id?: string;
  productId?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface AddProductOutputDto {
  id: string;
  productId: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
