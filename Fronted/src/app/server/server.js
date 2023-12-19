const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wiliam',
});

connection.connect();

app.post('/api/user', (req, res) => {
  const userData = req.body;

  connection.query(
    'INSERT INTO formulario (nombre, apellido, email, telefono, direccion, sexo) VALUES (?, ?, ?, ?, ?, ?)',
    [userData.nombre, userData.apellido, userData.email, userData.telefono, userData.direccion, userData.genero ],
    (error, results) => {
      if (error) throw error;
      console.log('Datos insertados en la base de datos:', results);
    }
  );

  res.status(200).send('Datos recibidos y guardados en la base de datos');
});

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
