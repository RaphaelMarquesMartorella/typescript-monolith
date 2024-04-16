import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import InvoiceService from "../../service/invoice.service";
import InvoiceItems from "../../value-object/items.entity";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    private _invoiceRepository: InvoiceGateway;

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository 
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const InvoiceItemsArray = input.items.map((item) => {
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price
            })
        })

        const address = new Address(
            input.street,
            input.number,
            input.complement,
            input.city,
            input.state,
            input.zipCode,
          )
        

        const invoice = new Invoice ({
        id: new Id ("1"),
        name: input.name,
        document: input.document,
        address: address,
        items: InvoiceItemsArray
        })
        
        await this._invoiceRepository.generate(invoice)

        const total = InvoiceService.calcTotal(invoice)
        
        return {
            id: invoice.id.id,
            name: input.name,
            document: input.document,
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
            items: input.items,
            total: total
        }
    }
}