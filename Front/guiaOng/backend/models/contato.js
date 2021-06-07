//importando o pacote
const mongoose = require ('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const contatoSchema = mongoose.Schema ({
nome: {type: String, required: true},
email: {type: String, required: true},
assunto: {type: String, required: true},
mensagem: {type: String, required: true}

});
//criamos o modelo associado ao nome Cliente e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Contato', contatoSchema);
