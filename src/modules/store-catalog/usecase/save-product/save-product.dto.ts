export interface SaveProductInputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
}

export interface SaveProductOutputDto {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
    purchasePrice: number;
    stock: number;
}