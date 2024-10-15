import express from 'express';
import morgan, { StreamOptions } from 'morgan';
import cors from 'cors';

import chatbot from './router/chatbot';
import usuarios from './router/usuarios';
import emprendimientos from './router/emprendimientos';
import prestamos from './router/prestamos';
import productos from './router/productos';
import segmentaciones from './router/segmentacion';
import potenciales from './router/potencial';
import invercionActivos from './router/invercionActivos';
import gastosOperacion from './router/gastosOperacion';
import material from './router/material';

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
app.use('/api/emprendimientos', emprendimientos);
app.use('/api/prestamos', prestamos);
app.use('/api/productos', productos);
app.use('/api/segmentaciones', segmentaciones);
app.use('/api/potenciales', potenciales);
app.use('/api/invercion-activos', invercionActivos);
app.use('/api/gastos-operacion', gastosOperacion);
app.use('/api/material', material);

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});