import { Sequelize } from "sequelize-typescript";
import { ProductAdmModel } from "../../modules/product-adm/repository/product.model";
import { Umzug } from "umzug";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import OrderModel from "../../modules/checkout/repository/checkout.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { StoreProductModel } from "../../modules/store-catalog/repository/product.model";
import { ProductModel } from "../../modules/invoice/repository/product.model";

export default class CheckOutDb {
    sequelize: Sequelize;
    migration: Umzug<any>;

    public async Initialize() {
        
        this.sequelize = new Sequelize({
        dialect: "sqlite",
        storage: "database.sqlite",
        logging: false,
        sync: { force: false },
        });
            
        this.sequelize.addModels([ClientModel, OrderModel, ProductAdmModel, StoreProductModel, TransactionModel, InvoiceModel, ProductModel]);
        await this.sequelize.sync();
    }
} 