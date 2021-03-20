import { createApp } from './app';

const app = createApp();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
