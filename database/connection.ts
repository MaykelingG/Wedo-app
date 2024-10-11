import sql from 'mssql';

const config = {
  server: 'localhost',
  database: 'proyecto_wedo',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  authentication: {
    type: 'ntl',
    options: {
      domain: 'localhost',
      userName: '',
      password: '',
    }
  }
}

async function connect() {
  try {
    await sql.connect(config);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
}

export default {
  sql,
  connect,
};