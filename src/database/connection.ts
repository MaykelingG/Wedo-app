import myslq from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connection = myslq.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
        return;
    }
    console.log('Conectado a la base de datos');
});

export default connection;