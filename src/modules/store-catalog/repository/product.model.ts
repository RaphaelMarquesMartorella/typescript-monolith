import { Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel as ProductAdmModel } from "../../product-adm/repository/product.model";

@Table({
  modelName: "store-catalog-products", 
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => ProductAdmModel)
  @Column({ allowNull: false })
  productId: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  description: string;

  @Column({ allowNull: false })
  salesPrice: number;
}
