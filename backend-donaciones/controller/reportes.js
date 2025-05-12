const db = require('../db/db');

exports.reporteDonacioneslive = async (req, res) => {
  const { fecha_inicio, fecha_fin, monto_minimo, monto_maximo, tipo_campana } = req.query;

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
    const { fecha_inicio, fecha_fin, monto_min, monto_max, tipo_campana } = req.query;

    let query = `
      SELECT d.*, c.tipo AS tipo_campana
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
    if (monto_min) {
      query += ` AND d.monto >= $${valores.length + 1}`;
      valores.push(monto_min);
    }
    if (monto_max) {
      query += ` AND d.monto <= $${valores.length + 1}`;
      valores.push(monto_max);
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



