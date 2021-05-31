//importando o pacote
const mongoose = require ('mongoose');
//definindo o "schema"
//note a semelhança com recursos de bases relacionais
const categoriaSchema = mongoose.Schema ({
nome: {type: String, required: true}
});
//criamos o modelo associado ao nome Cliente e exportamos
//tornando acessível para outros módulos da aplicação
module.exports = mongoose.model('Categoria', categoriaSchema);
