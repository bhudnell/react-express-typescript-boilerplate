import { Router, Request, Response } from 'express';
import { createUsersRouter } from './users';

const router = Router();

router.use('/users', createUsersRouter());

router.get('/', (req: Request, res: Response): void => {
	res.status(200).send('You have reached the API');
});

router.get('*', (req: Request, res: Response): void => {
	res.sendStatus(404);
});

export default router;
