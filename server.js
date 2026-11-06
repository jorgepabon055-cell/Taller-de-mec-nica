const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ordenesRoutes = require('./src/routes/ordenesRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas principales
app.use('/api/ordenes', ordenesRoutes);

// Ruta de prueba general
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API del Taller Mecánico funcionando correctamente 🚀' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});