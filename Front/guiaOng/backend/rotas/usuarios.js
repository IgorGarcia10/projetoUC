const express = require("express");
const router = express.Router();
const Usuario = require('../models/usuario')

router.get('', (req, res, next) => {
  Usuario.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      usuarios: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Usuario.findById(req.params.id)
    .then(usuario => {
      if (usuario) {
        res.status(200).json(usuario);
      } else {
        res.status(404).json({
          mensagem: "Usuario não encontrado!"
        });
      }

    })
});

router.post('', (req, res, next) => {
  const usuario = new Usuario({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  });
  usuario.save().then(UsuarioInserido => {
    res.status(201).json({
      mensagem: 'Usuario inserido com sucesso!',
      id: UsuarioInserido._id
    })
  })
  
})

router.put('/:id', (req, res, next) => {
  const usuario = new Usuario({
    _id: req.params.id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  });
  Usuario.updateOne({
      _id: req.params.id
    }, usuario)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({
    mensagem: 'Atualização realizada com sucesso'
  })
});

router.delete('/:id', (req, res, next) => {
  Usuario.deleteOne({
      _id: req.params.id
    })
    .then(
      (resultado) => {
        console.log(resultado);
        res.status(200).json({
          mensagem: "Usuario removido"
        })
      }
    )
})

module.exports = router;
