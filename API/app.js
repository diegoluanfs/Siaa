// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const swaggerSetup = require('./config/swagger');
const routes = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Usar o roteador principal
app.use('/api', routes);

// Configurar o Swagger apenas em ambiente local
if (process.env.NODE_ENV !== 'production') {
  swaggerSetup(app);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
