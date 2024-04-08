import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

type ItemsProps = {
    id?: Id;
    name: string;
    price: number;
}

export default class InvoiceItems implements AggregateRoot{
    private _itemId?: Id;
    private _itemName: string;
    private _itemPrice: number;

    constructor(props: ItemsProps) {
        this._itemId = props.id || new Id()
        this._itemName = props.name
        this._itemPrice = props.price
    }

    get itemId(): string {
        return this._itemId.id
    }

    get itemName(): string {
        return this._itemName
    }
    get itemPrice(): number {
        return this._itemPrice
    }
}