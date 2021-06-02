const express = require("express");
const router = express.Router();
const Ong = require('../models/ong')

router.get('', (req, res, next) => {
  Ong.find().then(documents => {
    res.status(200).json({
      mensagem: "Tudo OK",
      ongs: documents
    });
  })
});

router.get('/:id', (req, res, next) => {
  Ong.findById(req.params.id)
    .then(ong => {
      if (ong) {
        res.status(200).json(ong);
      } else {
        res.status(404).json({
          mensagem: "Ong não encontrado!"
        });
      }

    })
});

router.post('', (req, res, next) => {
  const ong = new Ong({
    nome: req.body.nome,
    cnpj: req.body.cnpj,
    email: req.body.email,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    foto: req.body.foto,
    qrcode: req.body.qrcode,
    categoria: req.body.categoria,
    descricao: req.body.descricao
  });
  ong.save().then(ongInserida => {
    res.status(201).json({
      mensagem: 'Ong inserida com sucesso!',
      id: ongInserida._id
    })
  })
  
})

router.put('/:id', (req, res, next) => {
  const ong = new Ong({
    _id: req.params.id,
    nome: req.body.nome,
    cnpj: req.body.cnpj,
    email: req.body.email,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    foto: req.body.foto,
    qrcode: req.body.qrcode,
    categoria: req.body.categoria,
    descricao: req.body.descricao
  });
  Ong.updateOne({
      _id: req.params.id
    }, ong)
    .then((resultado) => {
      console.log(resultado)
    });
  res.status(200).json({
    mensagem: 'Atualização realizada com sucesso'
  })
});

router.delete('/:id', (req, res, next) => {
  Ong.deleteOne({
      _id: req.params.id
    })
    .then(
      (resultado) => {
        console.log(resultado);
        res.status(200).json({
          mensagem: "Ong removida"
        })
      }
    )
})

module.exports = router;
