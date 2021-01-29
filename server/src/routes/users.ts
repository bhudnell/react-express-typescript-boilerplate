import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response): void => {
	res.send('You have reached the users endpoint of the API');
});

export default router;
