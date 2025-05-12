
const db = require('../db/db'); 

exports.getAllUsuarios = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.getUsuariosById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

