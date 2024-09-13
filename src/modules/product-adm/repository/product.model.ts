import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: "product-adm-products",
  tableName: "products-adm",
  timestamps: false,
})
export class ProductAdmModel extends Model {
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
  declare purchasePrice: number;

  @Column({ allowNull: false })
  declare stock: number;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;
}
