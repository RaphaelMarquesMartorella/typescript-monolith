import { Sequelize } from "sequelize-typescript";
import { ProductModel as ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import ProductModel from "../../modules/store-catalog/repository/product.model";
import { migrator } from "../config-migrations/migrator";
import { Umzug } from "umzug";

export default class ProductsDb {
    sequelize: Sequelize;
    migration: Umzug<any>;

    public async Initialize() {
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "database.sqlite",
        logging: false,
    });
      
    this.sequelize.addModels([ProductAdmModel, ProductModel])
    await this.sequelize.sync({ force: false });
        this.migration = migrator(this.sequelize)
        await this.migration.up()
    }
            
}