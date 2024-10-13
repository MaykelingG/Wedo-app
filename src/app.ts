import express from 'express';
import morgan, { StreamOptions } from 'morgan';
import cors from 'cors';

import chatbot from './router/chatbot';
import usuarios from './router/usuarios';

import './database/connection'
import { authentication } from './Lib/Authentication';

const app: express.Application = express();
const port: number | string = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev') as express.RequestHandler<StreamOptions>);

app.use((req, res, next) => {
  const response = authentication(req, res);
  if(response) next();
});

app.use('/api/chatbot', chatbot);
app.use('/api/usuarios', usuarios);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});