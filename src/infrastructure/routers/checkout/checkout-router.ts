import express from 'express';
import CheckOutController from '../../controllers/checkout/checkout-controller';

const router = express.Router()
const controller = new CheckOutController()

router.post('/checkout', controller.Post)

export default router;