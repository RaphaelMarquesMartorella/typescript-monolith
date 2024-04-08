import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import Address from "../../@shared/domain/value-object/address";
import Invoice from "../domain/invoice.entity";
import InvoiceItems from "../value-object/items.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceRepository from "./invoice.repository";

const ItemsProps1 = {
    name: 'Ball',
    price: 100
}

const ItemsProps2 = {
    name: 'Book',
    price: 40
}

describe("Invoice Repository test", () => {

    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([InvoiceModel])
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    });

    it("Should create an invoice" , async () => {
        const items1 = new InvoiceItems(ItemsProps1);
        const items2 = new InvoiceItems(ItemsProps2);

        const invoiceItemsArray: InvoiceItems[] = []
        invoiceItemsArray.push(items1)
        invoiceItemsArray.push(items2)
        

        const invoice = new Invoice ({
        id: new Id ("1"),
        name: "Maria",
        document: "1234-5678",
        address: new Address(
            "Rua 123",
            "99",
            "Casa Verde",
            "Criciúma",
            "SC",
            "88888-888"
          ),
        items: invoiceItemsArray
        })
        
        const invoiceRepository = new InvoiceRepository()
        await invoiceRepository.generate(invoice)

        const invoiceDb = await InvoiceModel.findOne( { where: { id: "1" } } )        

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual("1")
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.street).toEqual(invoice.address.street)
        expect(invoiceDb.number).toEqual(invoice.address.number)
        expect(invoiceDb.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.city).toEqual(invoice.address.city)
        expect(invoiceDb.state).toEqual(invoice.address.state)
        expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.items).toEqual(invoice.items)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)        
    });

    it("Should find an invoice" , async () => {
        const items1 = new InvoiceItems(ItemsProps1);
        const items2 = new InvoiceItems(ItemsProps2);

        const invoiceItemsArray: InvoiceItems[] = []
        invoiceItemsArray.push(items1)
        invoiceItemsArray.push(items2)
        

        const invoice = new Invoice ({
        id: new Id ("1"),
        name: "Maria",
        document: "1234-5678",
        address: new Address(
            "Rua 123",
            "99",
            "Casa Verde",
            "Criciúma",
            "SC",
            "88888-888"
          ),
        items: invoiceItemsArray
        })
        
        const invoiceRepository = new InvoiceRepository()
        await invoiceRepository.generate(invoice)      

        const invoiceDb = await invoiceRepository.find("1")          
                
        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id.id).toEqual("1")
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.address.street).toEqual(invoice.address.street)
        expect(invoiceDb.address.number).toEqual(invoice.address.number)
        expect(invoiceDb.address.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.address.city).toEqual(invoice.address.city)
        expect(invoiceDb.address.state).toEqual(invoice.address.state)
        expect(invoiceDb.address.zipCode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.items).toEqual(invoice.items)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
    });
});