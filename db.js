// db.js
const { Pool } = require('pg');

// Carga las variables de entorno
require('dotenv').config();

// Configuración de la base de datos
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // La URL de conexión de Render
  ssl: {
    rejectUnauthorized: false, // Para conexiones seguras
  },
});

module.exports = pool;