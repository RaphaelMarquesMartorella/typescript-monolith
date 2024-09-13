import { Sequelize } from "sequelize-typescript";
import { ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import { Umzug } from "umzug";
import { StoreProductModel } from "../../modules/store-catalog/repository/product.model";

export default class ProductsDb {
    sequelize: Sequelize;
    migration: Umzug<any>;

    public async Initialize() {
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "database.sqlite",
        logging: false,
        sync: { force: false },
    });
      
    this.sequelize.addModels([ProductAdmModel, StoreProductModel])
    await this.sequelize.sync();
    }
            
}