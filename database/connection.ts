import myslq from 'mysql2';

const connection = myslq.createConnection({
    host: 'localhost',
    user: 'root',
    password: '57810634rrr',
    database: 'proyecto_wedo',
});

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to database');
        return;
    }
    console.log('Conectado a la base de datos');
});

export default connection;