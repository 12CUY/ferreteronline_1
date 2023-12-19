const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nueva_base_nueva',
});

connection.connect();

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con MySQL:', error);
  } else {
    console.log('Conexión exitosa con MySQL');
  }
});

// Endpoint para registrar un nuevo usuario
app.post('/api/user/signup', (req, res) => {
  const newUser = req.body;
  console.log('Datos del nuevo usuario:', newUser);

  connection.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [newUser.name, newUser.email, newUser.password],
    (error, results) => {
      if (error) {
        console.error('Error al insertar datos en la tabla `users`:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
      } else {
        console.log('Usuario registrado exitosamente en la tabla `users`:', results);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      }
    }
  );
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
