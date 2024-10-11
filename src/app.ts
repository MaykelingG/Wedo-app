import express from 'express';
import morgan, { StreamOptions } from 'morgan';
import chatbot from './router/chatbot';
import cors from 'cors';
import '../database/connection'

const app: express.Application = express();
const port: number | string = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev') as express.RequestHandler<StreamOptions>);

app.use('/api/chatbot', chatbot);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});