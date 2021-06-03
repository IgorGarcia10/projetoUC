const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const categoriaRoutes = require('./rotas/categorias');
const ongRoutes = require('./rotas/ongs');
const usuarioRoutes = require('./rotas/usuarios');

mongoose.connect('mongodb+srv://user_guiaong:guiaong123@clusterguiaong.xptir.mongodb.net/guiaOng?retryWrites=true&w=majority')
  .then(() => {
    console.log("Conexão OK")
  }).catch(() => {
    console.log("Conexão Not OK")
  });
app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});


app.use('/api/categorias', categoriaRoutes);
app.use('/api/ongs', ongRoutes);
app.use('/api/usuarios', usuarioRoutes);

module.exports = app;