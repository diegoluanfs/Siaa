const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const sequelize = require('./config/database'); // Ajuste da importação do Sequelize
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Configurações personalizadas do CORS (descomentado caso necessário)
// const corsOptions = {
//   origin: 'http://example.com', // Permitir apenas este domínio
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
//   credentials: true, // Permitir cookies
//   optionsSuccessStatus: 204
// };
// app.use(cors(corsOptions));

app.use(morgan('combined'));

// Usar o roteador principal
app.use('/api/', userRoutes);

// Configurar o Swagger apenas em ambiente local
if (process.env.NODE_ENV !== 'production') {
  const swaggerSetup = require('./config/swagger');
  swaggerSetup(app);
}

// Sincronizar com a base de dados e iniciar o servidor
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync({ alter: process.env.NODE_ENV !== 'production' }); // Alter apenas em desenvolvimento
  })
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
