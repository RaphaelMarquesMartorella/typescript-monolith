import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../modules/checkout/repository/checkout.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

export default class CheckOutDb {
    sequelize: Sequelize;

    public async Initialize() {
        
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "database.sqlite",
        logging: false,
        sync: { force: false },
        });
            
        await this.sequelize.addModels([ClientModel, OrderModel, ProductModel]);
        await this.sequelize.sync();
    }

    
} 