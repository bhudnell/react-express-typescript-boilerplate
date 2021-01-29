import { Router, Request, Response } from 'express';
import users from './users';

const router = Router();

router.use('/users', users);

router.get('/', (req: Request, res: Response): void => {
	res.send('You have reached the API');
});

router.get('*', (req: Request, res: Response): void => {
	res.send('That endpoint does not exist :(');
});

export default router;
