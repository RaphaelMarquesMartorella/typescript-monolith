import { Request, Response } from "express";
import ProductsDb from "../../db/products-db";
import ProductValidator from "../../validators/products/products-validator";

export default class ProductsController {
    db: ProductsDb;

        async Post(req: Request, res: Response): Promise<void> {

            try {
                const db = new ProductsDb()

                await db.Initialize()

                const { name, description, purchasePrice, stock } = req.body;

                const validate = new ProductValidator(name, description, purchasePrice, stock)

                const product = validate.Validate()

                if(product) {
                    res.json({
                        id: product.id.id,
                        name: product.name,
                        description: product.description,
                        purchasePrice: product.purchasePrice,
                        stock: product.stock,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                    })
                    console.log({
                        id: product.id.id,
                        name: product.name,
                        description: product.description,
                        purchasePrice: product.purchasePrice,
                        stock: product.stock,
                        createdAt: product.createdAt,
                        updatedAt: product.updatedAt,
                    });
                }
                
                else{
                    res.json({error: "You did not meet the expected input conditons"});
                    console.error({error: "Input conditions were not respected"});
                    
                }   
 
            } catch (error) {
                res.json({error: "Internal server error"});
                console.log(error);
            }
            
        }
}