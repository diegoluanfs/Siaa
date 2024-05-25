// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Endpoint para registrar um novo usuário
router.post('/register', userController.registerUser);

// Endpoint para login
router.post('/login', userController.loginUser);

router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
