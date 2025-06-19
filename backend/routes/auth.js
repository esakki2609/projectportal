const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../db');

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) return res.status(401).json({ message: 'Invalid username' });

    const user = rows[0];
    const hashed = crypto.createHash('md5').update(
        crypto.createHash('md5').update(password).digest('hex') + user.salt
    ).digest('hex');

    if (hashed === user.password) {
        req.session.user = user;
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid password' });
    }
});

module.exports = router;
