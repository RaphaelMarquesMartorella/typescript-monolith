import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductRepository from "../../repository/product.repository";

const MockRepository = () => {
    return {
      save: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn(),
    };
}

describe("save product usecase unit test", () => {
    it("should save a product", async () => {
        const productRepository = MockRepository();
        const usecase = new SaveProductUseCase(productRepository);
    
        const input = {
            id: "7560a67b-500e-4d88-b7f3-36263b0bb8c1",
            name: "DDD",
            description: "Domain Driven Design",
            salesPrice: 100,
        };
        const output = {
            id: "7560a67b-500e-4d88-b7f3-36263b0bb8c1",
            name: "DDD",
            description: "Domain Driven Design",
            salePrice: 100,
            purchasePrice: 50,
        }
    
        await usecase.execute(input);
    
        expect(productRepository.save).toHaveBeenCalledWith(product);
    });
    });