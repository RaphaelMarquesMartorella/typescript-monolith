export interface SaveProductInputDto {
    id: string;
    productId: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface SaveProductOutputDto {
    id: string;
    productId: string;
    name: string;
    description: string;
    salesPrice: number;
}