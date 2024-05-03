import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Client from "../../../modules/checkout/domain/client.entity";
import Order from "../../../modules/checkout/domain/order.entity"
import Product from "../../../modules/checkout/domain/product.entity";
import CheckoutGateway from "../../../modules/checkout/gateway/checkout.gateway";
import CheckOutRepository from "../../../modules/checkout/repository/checkout-repository";
import { PlaceOrderOutputDto } from "../../../modules/checkout/usecase/place-order/place-order.dto";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/facade.factory";
import InvoiceFacadeInterface from "../../../modules/invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import PaymentFacadeInterface from "../../../modules/payment/facade/facade.interface";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import ProductAdmFacadeInterface from "../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeInterface from "../../../modules/store-catalog/facade/store-catalog.facade.interface";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";

type OrderProps = {
    id?: Id;
    client: Client;
    products: Product[];
    status?: string;
  };

type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    address: string;
}

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    salesPrice: number
}[]

export interface PlaceOrderInputDto {
    clientId: string;
    products: {
      productId: string;
    }[];
  }

export default class CheckOutValidator {
    private productProps: ProductProps;
    private clientProps: ClientProps;
    

    constructor (clientProps: ClientProps, productProps: ProductProps) {
        this.productProps = productProps
        this.clientProps = clientProps
    }

    public async Validate (): Promise<PlaceOrderOutputDto> {
        
        const clientAdmFacade: ClientAdmFacadeInterface = ClientAdmFacadeFactory.create();
        const productAdmFacade: ProductAdmFacadeInterface = ProductAdmFacadeFactory.create();
        const storeCatalogFacade: StoreCatalogFacadeInterface = StoreCatalogFacadeFactory.create();
        const checkOutRepository: CheckoutGateway = new CheckOutRepository()
        const invoiceFacade: InvoiceFacadeInterface = InvoiceFacadeFactory.create();
        const paymentFacade: PaymentFacadeInterface = PaymentFacadeFactory.create();

        const validateProducts = new PlaceOrderUseCase(clientAdmFacade, productAdmFacade, storeCatalogFacade, checkOutRepository, invoiceFacade, paymentFacade)

        const placeOrderInputDto: PlaceOrderInputDto = {
            clientId: this.clientProps.id.id,
            products: this.productProps.map((item) => ({
                productId: item.id.id
            }))
        }
        return validateProducts.execute(placeOrderInputDto);
    }
}