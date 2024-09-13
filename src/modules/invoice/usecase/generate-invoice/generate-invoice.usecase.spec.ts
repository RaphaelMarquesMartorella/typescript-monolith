import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const MockRepository = () => {

  return {
    generate: jest.fn(),
    find: jest.fn()
  }

}

describe("Generate Invoice use case unit test", () => {

  it("should generate invoice", async () => {

    const invoiceRepository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(invoiceRepository)

    const inputProduct = {
      id: "1",
      name: "DDD",
      price: 59.90
    }

    const inputInvoice = {
      name: "invoice-1",
      document: "NI-1",
      street: "Rua 123",
      number: "999",
      complement: "Casa Verde",
      city: "São Paulo",
      state: "SP",
      zipCode: "88888-888",
      items: [inputProduct]
    }

    const result = await usecase.execute(inputInvoice)

    expect(invoiceRepository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(inputInvoice.name)
    expect(result.document).toBe(inputInvoice.document)
    expect(result.street).toBe(inputInvoice.street)
    expect(result.number).toBe(inputInvoice.number)
    expect(result.complement).toBe(inputInvoice.complement)
    expect(result.city).toBe(inputInvoice.city)
    expect(result.state).toBe(inputInvoice.state)
    expect(result.zipCode).toBe(inputInvoice.zipCode)
    expect(result.items[0].id).toBe(inputInvoice.items[0].id)
    expect(result.items[0].name).toBe(inputInvoice.items[0].name)
    expect(result.items[0].price).toBe(inputInvoice.items[0].price)
  })
})