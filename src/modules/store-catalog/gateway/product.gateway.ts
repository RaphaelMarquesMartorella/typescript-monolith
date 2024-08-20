import Product from "../domain/product.entity";

export default interface ProductGateway {
  findAll(): Promise<Product[]>;
  find(id: string): Promise<Product>;
  save(product: Product): Promise<void>;
}
