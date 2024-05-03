import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";

export default class CheckOutRepository implements CheckoutGateway {
    addOrder(order: Order): Promise<void> {
        throw new Error('Method not implemented');
        
    }
    findOrder(id: string): Promise<Order> {
        throw new Error('Method not implemented');
        
    }
}