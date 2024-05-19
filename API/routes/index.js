/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Rota raiz e redirecionamento para as rotas de usuários
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     responses:
 *       '200':
 *         description: Mensagem de boas-vindas
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Redireciona para a rota de listagem de usuários
 *     responses:
 *       '302':
 *         description: Redirecionamento
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: "/users"
 */
const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Rota raiz
router.get('/', (req, res) => {
  res.send('Bem-vindo à API de Gerenciamento de Usuários');
});

// Usar as rotas de usuários
router.use('/users', userRoutes);

module.exports = router;
