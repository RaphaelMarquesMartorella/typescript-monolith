import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";

export default class InvoiceFacadeFactory {
    static create() {
        const repository = new InvoiceRepository();
        const findUsecase = new FindInvoiceUseCase(repository);
        const generateUsecase = new GenerateInvoiceUseCase(repository);
        const facade = new InvoiceFacade({
          generateUsecase: generateUsecase,
          findUsecase: findUsecase,
        });
        return facade;
      }
}