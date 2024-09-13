import ProductGateway from "../../gateway/product.gateway";
import { ProductAdmModel } from "../../repository/product.model";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase {
  private _productRepository: ProductGateway;

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository;
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await ProductAdmModel.findOne({where: {productId: input.productId}});
    return {
      productId: product.id,
      stock: product.stock,
    };
  }
}
