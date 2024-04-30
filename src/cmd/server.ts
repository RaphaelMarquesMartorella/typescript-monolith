import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
import router from '../infrastructure/routers/product-router';

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
		this.app.use('/api/v1/', router)
		this.app.listen(this.port, async () => {
			console.log(`Server listening on port ${this.port}`);
        });
	}
}

export const server = new Server();