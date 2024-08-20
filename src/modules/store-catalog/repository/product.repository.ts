import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import ProductModel from "./product.model";
import { ProductModel as ProductAdmModel } from "../../product-adm/repository/product.model";


export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();

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
    const product = await ProductModel.findOne({
      where: {
        id: id,
      },
    });

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
            id: product.productId,
        },
    });

    if (!existingProduct) {
        throw new Error('Product not found');
    }

    await ProductModel.create({
        id: product.id.id,
        productId: product.productId.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
    });
}
  }

