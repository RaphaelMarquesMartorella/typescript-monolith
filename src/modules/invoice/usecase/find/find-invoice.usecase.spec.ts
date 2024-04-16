import { Sequelize } from "sequelize-typescript"
import InvoiceModel from "../../repository/invoice.model"
import ProductModel from "../../repository/product-items.model"
import InvoiceRepository from "../../repository/invoice.repository"
import FindInvoiceUseCase from "./find-invoice.usecase"
import { FindInvoiceUseCaseInputDTO } from "./find-invoice.dto"
import { GenerateInvoiceUseCaseInputDto } from "../generate/generate-invoice.dto"
import GenerateInvoiceUseCase from "../generate/generate-invoice.usecase"

describe("Invoice Find Test" , () => {
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

    it("Should find an invoice" , async () => {
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
  
        const res = await generateInvoiceUseCase.execute(inputDto)

        const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)

        const findInvoiceInputDto: FindInvoiceUseCaseInputDTO = {
            id: res.id
        }

        const invoiceDb = await findInvoiceUseCase.execute(findInvoiceInputDto)

        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(res.id)
        expect(invoiceDb.name).toEqual(res.name)
        expect(invoiceDb.document).toEqual(res.document)
        expect(invoiceDb.address.street).toEqual(res.street)
        expect(invoiceDb.address.number).toEqual(res.number)
        expect(invoiceDb.address.complement).toEqual(res.complement)
        expect(invoiceDb.address.city).toEqual(res.city)
        expect(invoiceDb.address.state).toEqual(res.state)
        expect(invoiceDb.address.zipCode).toEqual(res.zipCode)
        expect(invoiceDb.items).toEqual(res.items)
        expect(invoiceDb.createdAt).toBeDefined() 
    });
}) 