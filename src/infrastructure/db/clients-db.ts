import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../../modules/client-adm/repository/client.model";

export default class ClientsDb {
    sequelize: Sequelize;

    public async Initialize() {
        
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "database.sqlite",
        logging: false,
        sync: { force: false },
        });
            
        await this.sequelize.addModels([ClientModel]);
        await this.sequelize.sync();
    }

    
} 