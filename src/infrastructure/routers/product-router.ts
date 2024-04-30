import express from 'express'
import ProductsController from '../controllers/products-controller';

const router = express.Router();
const controller = new ProductsController()

router.post('/products', controller.Post)

export default router