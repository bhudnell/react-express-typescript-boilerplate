import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());

console.log(__dirname);

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.use('/api', routes);

app.get('*', (req: Request, res: Response): void => {
	res.sendFile(
		path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
	);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

export default app;
