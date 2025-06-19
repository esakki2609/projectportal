const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const { page = 1, sortBy = 'recent' } = req.query;
  const limit = 3;
  const offset = (page - 1) * limit;

  let orderBy = 'p.created_at DESC';
  if (sortBy === 'category') orderBy = 'c.category_name ASC';
  else if (sortBy === 'username') orderBy = 'u.username ASC';
  else if (sortBy === 'title') orderBy = 'p.title ASC';

  const sql = `
    SELECT p.title AS project_title, u.username, c.category_name
    FROM projects p
    LEFT JOIN users u ON p.user_id = u.user_id
    LEFT JOIN categories c ON p.cid = c.cid
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  try {
    const [results] = await db.query(sql, [limit, offset]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
