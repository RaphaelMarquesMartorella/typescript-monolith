import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Client from "../../../modules/client-adm/domain/client.entity";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/facade.factory";
import Address from "../../../modules/invoice/domain/address.vo";

type ClientProps = {
    id?: Id;
    name: string;
    document: string;
    email: string;
    address: Address;
}

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };

type AddClientInputDto = {
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

export default class ClientValidator {
    private name: string;
    private document: string;
    private email: string;
    private street: string;
    private number: string;
    private complement: string;
    private city: string;
    private state: string;
    private zipCode: string;

    private client: Client;


    constructor(name: string, document:string, email: string, street: string, number: string, complement: string, city: string, state: string, zipCode: string) {
        this.name = name
        this.document = document
        this.email = email
        this.street = street
        this.number = number
        this.complement = complement
        this.city = city
        this.state = state
        this.zipCode = zipCode
    }

    Validate(): Client {
        if(this.name && this.document && this.email && this.street && this.number && this.complement && this.city && this.state && this.zipCode) {
            const addressProps: AddressProps = {
                street: this.street,
                number: this.number,
                complement: this.complement,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode
            }

            const address = new Address(
                addressProps
            )

            const clientProps: ClientProps = {
                name: this.name, document:this.document, email: this.email, address, 
            }

            this.client = new Client(clientProps)

            const inputFacadeDto: AddClientInputDto = {
                id: this.client.id.id,
                name: this.name, document:this.document, email: this.email,
                street: this.street,
                number: this.number,
                complement: this.complement,
                city: this.city,
                state: this.state,
                zipCode: this.zipCode
            }

            const clientAdmFacadeFactory = ClientAdmFacadeFactory.create()
            clientAdmFacadeFactory.add(inputFacadeDto)

            return this.client;
    }
}

}