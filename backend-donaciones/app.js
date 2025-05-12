const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/db');

const app = express();
app.use(cors());
app.use(express.json());

const campanasRoutes = require('./routes/campanas');
app.use('/api/campanas', campanasRoutes);

const usuariosRoutes = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRoutes);

const reportesRoutes = require('./routes/reportes');
app.use('/api/reportes', reportesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
