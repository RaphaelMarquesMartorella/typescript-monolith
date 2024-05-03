import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

export default class ProductsDb {
    sequelize:Sequelize;

    public async Initialize() {
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
    });
      
        await this.sequelize.addModels([ProductModel]);
        await this.sequelize.sync();
    }
            
}