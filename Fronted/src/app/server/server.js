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

// Endpoint para iniciar sesión
app.post('/api/user/login', (req, res) => {
  const loginUser = req.body;
  console.log('Datos de inicio de sesión:', loginUser);

  connection.query(
    'SELECT name, email FROM users WHERE email = ? AND password = ?',
    [loginUser.email, loginUser.password],
    (error, results) => {
      if (error) {
        console.error('Error al consultar datos en la tabla `users`:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud', details: error });
      } else {
        if (results.length > 0) {
          console.log('Inicio de sesión exitoso para el usuario:', results[0].name);
          // Solo envía la información necesaria al cliente
          res.status(200).json({
            name: results[0].name,
            email: results[0].email
          });
        } else {
          console.log('Inicio de sesión fallido para el usuario con email:', loginUser.email);
          res.status(401).json({ error: 'Credenciales no válidas' });
        }
      }
    }
  );
});


// Endpoint para agregar un producto
app.post('/api/products', (req, res) => {
  const newProduct = req.body;

  connection.query(
    'INSERT INTO products (name, price, color, category, description, image) VALUES (?, ?, ?, ?, ?, ?)',
    [newProduct.name, newProduct.price, newProduct.color, newProduct.category, newProduct.description, newProduct.image],
    (error, results) => {
      if (error) {
        console.error('Error al insertar datos en la tabla `products`:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
      } else {
        res.status(201).json({ message: 'Producto agregado exitosamente' });
      }
    }
  );
});




// Endpoint para eliminar un producto
app.delete('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  connection.query('DELETE FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    } else {
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    }
  });
});

// Endpoint para actualizar un producto
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const updatedProduct = req.body;

  connection.query(
    'UPDATE products SET name = ?, price = ?, color = ?, category = ?, description = ?, image = ? WHERE id = ?',
    [updatedProduct.name, updatedProduct.price, updatedProduct.color, updatedProduct.category, updatedProduct.description, updatedProduct.image, productId],
    (error, results) => {
      if (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
      } else {
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
      }
    }
  );
});

// Endpoint para obtener un producto por su ID
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;

  connection.query('SELECT * FROM products WHERE id = ?', [productId], (error, results) => {
    if (error) {
      console.error('Error al obtener el producto por ID:', error);
      res.status(500).json({ error: 'Error al procesar la solicitud' });
    } else {
      if (results.length > 0) {
        res.status(200).json(results[0]);  // Devolver el primer resultado (debería ser único por ID)
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
});
// local

// Endpoint para agregar un producto al carrito
app.post('/api/addToCart', (req, res) => {
  const productData = req.body;

  // Lógica para agregar el producto al carrito en el servidor
  // Puedes almacenar datos en la base de datos u otro medio
  // ...

  res.status(200).json({ message: 'Producto agregado al carrito exitosamente' });
});

// Endpoint para eliminar un producto del carrito
app.post('/api/removeFromCart', (req, res) => {
  const productId = req.body.productId;

  // Lógica para eliminar el producto del carrito en el servidor
  // ...

  res.status(200).json({ message: 'Producto eliminado del carrito exitosamente' });
});


app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
