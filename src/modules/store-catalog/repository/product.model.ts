import { Column, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table({
  modelName: "store-catalog-products", 
  tableName: "products-store-catalog",
  timestamps: false,
})
export class StoreProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare productId: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare description: string;

  @Column({ allowNull: false })
  declare salesPrice: number;
  price: number;
}
