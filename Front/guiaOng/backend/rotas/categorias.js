const express = require("express");
const router = express.Router();
const Categoria = require('../models/categoria');
const checkAuth = require ('../middleware/check-auth');


router.get('', (req, res, next) => {
  Categoria.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      categorias: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Categoria.findById(req.params.id)
    .then(cat => {
      if (cat) {
        res.status(200).json(cat);
      } else {
        res.status(404).json({
          mensagem: "Categoria não encontrado!"
        });
      }

    })
});

router.post('',checkAuth, (req, res, next) => {
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

router.put('/:id',checkAuth, (req, res, next) => {
  const categoria = new Categoria({
    _id: req.params.id,
    nome: req.body.nome
  });
  Categoria.updateOne({
      _id: req.params.id
    }, categoria)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({
    mensagem: 'Atualização realizada com sucesso'
  })
});


router.delete('/:id',checkAuth, (req, res, next) => {
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

module.exports = router;