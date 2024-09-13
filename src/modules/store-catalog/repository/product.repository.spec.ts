import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { Umzug } from "umzug";
import { migrator } from "../../../infrastructure/config-migrations/migrator";
import { ProductAdmModel } from "../../product-adm/repository/product.model";
import { StoreProductModel } from "./product.model";
describe("ProductRepository test", () => {
  let sequelize: Sequelize

  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ":memory:",
      logging: false,
      sync: { force: true }
    })
    
    sequelize.addModels([StoreProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return 
    }
    migration = migrator(sequelize)
    await migration.down()
    await sequelize.close()
  })

  it("should find all products", async () => {
    await StoreProductModel.create({
      id: "1",
      productId: "prod-1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    await StoreProductModel.create({
      id: "2",
      productId: "prod-2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe("1");
    expect(products[0].productId.id).toBe("prod-1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Description 1");
    expect(products[0].salesPrice).toBe(100);
    expect(products[1].id.id).toBe("2");
    expect(products[1].productId.id).toBe("prod-2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Description 2");
    expect(products[1].salesPrice).toBe(200);
  });

  it("should find a product", async () => {
    await StoreProductModel.create({
      id: "1",
      productId: "prod-1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");

    expect(product.id.id).toBe("1");
    expect(product.productId.id).toBe("prod-1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(100);
  });

describe("ProductRepository", () => {
  it("should save a product in ProductModel", async () => {
    jest.spyOn(ProductAdmModel, 'findOne').mockResolvedValue({
      id: "prod-1",
      name: "Product 1",
      productId: "prod-1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
    }as any);

    const product = new Product({
      id: new Id("1"),
      productId: new Id('prod-1'),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });    

    const productRepository = new ProductRepository();
    await productRepository.save(product);

    const savedProduct = await StoreProductModel.findOne({
      where: { id: "1" },
    });

    expect(savedProduct).toBeDefined();
    expect(savedProduct.id).toBe(product.id.id);
    expect(savedProduct.productId).toBe(product.productId.id);
    expect(savedProduct.name).toBe(product.name);
    expect(savedProduct.description).toBe(product.description);
    expect(savedProduct.salesPrice).toBe(product.salesPrice);
    
  });
  it("should throw an error when product not found", async () => {
    jest.spyOn(ProductAdmModel, 'findOne').mockResolvedValue({
      productId: "prod-1",
    } as any);

    const product = new Product({
      id: new Id("1"),
      productId: new Id('prod-2'),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    await expect(productRepository.save(product)).rejects.toThrowError('Product not found');
  });
});
});