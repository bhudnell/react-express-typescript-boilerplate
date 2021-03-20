import { Router, Request, Response } from 'express';

export function createUserRouter(): Router {
	const router = Router();

	router.get('/', getUsers);

	return router;
}

export async function getUsers(req: Request, res: Response): Promise<void> {
	res.status(200).send('You have reached the users endpoint of the API');
}
