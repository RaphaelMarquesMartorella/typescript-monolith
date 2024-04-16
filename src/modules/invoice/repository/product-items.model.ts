import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => InvoiceModel)
  @Column({allowNull: false, field: "invoice_id"})
  declare invoiceId: string

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  price: number;
}
