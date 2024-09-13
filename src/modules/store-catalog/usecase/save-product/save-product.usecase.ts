import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { SaveProductInputDto, SaveProductOutputDto } from "./save-product.dto";

export default class SaveProductUseCase {
    private repository: ProductGateway;

    constructor(repository: ProductGateway) {
        this.repository = repository;
    }

    async execute(input: SaveProductInputDto): Promise<SaveProductOutputDto> {
        const product = new Product({
            id: new Id (input.id),
            productId: new Id(input.productId),
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice,
        });
        await this.repository.save(product);
        return {
            id: product.id.id,
            productId: product.productId.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }
    }
}