const express = require("express");
const router = express.Router();
const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

//CRUD DO CADASTRO USUARIO

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

//Criar usuario sem a autentificação 
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
//cria o usuario com autentificacao e criptografado
/* router.post('/cadastrar', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
          const usuario = new Usuario({
              nome: req.body.nome,
              email: req.body.email,
              password: hash
          })
          usuario.save()
              .then(result => {
                  res.status(201).json({
                      mensagem: "Usuario criado",
                      resultado: result
                  });
              })
              .catch(err => {
                  res.status(500).json({
                      erro: err
                  })
              })
      })
}); */

//Autentica o usuario com o banco
router.post('/login', (req, res, next) => {
  let user;
  Usuario.findOne({ email: req.body.email }).then(u => {
      user = u;
      if (!u) {
          return res.status(401).json({
              mensagem: "email inválido"
          })
      }
      return bcrypt.compare(req.body.password, u.password);
  })
      .then(result => {
          if (!result) {
              return res.status(401).json({
                  mensagem: "senha inválida"
              })
          }
          const token = jwt.sign(
              { email: user.email, id: user._id },
              'minhasenha',
              { expiresIn: '1h' }
          )
          res.status(200).json({ token: token })
      })
      .catch(err => {
          return res.status(401).json({
              mensagem: "Login falhou: " + err
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
