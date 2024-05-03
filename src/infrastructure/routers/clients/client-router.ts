import express from 'express';
import ClientsController from '../../controllers/clients/clients-controller';

const router = express.Router()
const controller = new ClientsController()

router.post('/clients', controller.Post)

export default router;