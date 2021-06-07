const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contato = require('../models/contato');


router.get('', (req, res, next) => {
    Contato.find().then(documents => {
        res.status(200).json({
            mensagem: "Tudo OK",
            Contatos: documents
        });
    })
});


router.get('/:id', (req, res, next) => {
    Contato.findById(req.params.id)
        .then(Contato => {
            if (Contato) {
                res.status(200).json(Contato);
            } else {
                res.status(404).json({
                    mensagem: "Contato não encontrado!"
                });
            }

        })
});

router.post('', (req, res, next) => {
    const contato = new Contato({
        nome: req.body.nome,
        email: req.body.email,
        assunto: req.body.assunto,
        mensagem: req.body.mensagem
    });
    contato.save().then(contatoInserido => {
        res.status(201).json({
            mensagem: 'Contato inseridO com sucesso!',
            id: contatoInserido._id
        })
    })
    sendEmail(contato);
})

router.put('/:id', (req, res, next) => {
    const contato = new Contato({
        _id: req.params.id,
        nome: req.body.nome,
        email: req.body.email,
        assunto: req.body.assunto,
        mensagem: req.body.mensagem
    });
    Contato.updateOne({
        _id: req.params.id
    }, contato)
        .then((resultado) => {
            console.log(resultado)
        });
    res.status(200).json({
        mensagem: 'Atualização realizada com sucesso'
    })
});

router.delete('/:id', (req, res, next) => {
    Contato.deleteOne({
        _id: req.params.id
    })
        .then(
            (resultado) => {
                console.log(resultado);
                res.status(200).json({
                    mensagem: "Contato removido"
                })
            }
        )
})

 function sendEmail(contato) {
    // create reusable transporter object using the default SMTP transport

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "ongsuport@gmail.com",
            pass: "1234abc@"
        }
    });

    transporter.sendMail({
        from: '"Suport "<profceffram@gmail.com>', // sender address
        to: 'ongsuport@gmail.com', // list of receivers
        subject: contato.assunto, // Subject line
        text: 'Nome: '+ contato.nome +' \nEmail: '+contato.email +' \nMensagem: '+contato.mensagem ,

    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
}

module.exports = router;


