const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const sequelize = require('./db');
const cors = require('cors');  // Importando o pacote CORS

const app = express();

// Configuração do CORS para permitir acesso do frontend
app.use(cors());

app.use(bodyParser.json());

// Roteamento com autenticação (se necessário)
//app.use(authMiddleware);  // Use o middleware se necessário

// Endpoints de postagem
app.use(postRoutes);

// Iniciar o servidor
sequelize.sync({ alter: true }).then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  });
