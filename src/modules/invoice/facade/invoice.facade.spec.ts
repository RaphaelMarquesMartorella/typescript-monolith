import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import { GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";
import ProductModel from "../repository/product-items.model";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice Facade Test", () => {
    let sequelize: Sequelize;
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
  
      await sequelize.addModels([InvoiceModel, ProductModel]);
      await sequelize.sync();
    });
  
    afterEach(async () => {
      await sequelize.close();
    });
  
    it("should generate an invoice", async () => {

        /*const invoiceRepository = new InvoiceRepository()
        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)
        const UseCaseProps = {
            findUsecase: findInvoiceUseCase,
            generateUsecase: generateInvoiceUseCase
      }
      const invoiceFacade = new InvoiceFacade(UseCaseProps)
      */

      const invoiceFacade = InvoiceFacadeFactory.create()

      const inputFacadeDto: GenerateInvoiceFacadeInputDto = {
        id: "1",
        name: "Maria",
        document: "1234-5678",
        street: "Rua 123",
        number: "99",
        complement: "Casa Verde",
        city: "Criciúma",
        state: "SC",
        zipCode: "88888-888",
        items: [
            {
                id: "1",
                name: "Item 1",
                price: 100
            },
            {
                id: "2",
                name: "Item 2",
                price: 200
            }
        ]
    };

    await invoiceFacade.generate(inputFacadeDto)

    const FindInvoiceFacadeInputDto = {
        id: inputFacadeDto.id
    }

    const invoiceDb = await invoiceFacade.find(FindInvoiceFacadeInputDto)

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual("1")
        expect(invoiceDb.name).toEqual(inputFacadeDto.name)
        expect(invoiceDb.document).toEqual(inputFacadeDto.document)
        expect(invoiceDb.address.street).toEqual(inputFacadeDto.street)
        expect(invoiceDb.address.number).toEqual(inputFacadeDto.number)
        expect(invoiceDb.address.complement).toEqual(inputFacadeDto.complement)
        expect(invoiceDb.address.city).toEqual(inputFacadeDto.city)
        expect(invoiceDb.address.state).toEqual(inputFacadeDto.state)
        expect(invoiceDb.address.zipCode).toEqual(inputFacadeDto.zipCode)
        expect(invoiceDb.items).toEqual(inputFacadeDto.items)  
    });
  });
  