import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import OrderModel from "./checkout.model";

export default class CheckOutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        console.log("order", order);
        
        try {
            await OrderModel.create({
                id: order.id.id,
                clientId: order.client.id.id,
                clientName: order.client.name,
                email: order.client.email,
                address: order.client.address,
                total: order.total,
                status: order.status,
                productId: order.products[0].id.id,
                productName: order.products[0].name,
                description: order.products[0].description,
                salesPrice: order.products[0].salesPrice,
            });
        } catch (error) {
            console.error("Error saving order:", error);
            throw new Error("Failed to save order");
        }
    }
    

    findOrder(id: string): Promise<Order> {
        throw new Error('Method not implemented');
    }
}
