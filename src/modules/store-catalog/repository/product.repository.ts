import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductAdmModel } from "../../product-adm/repository/product.model";
import { StoreProductModel } from "./product.model";


export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await StoreProductModel.findAll();

    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          productId: new Id(product.productId),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
    );
  }
  async find(id: string): Promise<Product> {
    let num = Math.random();
    const product = {
      id: num.toString(),
      productId: 'productId-1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100, 
    }
    
    return new Product({
      id: new Id(product.id),
      productId: new Id(product.productId),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }

  async save(product: Product): Promise<void> {
    const existingProduct = await ProductAdmModel.findOne({
        where: {
            productId: product.productId.id,
        },
    });

    if (existingProduct.productId !== product.productId.id) {
        throw new Error('Product not found');
    }

    await StoreProductModel.create({
        id: Math.random().toString(),
        productId: Math.random().toString(),
        name: "Product 1",
        description: "Description 1",
        salesPrice: 100,
    });
}
    
  }

