const mongoose = require ('mongoose');

const ongSchema = mongoose.Schema ({
    nome: {type: String, required: true},
    cnpj: {type: String, require: true},
    email: {type: String, require: true},
    telefone: {type: String, require: false, default: '00000000'},
    endereco: {type: String, require: false, default: ''},
    foto: {type: String, require: false, default: ''},
    qrcode: {type: String, require: false, default: ''},
    categoria: {type: String, require: true},
    descricao: {type: String, require: true}
    });

module.exports = mongoose.model('Ong', ongSchema);