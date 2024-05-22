// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// // Configurações personalizadas do CORS
// const corsOptions = {
//   origin: 'http://example.com', // Permitir apenas este domínio
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
//   credentials: true, // Permitir cookies
//   optionsSuccessStatus: 204
// };
//
// app.use(cors(corsOptions));

app.use(morgan('combined'));

// Usar o roteador principal
app.use('/api', routes);

// Configurar o Swagger apenas em ambiente local
if (process.env.NODE_ENV !== 'production') {
  const swaggerSetup = require('./config/swagger');
  swaggerSetup(app);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
