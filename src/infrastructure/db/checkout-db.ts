import { Sequelize } from "sequelize-typescript";
import OrderModel from "../../modules/checkout/repository/checkout.model";

export default class CheckOutDb {
    sequelize: Sequelize;

    public async Initialize() {
        
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
            
        await this.sequelize.addModels([OrderModel]);
        await this.sequelize.sync();
    }

    
} 