import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db/db';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rutas y lógica de la aplicación aquí...

app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
