import ClientAdmFacadeInterface from "../../client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../client-adm/factory/facade.factory";
import InvoiceFacadeInterface from "../../invoice/facade/invoice.facade.interface";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeInterface from "../../payment/facade/facade.interface";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeInterface from "../../product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeInterface from "../../store-catalog/facade/store-catalog.facade.interface";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutGateway from "../gateway/checkout.gateway";
import CheckOutRepository from "../repository/checkout-repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckOutFactory {
    create(): PlaceOrderUseCase {
        const clientAdmFacade: ClientAdmFacadeInterface = ClientAdmFacadeFactory.create();
        const productAdmFacade: ProductAdmFacadeInterface = ProductAdmFacadeFactory.create();
        const storeCatalogFacade: StoreCatalogFacadeInterface = StoreCatalogFacadeFactory.create();
        const checkOutRepository: CheckoutGateway = new CheckOutRepository()
        const invoiceFacade: InvoiceFacadeInterface = InvoiceFacadeFactory.create();
        const paymentFacade: PaymentFacadeInterface = PaymentFacadeFactory.create();

        return new PlaceOrderUseCase(clientAdmFacade, productAdmFacade, storeCatalogFacade, checkOutRepository, invoiceFacade, paymentFacade)
    }
}