import { Router } from 'express';
import { pool } from '../db/pool.js';

const router = Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').toLowerCase());
}

router.post('/', async (req, res) => {
  const { nome, email, area, comentario } = req.body || {};

  if (!nome || !email || !area) {
    return res.status(400).json({ error: 'Campos obrigatórios: nome, email, area.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido.' });
  }

  try {
    const query = `
      INSERT INTO leads (nome, email, area, comentario)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at;
    `;
    const params = [nome, email, area, comentario || null];
    const { rows } = await pool.query(query, params);

    return res.status(201).json({
      ok: true,
      id: rows[0].id,
      created_at: rows[0].created_at,
    });
  } catch (err) {
    console.error('Erro ao inserir lead:', err);
    return res.status(500).json({ error: 'Erro interno ao salvar dados.' });
  }
});

export default router;