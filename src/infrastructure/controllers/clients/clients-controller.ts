import { Request, Response } from "express";
import ClientsDb from "../../db/clients-db";
import ClientValidator from "../../validators/clients/client-validator";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";

export default class ClientsController {
    async Post (req: Request, res: Response): Promise<void> {
        type ReqProps = {
            id?: string;
            name: string;
            document: string;
            email: string;
            street: string;
            number: string;
            complement: string;
            city: string;
            state: string;
            zipCode: string;
        }

        try {
            const db = new ClientsDb()

            await db.Initialize()
            
            const data: ReqProps = req.body

            const validate = new ClientValidator(
                data.name,
                data.document,
                data.email,
                data.street,
                data.number,
                data.complement,
                data.city,
                data.state,
                data.zipCode,
                new Id(data.id),
            )

                const client = await validate.Validate()

        
                    res.json({
                        id: client.id.id,
                        name: client.name,
                        email: client.email,
                        address: client.address
                    })
                    
        } catch (error) {
            res.json({error: "Internal server error"});
            console.log(error);
        }
    }
}