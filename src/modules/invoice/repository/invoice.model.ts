import { DataTypes } from "sequelize";
import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

interface Item {
    itemId: string;
    itemName: string;
    itemPrice: number;
}

@Table({
    tableName: 'invoices',
    timestamps: false
})

export default class InvoiceModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string;

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false })
    document: string;

    @Column({ allowNull: false })
    street: string

    @Column({ allowNull: false })
    number: string

    @Column({ allowNull: true })
    complement: string

    @Column({ allowNull: false })
    city: string

    @Column({ allowNull: false })
    state: string

    @Column({ allowNull: false })
    zipcode: string

    @Column({ allowNull: false })
    createdAt: Date

    @Column({ allowNull: false })
    updatedAt: Date

    @Column({ 
        type: DataTypes.JSON(),
        allowNull: false,
        defaultValue: []
    })
    items: Item[]

    constructor(values?: any, options?: any) {
        super(values, options);
        this.items = this.items || [];
    }
}