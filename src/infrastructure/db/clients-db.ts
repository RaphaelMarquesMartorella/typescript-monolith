import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";

export default class ClientsDb {
    sequelize: Sequelize;

    public async Initialize() {
        
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });
            
        await this.sequelize.addModels([ClientModel]);
        await this.sequelize.sync();
    }

    
} 