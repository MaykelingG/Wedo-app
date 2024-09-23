import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';

/* Routes */
import {indexRouter} from './routes/index.js';
import {usersRouter} from './routes/users.js';


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
    
const PORT = process.env.PORT || 3000

app.listen(PORT , () => {
    console.log(`Servidor corriendo en el puerto ${PORT}, http://localhost:${PORT}`);
});w