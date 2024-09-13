import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { ProductModel } from "../repository/product.model"
import InvoiceFacadeFactory from "../factory/facade.factory"

const product = {
  id: "1",
  name: "DDD",
  price: 59.90
}

const invoiceProps = {
  id: "1",
  name: "Invoice-1",
  document: "NI-1",
  street: "Rua 123",
  number: "999",
  complement: "Casa Verde",
  city: "São Paulo",
  state: "SP",
  zipCode: "88888-888",
  items: [product]
}

describe("Invoice Facade test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should generate a invoice", async () => {

    // const invoiceRepository = new InvoiceRepository()
    // const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
    // const invoiceFacade = new InvoiceFacade({
    //   generateUseCase: generateInvoiceUseCase,
    //   findUseCase: undefined
    // })

    const invoiceFacade = InvoiceFacadeFactory.create()

    const invoiceResult = await invoiceFacade.generate(invoiceProps)

    expect(invoiceResult).toBeDefined()
    expect(invoiceResult.id).toEqual(expect.any(String))
    expect(invoiceResult.name).toEqual(invoiceProps.name)
    expect(invoiceResult.document).toEqual(invoiceProps.document)
    expect(invoiceResult.street).toEqual(invoiceProps.street)
    expect(invoiceResult.number).toEqual(invoiceProps.number)
    expect(invoiceResult.complement).toEqual(invoiceProps.complement)
    expect(invoiceResult.city).toEqual(invoiceProps.city)
    expect(invoiceResult.state).toEqual(invoiceProps.state)
    expect(invoiceResult.zipCode).toEqual(invoiceProps.zipCode)
    expect(invoiceResult.items[0].id).toEqual(invoiceProps.items[0].id)
    expect(invoiceResult.items[0].name).toEqual(invoiceProps.items[0].name)
    expect(invoiceResult.items[0].price).toEqual(invoiceProps.items[0].price)
  })
})