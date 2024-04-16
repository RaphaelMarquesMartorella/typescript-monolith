import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../value-object/items.entity";
import CreatedAt from "../../@shared/domain/value-object/created-at.value-object";
import UpdatedAt from "../../@shared/domain/value-object/updated-at.value-object";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(entity: Invoice): Promise<void> {
        try {
            if (entity) {
                await InvoiceModel.create({
                    id: entity.id.id,
                    name: entity.name,
                    street: entity.address.street,
                    number: entity.address.number,
                    complement: entity.address.complement,
                    city: entity.address.city,
                    state: entity.address.state,
                    zipcode: entity.address.zipCode,
                    document: entity.document,
                    createdAt: entity.createdAt,
                    updatedAt: entity.updatedAt,
                    items: entity.items.map((item) => ({
                        id: item.itemId,
                        name: item.itemName,
                        price: item.itemPrice
                    }))
                },
                    {
                        include: ['items']
                    },
                )

            };

        } catch (error) {
            console.log(error);
        }

    };


    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id: id },
            include: ['items']
        })        

        if (!invoice) {
            throw new Error("Invoice not found")
        }

        const ID = new Id(invoice.id)
        const createdAt = new CreatedAt(invoice.createdAt)
        const updatedAt = new UpdatedAt(invoice.updatedAt)

        const address = new Address(
            invoice.street,
            invoice.number,
            invoice.complement,
            invoice.city,
            invoice.state,
            invoice.zipcode,
        )

        const invoiceItems = invoice.items.map(item => {
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            });
        });

        const result = new Invoice({
            id: ID,
            createdAt: createdAt.createdAt,
            updatedAt: updatedAt.updatedAt,
            name: invoice.name,
            document: invoice.document,
            address: address,
            items: invoiceItems,
        })
        return result
    }
    
}