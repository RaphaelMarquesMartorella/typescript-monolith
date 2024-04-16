import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import InvoiceRepository from "../../repository/invoice.repository";
import InvoiceService from "../../service/invoice.service";
import InvoiceItems from "../../value-object/items.entity";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
    private _invoiceRepository: InvoiceRepository

    constructor (invoiceRepository: InvoiceRepository) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const result = await this._invoiceRepository.find(input.id)

        const invoice = new Invoice({
          id: new Id(result.id.id),
          name: result.name,
          document: result.document,
          address: new Address(
              result.address.street,
              result.address.number,
              result.address.complement,
              result.address.city,
              result.address.state,
              result.address.zipCode
          ),
          items: result.items.map(item => new InvoiceItems({
              id: new Id(item.itemId),
              name: item.itemName,
              price: item.itemPrice
          }))
      });
      
      const total = InvoiceService.calcTotal(invoice);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
              street: result.address._street,
              number: result.address.number,
              complement: result.address._complement,
              city: result.address.city,
              state: result.address.state,
              zipCode: result.address.zipCode,
            },
            items: result.items.map((item) => ({
              id: item.itemId,
              name: item.itemName,
              price: item.itemPrice
            })
          ),
            total: total,
            createdAt: result.createdAt,
          }
    }
}