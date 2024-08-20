import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import { ProductModel as ProductAdmModel } from "../../product-adm/repository/product.model";
import ProductRepository from "./product.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import { Umzug } from "umzug";
import { migrator } from "../../../infrastructure/config-migrations/migrator";
describe("ProductRepository test", () => {
  let sequelize: Sequelize;
  let migration: Umzug<any>;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "database.sqlite",
      logging: false,
    });
    sequelize.addModels([ProductAdmModel, ProductModel])
    await sequelize.sync({ force: true  });
        migration = migrator(sequelize)
        await migration.up()
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find all products", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe("1");
    expect(products[0].name).toBe("Product 1");
    expect(products[0].description).toBe("Description 1");
    expect(products[0].salesPrice).toBe(100);
    expect(products[1].id.id).toBe("2");
    expect(products[1].name).toBe("Product 2");
    expect(products[1].description).toBe("Description 2");
    expect(products[1].salesPrice).toBe(200);
  });

  it("should find a product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");

    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.salesPrice).toBe(100);
  });
  it("should save a product in ProductModel", async () => {
    await ProductAdmModel.create({
      id: "1",
      productId: "prod-1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const modelResult = await ProductAdmModel.findOne({
      where: { id: "1" },
    });

    const product = new Product({
      id: new Id(),
      productId: new Id(modelResult.productId),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const productRepository = new ProductRepository();
    await productRepository.save(product);

    const savedProduct = await ProductModel.findOne({
      where: { id: product.id.id },
    });

    expect(savedProduct).toBeDefined();
    expect(savedProduct.id).toBe(product.id.id);
    expect(savedProduct.productId).toBe(product.productId.id);
    expect(savedProduct.name).toBe(product.name);
    expect(savedProduct.description).toBe(product.description);
    expect(savedProduct.salesPrice).toBe(product.salesPrice);
  });

});
