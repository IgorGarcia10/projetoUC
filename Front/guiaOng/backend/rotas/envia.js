const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//Configurações de quem envia 
//funcionando esse aqui
 let transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 587,
    secure: false,

    auth: {
        user: "profceffram2@gmail.com",
        pass: "Ved@2020"
    }

});

//configurações do email
transporter.sendMail({
    from: "Igor <profceffram2@gmail.com>",
    to: "alexandre.igor64@gmail.com",
    subject: "Titulo",
    text: "mensagem",

}).then(message => {
    console.log(message);
}).catch(err => {
    console.log(err);
}) 





/* async function sendEmail(contato, callback) {
    // create reusable transporter object using the default SMTP transport


    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "profceffram2@gmail.com",
            pass: "Ved@2020"
        }
    });

    transporter.sendMail({
        from: '"Suport "<profceffram@gmail.com>', // sender address
        to: contato.email, // list of receivers
        subject: contato.assunto, // Subject line
        text: contato.mensagem,

    }).then(message => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
} */

/* async function sendMail(contato, callback) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "profceffram2@gmail.com",
            pass: "Ved@2020"
        }
    });

    let mailOptions = {
        from: '"Suport "<profceffram@gmail.com>', // sender address
        to: contato.email, // list of receivers
        subject: contato.assunto, // Subject line
        text: contato.mensagem,
        html: `<h1>Hi ${contato.name}</h1><br>
      <h4>Thanks for joining us</h4>`
    };
} */
// send mail with defined transport object
//let info = await transporter.sendEmail();

//callback(info);

module.exports = router;

/* //import modules installed at the previous step. We need them to run Node.js server and send emails
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// create a new Express application instance
const app = express();

// define a sendmail endpoint, which will send emails and response with the corresponding status
app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, (err, info) => {
        if (err) {
            console.log(err);
            res.status(400);
            res.send({ error: "Failed to send email" });
        } else {
            console.log("Email has been sent");
            res.send(info);
        }
    });
});
const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "profceffram@gmail.com",
            pass: "Ved@2020"
        }
    });
}

const mailOptions = {
    from: "Igor <profceffram@gmail.com>",
    to: "alexandre.igor64@gmail.com",
    subject: "Titulo",
    text: "mensagem",
};

module.exports = router;  */

