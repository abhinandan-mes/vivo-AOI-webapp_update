const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

const publicUser = user => ({
  id: user.id,
  username: user.username,
  full_name: user.full_name,
  role: user.role
});

const createToken = user => jwt.sign(
  { id: user.id, username: user.username, full_name: user.full_name, role: user.role },
  JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
);

router.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, error: 'Username and password are required' });

    const result = await pool.query('SELECT * FROM app_users WHERE username = $1', [username.trim()]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ success: false, error: 'Invalid username or password' });

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) return res.status(401).json({ success: false, error: 'Invalid username or password' });

    const token = createToken(user);

    res.json({ success: true, token, user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/auth/create-user', authenticateToken, async (req, res) => {
  try {
    const { username, password, fullName, role } = req.body;
    const normalizedUsername = username?.trim();
    const normalizedFullName = fullName?.trim();
    const normalizedRole = role?.trim();

    if (!normalizedUsername || !password || !normalizedFullName || !normalizedRole) {
      return res.status(400).json({ success: false, error: 'Username, password, full name, and role are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    const allowedRoles = req.user.role === 'super_admin'
      ? ['super_admin', 'admin', 'inspector', 'technician']
      : ['inspector', 'technician'];

    if (!allowedRoles.includes(normalizedRole)) {
      return res.status(403).json({ success: false, error: 'You are not allowed to assign that role' });
    }

    const existingUser = await pool.query('SELECT id FROM app_users WHERE username = $1', [normalizedUsername]);
    if (existingUser.rows[0]) {
      return res.status(409).json({ success: false, error: 'Username is already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      `INSERT INTO app_users (username, password_hash, full_name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, full_name, role`,
      [normalizedUsername, passwordHash, normalizedFullName, normalizedRole]
    );

    const user = result.rows[0];
    res.status(201).json({ success: true, user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, full_name, role FROM app_users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
