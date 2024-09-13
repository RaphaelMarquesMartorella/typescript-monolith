import { FindInvoiceFacadeInterfaceInputDTO, FindInvoiceFacadeInterfaceOutputDTO, GenerateInvoiceFacadeInterfaceInputDto, GenerateInvoiceFacadeInterfaceOutputDto } from "./invoice.facade.interface.dto";

export default interface InvoiceFacadeInterface {

  generate(input: GenerateInvoiceFacadeInterfaceInputDto): Promise<GenerateInvoiceFacadeInterfaceOutputDto>

  find(input: FindInvoiceFacadeInterfaceInputDTO): Promise<FindInvoiceFacadeInterfaceOutputDTO>
}