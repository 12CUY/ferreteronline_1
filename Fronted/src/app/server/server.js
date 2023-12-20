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
app.post('/api/user/signUp', (req, res) => {
  const newUser = req.body;
  console.log('Datos del nuevo usuario:', newUser);

  connection.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [newUser.name, newUser.email, newUser.password],
    (error, results) => {
      if (error) {
        console.error('Error al insertar datos en la tabla users:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
      } else {
        console.log('Usuario registrado exitosamente en la tabla users:', results);
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
      }
    }
  );
});

// Middleware para el manejo de datos JSON
app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/api/products', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
    } else {
      res.status(200).json(results);
    }
  });
});

// Endpoint para obtener un producto por su ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
});

// Endpoint para actualizar un producto por su ID
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  connection.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (error, results) => {
    if (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
});

// Endpoint para eliminar un producto por su ID
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  connection.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al eliminar el producto:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
});


// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());

// Endpoint para el registro de vendedores
app.post('/vendedor', (req, res) => {
  const { name, password, email } = req.body;

  const sql = 'INSERT INTO vendedor (name, password, email) VALUES (?, ?, ?)';
  connection.query(sql, [name, password, email], (error, results) => {
    if (error) {
      console.error('Error al registrar vendedor:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      console.log('Registro exitoso:', results);
      res.status(201).json({ message: 'Registro exitoso' });
    }
  });
});

// Endpoint para el inicio de sesión de vendedores
app.post('/vendedor/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM vendedor WHERE email = ? AND password = ?';
  connection.query(sql, [email, password], (error, results) => {
    if (error) {
      console.error('Error al realizar el inicio de sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    } else {
      if (results.length > 0) {
        console.log('Usuario logueado:', results[0]);
        res.status(200).json({ message: 'Inicio de sesión exitoso', vendedor: results[0] });
      } else {
        console.log('Credenciales inválidas');
        res.status(401).json({ error: 'Credenciales inválidas' });
      }
    }
  });
});




// Obtener todos los elementos del carrito
app.get('/', (req, res) => {
  db.query('SELECT * FROM cart', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al obtener elementos del carrito');
    } else {
      res.json(results);
    }
  });
});

// Agregar un elemento al carrito
app.post('/', (req, res) => {
  const { name, price, color, category, description, image, quantity, productId, userId } = req.body;

  const sql = 'INSERT INTO cart (name, price, color, category, description, image, quantity, productId, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, price, color, category, description, image, quantity, productId, userId];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al agregar elemento al carrito');
    } else {
      res.json({ message: 'Elemento agregado al carrito con éxito', id: results.insertId });
    }
  });
});

// Eliminar un elemento del carrito
app.delete('/:cartId', (req, res) => {
  const cartId = req.params.cartId;

  const sql = 'DELETE FROM cart WHERE id = ?';
  db.query(sql, [cartId], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al eliminar elemento del carrito');
    } else {
      res.json({ message: 'Elemento eliminado del carrito con éxito' });
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});