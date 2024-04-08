import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../value-object/items.entity";

export default class InvoiceRepository implements InvoiceGateway {
    async generate(entity: Invoice): Promise<void> {
        try {
            if(entity) {
                    const invoice = await InvoiceModel.build({
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
                        updatedAt: entity.updatedAt
                    });
                    entity.items.forEach(item => {
                        invoice.items.push(item);
                    });
                    invoice.save();
                };
        
        } catch (error) {
            console.log(error);
        }
        
    };


    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne( { where: {id: id} })

        if (!invoice) {
            throw new Error("Invoice not found")
          }

        const ID = new Id(invoice.id)

        const address = new Address(
            invoice.street,
            invoice.number,
            invoice.complement,
            invoice.city,
            invoice.state,
            invoice.zipcode,
          )

          console.log(invoice.items);
          
          const invoiceItems = invoice.items.map(item => {
            return new InvoiceItems({
                id: new Id(item.itemId),
                name: item.itemName,
                price: item.itemPrice
            });
        });
        
        console.log(invoiceItems);

        const result = new Invoice({
            id: ID,
            name: invoice.name,
            document: invoice.document,
            address: address,
            items: invoiceItems,
        })        
        return result
    }
}