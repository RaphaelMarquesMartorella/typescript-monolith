import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import Address from "../../domain/value-object/address";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(_invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = _invoiceRepository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

    const props = {
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        input.zipCode,
      ),
      items: input.items.map((item) => {
        return new Product({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        })
      })
    }

    const invoice = new Invoice(props)
    await this._invoiceRepository.generate(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total()
    }
  }
}