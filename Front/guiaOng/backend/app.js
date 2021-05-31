const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Categoria = require('./models/categoria');

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


app.get('/api/categorias', (req, res, next) => {
  Categoria.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      categorias: documents
    });
  })
});

app.get('/api/categorias/:id', (req, res, next) => {
  Categoria.findById(req.params.id)  
  .then(cat => {
    if(cat){
      res.status(200).json(cat);
    }
    else {
      res.status(404).json({
        mensagem: "Cliente não encontrado!"
      });
    }
    
  })
});

app.post('/api/categorias', (req, res, next) => {
  const categoria = new Categoria({
    nome: req.body.nome
  })
  categoria.save().then(categoriaInserida => {
    res.status(201).json({
      mensagem: 'Categoria inserida com sucesso',
      id: categoriaInserida._id
    });
  })

  
});

app.put("/api/categorias/:id", (req, res, next) => {
  const categoria = new Categoria({
    _id: req.params.id,
    nome: req.body.nome
  });
  Categoria.updateOne({_id: req.params.id}, categoria)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({mensagem: 'Atualização realizada com sucesso'})
});


app.delete('/api/categorias/:id', (req, res, next) => {
  Categoria.deleteOne({
      _id: req.params.id
    })
    .then(
      (resultado) => {
        console.log(resultado);
        res.status(200).json({
          mensagem: "Cliente removido"
        })
      }
    )
})


module.exports = app;
