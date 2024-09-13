import Product from "../domain/product.entity";

export default interface ProductGateway {

  create(product: Product): Promise<void>
  find(id: string): Promise<Product>
}