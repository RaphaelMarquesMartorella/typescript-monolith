import { Request, Response } from "express";
import CheckOutValidator, { ValidatorDto } from "../../validators/checkout/checkout-validator";
import CheckOutDb from "../../db/checkout-db";

export default class CheckOutController {
    public async Post (req: Request, res: Response) {
        try {
            const db = new CheckOutDb()
            await db.Initialize()
    
            const data: ValidatorDto = req.body;
    
            const validator = new CheckOutValidator(data);
    
            const checkout = await validator.Validate();
    
            res.json({
                checkout
            });
            console.log(checkout);
        } catch (error) {
            res.json({error: "Internal server error"});
            console.log(error);
        }

    }
}