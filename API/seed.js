// seed.js
const mysql = require('mysql2');
require('dotenv').config();

// Configuração do banco de dados
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}).promise();

// Dados para inserção
const users = [
  { name: 'Alice Johnson', email: 'alice@example.com', password: 'password123' },
  { name: 'Bob Smith', email: 'bob@example.com', password: 'password123' },
  { name: 'Charlie Brown', email: 'charlie@example.com', password: 'password123' },
  { name: 'Diana Prince', email: 'diana@example.com', password: 'password123' },
  { name: 'Ethan Hunt', email: 'ethan@example.com', password: 'password123' }
];

// Função para inserir usuários
const seedUsers = async () => {
  try {
    for (const user of users) {
      await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [user.name, user.email, user.password]);
    }
    console.log('Users inserted successfully');
  } catch (err) {
    console.error('Error inserting users:', err);
  } finally {
    db.end();
  }
};

// Executa a função de inserção
seedUsers();
