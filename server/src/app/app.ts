import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { createUserRouter } from '../modules/user';

export function createApp(): Express {
	const app = express();

	app.use(cors());

	app.use(
		express.static(path.join(__dirname, '..', '..', '..', 'client', 'build'))
	);

	app.use('/api/user', createUserRouter());

	app.get('/api', (req: Request, res: Response): void => {
		res.status(200).send('You have reached the API');
	});

	app.get('/api/*', (req: Request, res: Response): void => {
		res.sendStatus(404);
	});

	/* istanbul ignore next */
	app.get('*', (req: Request, res: Response): void => {
		res
			.status(200)
			.sendFile(
				path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html')
			);
	});

	return app;
}
