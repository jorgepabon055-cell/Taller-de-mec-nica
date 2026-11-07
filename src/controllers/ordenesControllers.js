const db = require('../config/db');

// GET: Obtener todas las órdenes con sus relaciones
exports.getOrdenes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT os.*, c.nombre AS cliente_nombre, v.placa, m.nombre AS mecanico_nombre 
      FROM ordenes_servicio os
      JOIN clientes c ON os.id_cliente = c.id_cliente
      JOIN vehiculos v ON os.id_vehiculo = v.id_vehiculo
      JOIN mecanicos m ON os.id_mecanico = m.id_mecanico
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("DETALLE DEL ERROR DE MYSQL:", error);
    res.status(500).json({ success: false, message: error.message, code: error.code });
  }
};

// GET BY ID: Obtener una orden por su ID
exports.getOrdenById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM ordenes_servicio WHERE id_orden = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Crear una nueva orden
exports.createOrden = async (req, res) => {
  const { codigo_orden, diagnostico, estado, costo_total, id_cliente, id_vehiculo, id_mecanico } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO ordenes_servicio (codigo_orden, diagnostico, estado, costo_total, id_cliente, id_vehiculo, id_mecanico) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [codigo_orden, diagnostico, estado || 'Pendiente', costo_total || 0, id_cliente, id_vehiculo, id_mecanico]
    );
    res.status(201).json({ success: true, message: 'Orden creada exitosamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT: Actualizar una orden
exports.updateOrden = async (req, res) => {
  const { id } = req.params;
  const { diagnostico, estado, costo_total, id_mecanico } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE ordenes_servicio SET diagnostico = ?, estado = ?, costo_total = ?, id_mecanico = ? WHERE id_orden = ?',
      [diagnostico, estado, costo_total, id_mecanico, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Orden actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE: Eliminar una orden
exports.deleteOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM ordenes_servicio WHERE id_orden = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Orden no encontrada' });
    }
    res.status(200).json({ success: true, message: 'Orden eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



// GET: Obtener todos los mecánicos
exports.getMecanicos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM mecanicos');
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("DETALLE DEL ERROR DE MYSQL:", error);
    res.status(500).json({ success: false, message: error.message, code: error.code });
  }
};