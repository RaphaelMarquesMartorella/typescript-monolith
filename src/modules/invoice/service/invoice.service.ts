import Invoice from "../domain/invoice.entity";

export default class InvoiceService {
    static calcTotal(invoice: Invoice) {
        let priceArray: number[] = [];
        invoice.items.map((item) => {  
            priceArray.push(item.itemPrice)
        })
        const result = priceArray.reduce((accumulator, currentValue) => accumulator + currentValue)
        return result       
    }
}