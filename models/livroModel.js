const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
        titulo: { type: String, required:[true,'Título é Obrigatório'] },
        autor: { type: String, required:[true,'Autor é Obrigatório'] },
        ano: { type: Number, required:[true,'Ano é Obrigatório'] },
        editora: { type: String, required:[true,'Editora é Obrigatório'] },
        paginas: { type: Number, required:[true,'Número de páginas é Obrigatório'] },
        status: { type: Boolean, default: false },
},{
    timestamps: true,
});

module.exports = mongoose.model('Livro', taskSchema)