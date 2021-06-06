const mongoose = require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

const usuarioSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: {type: String, required: false, default: 'false'}
});

usuarioSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Usuario", usuarioSchema);