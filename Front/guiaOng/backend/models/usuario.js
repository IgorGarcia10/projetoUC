const mongoose = require ('mongoose');

const usuarioSchema = mongoose.Schema ({
    nome: {type: String, required: true},
    email: {type: String, require: true},
    senha: {type: String, require: true},
    });

module.exports = mongoose.model('Usuario', usuarioSchema);