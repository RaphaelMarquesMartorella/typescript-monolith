import { Request, Response } from "express";
import ClientsDb from "../../db/clients-db";
import ClientValidator from "../../validators/clients/client-validator";

export default class ClientsController {
    async Post (req: Request, res: Response): Promise<void> {

        try {
            const db = new ClientsDb()

            await db.Initialize()
            
            const {
                name,
                document,
                email,
                street,
                number,
                complement,
                city,
                state,
                zipCode
            } = req.body

            const validate = new ClientValidator(name,
                document,
                email,
                street,
                number,
                complement,
                city,
                state,
                zipCode)

                const client = await validate.Validate()

        
                    res.json({
                        id: client.id,
                        name: client.name,
                        document: client.document,
                        email: client.email,
                        address: {
                            street: client.address.street,
                            number: client.address.number,
                            complement: client.address.complement,
                            city: client.address.city,
                            state: client.address.state,
                            zipCode: client.address.zipCode,
                        }
                    })
                    
        } catch (error) {
            res.json({error: "Internal server error"});
            console.log(error);
        }
    }
}