const mongoose = require('mongoose')

const emprestimoSchema = new mongoose.Schema({
    livro: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro', required: true },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dataEmprestimo: {type: Date},
    dataDevolucao: {type: Date},
    status: {type: Boolean, default: false},
},{
    timestamps: true,
});

module.exports = mongoose.model('Emprestimo', emprestimoSchema)