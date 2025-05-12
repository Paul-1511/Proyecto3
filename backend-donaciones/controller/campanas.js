const db = require('../db/db'); 

//---------------------------CAMPAÑAS--------------------------------
// GET /api/campanas
exports.getAllCampanas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM campanas');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener campañas' });
  }
};

// GET /api/campanas/:id
exports.getCampanaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM campanas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaña no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener campaña' });
  }
};

// POST /api/campanas
exports.createCampana = async (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_fin, tipo } = req.body;
  try {
    await db.query(
      'INSERT INTO campanas (nombre, descripcion, fecha_inicio, fecha_fin, tipo) VALUES ($1, $2, $3, $4, $5)',
      [nombre, descripcion, fecha_inicio, fecha_fin, tipo]
    );
    res.status(201).json({ message: 'Campaña creada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear campaña' });
  }
};

// PUT /api/campanas/:id
exports.updateCampana = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, fecha_inicio, fecha_fin, tipo } = req.body;
  try {
    await db.query(
      'UPDATE campanas SET nombre=$1, descripcion=$2, fecha_inicio=$3, fecha_fin=$4, tipo=$5 WHERE id=$6',
      [nombre, descripcion, fecha_inicio, fecha_fin, tipo, id]
    );
    res.json({ message: 'Campaña actualizada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar campaña' });
  }
};

// DELETE /api/campanas/:id
exports.deleteCampana = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM campanas WHERE id = $1', [id]);
    res.json({ message: 'Campaña eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar campaña' });
  }
};

