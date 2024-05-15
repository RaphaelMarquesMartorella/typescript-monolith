import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Product from "../../../modules/product-adm/domain/product.entity";
import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

type ProductProps = {
    id?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export default class ProductValidator {
  private name: string;
  private description: string;
  private purchasePrice: number;
  private stock: number;

  constructor(name: string, description: string, purchasePrice: number, stock: number) {
    this.name = name
    this.description = description
    this.purchasePrice = purchasePrice
    this.stock = stock
  }

  Validate(): Product {
    if(this.name !== "" && this.description !== "" && this.purchasePrice > 0 && this.stock && this.stock > 0) {

      const productProps:ProductProps = { name: this.name, description: this.description, purchasePrice: this.purchasePrice, stock: this.stock };

      const product = new Product(productProps)

      const inputFacadeDto: AddProductFacadeInputDto = {
        id: product.id.id, name: this.name, description: this.description, purchasePrice: this.purchasePrice, stock: this.stock
      }
      
      const productAdmFacadeFactory = ProductAdmFacadeFactory.create()
      productAdmFacadeFactory.addProduct(inputFacadeDto)
      return product
  
    }
  }
}