import { Request, Response } from "express";
import Product from "../../modules/product-adm/domain/product.entity";
import Id from "../../modules/@shared/domain/value-object/id.value-object";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeInputDto } from "../../modules/product-adm/facade/product-adm.facade.interface";

type ReqPropsType = {
    id?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export default class ProductsController {

        async Post(req: Request, res: Response): Promise<void> {

            try {
                const { name, description, purchasePrice, stock } = req.body;
                
                if(name !== "" && description !== "" && purchasePrice > 0 && stock && stock > 0) {

                    const reqProps:ReqPropsType = { name, description, purchasePrice, stock };

                    const inputFacadeDto: AddProductFacadeInputDto = {
                        name, description, purchasePrice, stock
                    }
                    
                    const product = new Product(reqProps)
                    const productAdmFacadeFactory = ProductAdmFacadeFactory.create()
                    productAdmFacadeFactory.addProduct(inputFacadeDto)

                    res.json({
                        id: product.id.id,
                        name: product.name,
                        description: product.description,
                        purchasePrice: product.purchasePrice,
                        stock: product.stock,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                    })                    
                } else {
                    res.json({error: "You did not meet the expected input conditons"});
                }
            } catch (error) {
                res.json({error: "Internal server error"});
                console.log(error);
            }
            
        }
}