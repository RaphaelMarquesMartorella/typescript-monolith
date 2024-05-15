import { Sequelize } from "sequelize-typescript";
import { ProductModel as ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import ProductModelDb from "../../modules/store-catalog/repository/product.model";
import { migrator } from "../config-migrations/migrator";
import { Umzug } from "umzug";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import OrderModel from "../../modules/checkout/repository/checkout.model";

export default class CheckOutDb {
    sequelize: Sequelize;
    migration: Umzug<any>;

    public async Initialize() {
        
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "database.sqlite",
        logging: false,
        });
            
        this.sequelize.addModels([ClientModel, OrderModel, ProductAdmModel, ProductModelDb])
        await this.sequelize.sync({ force: false });
        this.migration = migrator(this.sequelize)
        await this.migration.up()
    }
} 