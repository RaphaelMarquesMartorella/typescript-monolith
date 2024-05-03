import CheckOutFactory from "../../../modules/checkout/factory/checkout.factory";
import { PlaceOrderOutputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";

export interface PlaceOrderInputDto {
    clientId: string;
    products: {
      productId: string;
    }[];
  }
export interface ValidatorDto {
    clientId: string;
    products: {
      productId: string;
    }[];
}

export default class CheckOutValidator {
    private validatorDto: ValidatorDto;

    constructor (validatorDto: ValidatorDto) {
        this.validatorDto = validatorDto
    }

    public async Validate (): Promise<PlaceOrderOutputDto> {
        const checkOutFactory = new CheckOutFactory()
        const validateProducts = checkOutFactory.create()

        const placeOrderInputDto: PlaceOrderInputDto = {
            clientId: this.validatorDto.clientId,
            products: this.validatorDto.products
        }
        return validateProducts.execute(placeOrderInputDto);
    }
}