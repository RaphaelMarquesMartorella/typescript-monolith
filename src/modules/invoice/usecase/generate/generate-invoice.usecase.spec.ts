import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "../../repository/invoice.model"
import InvoiceRepository from "../../repository/invoice.repository"
import ProductModel from "../../repository/product-items.model"
import { GenerateInvoiceUseCaseInputDto } from "./generate-invoice.dto"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

describe("Invoice Generate Test" , () => {
    let sequelize: Sequelize
  
    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      sequelize.addModels([InvoiceModel, ProductModel])
      await sequelize.sync()
    })
  
    afterEach(async () => {
      await sequelize.close()
    });

    it("Should create an invoice" , async () => {

        const inputDto: GenerateInvoiceUseCaseInputDto = {
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
      
        const invoiceRepository = new InvoiceRepository() 

        const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)

        const invoiceDb = await generateInvoiceUseCase.execute(inputDto)

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual("1")
        expect(invoiceDb.name).toEqual(inputDto.name)
        expect(invoiceDb.document).toEqual(inputDto.document)
        expect(invoiceDb.street).toEqual(inputDto.street)
        expect(invoiceDb.number).toEqual(inputDto.number)
        expect(invoiceDb.complement).toEqual(inputDto.complement)
        expect(invoiceDb.city).toEqual(inputDto.city)
        expect(invoiceDb.state).toEqual(inputDto.state)
        expect(invoiceDb.zipCode).toEqual(inputDto.zipCode)
        expect(invoiceDb.items).toEqual(inputDto.items)  
    });
}) 