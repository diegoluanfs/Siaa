// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validateUser } = require('../validations/userValidation'); // Assumindo que esta função está em um arquivo separado

const handleError = (res, error, message) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({ message: 'Usuário já existe', error });
  } else {
    res.status(500).json({ message, error });
  }
};

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      handleError(res, error, 'Erro ao buscar usuários');
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Usuário não encontrado' });
      }
    } catch (error) {
      handleError(res, error, 'Erro ao buscar usuário');
    }
  },

  registerUser: async (req, res) => {
    const { username, email, password } = req.body;
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ message: 'Escolha outro nome de usuário' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashedPassword });

      res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      handleError(res, error, 'Erro ao criar o usuário');
    }
  },

  loginUser: async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Nome de usuário ou senha inválidos' });
      }

      res.status(200).json({ message: 'Login bem-sucedido', user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
      handleError(res, error, 'Erro ao fazer login');
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const { error } = validateUser(req.body, true);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);

      await user.save();
      res.status(200).json({ message: 'Usuário atualizado com sucesso', user });
    } catch (error) {
      handleError(res, error, 'Erro ao atualizar o usuário');
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      await user.destroy();
      res.status(204).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      handleError(res, error, 'Erro ao excluir o usuário');
    }
  }
};