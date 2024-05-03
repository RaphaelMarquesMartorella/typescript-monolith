import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import productRouter from '../infrastructure/routers/products/product-router';
import clientRouter from '../infrastructure/routers/clients/client-router';
import checkoutRouter from '../infrastructure/routers/checkout/checkout-router';

class Server {
	app = express();
	port:number = 3000;

	applyMiddlewares() {
		this.app.use(bodyParser.json());
		this.app.use(cors())
		this.app.use(express.json());
	}

	start() {
		this.applyMiddlewares();
		this.app.use('/api/v1/', productRouter)
		this.app.use('/api/v1/', clientRouter)
		this.app.use('/api/v1/', checkoutRouter)
		this.app.listen(this.port, async () => {
			console.log(`Server listening on port ${this.port}`);
        });
	}
}

export const server = new Server();