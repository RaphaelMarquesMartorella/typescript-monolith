import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: "order",
    timestamps: false
})

export default class OrderModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    declare id: string

    @Column({allowNull: false})
    declare clientId: string

    @Column({allowNull: false})
    declare clientName: string;

    @Column({allowNull: false})
    declare email: string;

    @Column({allowNull: false})
    declare address: string;

    @Column({allowNull: false})
    declare productId: string;

    @Column({allowNull: false})
    declare productName: string;

    @Column({allowNull: false})
    declare description: string;

    @Column({allowNull: false})
    declare salesPrice: number;
}