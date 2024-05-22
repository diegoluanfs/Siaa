// models/userModel.js
const db = require('../config/database');

const User = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (user) => {
    console.log('dentro da model');
    const result = await db.query('INSERT INTO users SET ?', user);
    console.log('dentro da model result: ', result);
    return result[0].insertId;
  },

  update: async (id, user) => {
    await db.query('UPDATE users SET ? WHERE id = ?', [user, id]);
  },

  delete: async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
};

module.exports = User;
