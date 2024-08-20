import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Product from "../../../modules/product-adm/domain/product.entity";
import { AddProductFacadeInputDto } from "../../../modules/product-adm/facade/product-adm.facade.interface";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export type ReqProps = {
    id?: string;
    productId?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export type ProductProps = {
    id?: Id;
    productId?: Id;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export default class ProductValidator {
  private id?: Id;
  private productId?: Id;
  private name: string;
  private description: string;
  private purchasePrice: number;
  private stock: number;

  constructor(data: ReqProps) {
    if (data.id) {
      this.id = new Id(data.id);
    }
    if (data.productId) {
      this.productId = new Id(data.productId);
    }
    this.name = data.name
    this.description = data.description
    this.purchasePrice = data.purchasePrice
    this.stock = data.stock
  }

  Validate(): Product {
    if(this.name !== "" && this.description !== "" && this.purchasePrice > 0 && this.stock && this.stock > 0) {

      const productProps: ProductProps = {
        name: this.name,
        description: this.description,
        purchasePrice: this.purchasePrice,
        stock: this.stock,
      };
      
      if (this.productId) {
        productProps.productId = this.productId;
      } 

      if (this.id) {
        productProps.id = this.id;
      }


      const inputFacadeDto: AddProductFacadeInputDto = {
        name: this.name, description: this.description, purchasePrice: this.purchasePrice, stock: this.stock
      }
      if (this.productId) {
        inputFacadeDto.productId = this.productId.id
      } 
      if(this.id) {
        inputFacadeDto.id = this.id.id
      }
      
      const productAdmFacadeFactory = ProductAdmFacadeFactory.create()
      productAdmFacadeFactory.addProduct(inputFacadeDto)
      const product = new Product(productProps)
      return product
    }
  }
}