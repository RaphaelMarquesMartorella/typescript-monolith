import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

type ProductProps = {
  id?: Id;
  productId?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export default class AddProductUseCase {
  private _productRepository: ProductGateway;

  constructor(_productRepository: ProductGateway) {
    this._productRepository = _productRepository;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props: ProductProps = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    };

    if (input.productId) {
      props.productId = new Id(input.productId);
    }

    const product = new Product(props);
    this._productRepository.add(product);
    console.log(product);
    
    return {
      id: product.id.id,
      productId: product.productId.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
