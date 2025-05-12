const db = require('../db/db');

exports.reporteDonacioneslive = async (req, res) => {
  const {
    fecha_inicio,
    fecha_fin,
    monto_minimo,
    monto_maximo,
    tipo_campana
  } = req.query;

  let condiciones = [];
  let valores = [];
  let i = 1;

  if (fecha_inicio) {
    condiciones.push(`d.fecha >= $${i++}`);
    valores.push(fecha_inicio);
  }
  if (fecha_fin) {
    condiciones.push(`d.fecha <= $${i++}`);
    valores.push(fecha_fin);
  }
  if (monto_minimo) {
    condiciones.push(`d.monto >= $${i++}`);
    valores.push(monto_minimo);
  }
  if (monto_maximo) {
    condiciones.push(`d.monto <= $${i++}`);
    valores.push(monto_maximo);
  }
  if (tipo_campana) {
    condiciones.push(`c.tipo = $${i++}`);
    valores.push(tipo_campana);
  }

  const where = condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';

  const query = `
    SELECT d.*, c.nombre AS campana_nombre, c.tipo 
    FROM donaciones d
    JOIN campanas c ON d.campana_id = c.id
    ${where}
  `;

  try {
    const result = await db.query(query, valores);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en reporte:', err);
    res.status(500).json({ error: 'Error al generar reporte dinámico' });
  }
};

exports.reporteDonaciones = async (req, res) => {
  try {
    const {
      fecha_inicio,
      fecha_fin,
      monto_minimo,
      monto_maximo,
      tipo_campana
    } = req.query;

    let query = `
      SELECT d.*, c.nombre AS campana_nombre, c.tipo AS tipo_campana
      FROM donaciones d
      JOIN campanas c ON d.campana_id = c.id
      WHERE 1=1
    `;
    const valores = [];

    if (fecha_inicio) {
      query += ` AND d.fecha >= $${valores.length + 1}`;
      valores.push(fecha_inicio);
    }
    if (fecha_fin) {
      query += ` AND d.fecha <= $${valores.length + 1}`;
      valores.push(fecha_fin);
    }
    if (monto_minimo) {
      query += ` AND d.monto >= $${valores.length + 1}`;
      valores.push(monto_minimo);
    }
    if (monto_maximo) {
      query += ` AND d.monto <= $${valores.length + 1}`;
      valores.push(monto_maximo);
    }
    if (tipo_campana) {
      query += ` AND c.tipo = $${valores.length + 1}`;
      valores.push(tipo_campana);
    }

    const result = await db.query(query, valores);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error al generar el reporte:', err);
    res.status(500).json({ error: 'Error al generar el reporte' });
  }
};

exports.donacionesPorCampana = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;

  if (!fecha_inicio || !fecha_fin) {
    return res.status(400).json({ error: 'Debes proporcionar fecha_inicio y fecha_fin' });
  }

  try {
    const query = `
      SELECT c.nombre AS campana, SUM(d.monto) AS total_recaudado
      FROM donaciones d
      JOIN campanas c ON d.campana_id = c.id
      WHERE d.fecha BETWEEN $1 AND $2
      GROUP BY c.nombre
    `;
    const values = [fecha_inicio, fecha_fin];
    const result = await db.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error('Error generando el reporte:', err);
    res.status(500).json({ error: 'Error al generar el reporte' });
  }
};


exports.voluntariosPorCampana = async (req, res) => {
  const { tipo_campana } = req.query;

  try {
    let query = `
      SELECT c.nombre AS campana, COUNT(v.id) AS voluntarios
      FROM voluntarios v
      JOIN campanas c ON v.campana_id = c.id
    `;
    
    const values = [];
    if (tipo_campana) {
      query += ` WHERE c.tipo = $1`;
      values.push(tipo_campana);
    }

    query += ` GROUP BY c.nombre`;

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en voluntariosPorCampana:', err);
    res.status(500).json({ error: 'Error al generar reporte de voluntarios' });
  }
};

exports.horasVoluntariado = async (req, res) => {
  const { fecha_inicio, fecha_fin } = req.query;

  try {
    let query = `
      SELECT u.nombre || ' ' || u.apellido AS nombre, 
             SUM(sv.horas) AS total_horas
      FROM seguimientos_voluntarios sv
      JOIN voluntarios v ON sv.voluntario_id = v.id
      JOIN usuarios u ON v.usuario_id = u.id
    `;

    const values = [];
    let whereAdded = false;

    if (fecha_inicio) {
      query += ` WHERE sv.fecha >= $${values.length + 1}`;
      values.push(fecha_inicio);
      whereAdded = true;
    }

    if (fecha_fin) {
      query += ` ${whereAdded ? 'AND' : 'WHERE'} sv.fecha <= $${values.length + 1}`;
      values.push(fecha_fin);
    }

    query += ` GROUP BY u.nombre, u.apellido`;

    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en horasVoluntariado:', err);
    res.status(500).json({ error: 'Error al generar reporte de horas' });
  }
};