const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nome: { type: String, required:[true,'Nome é Obrigatório'] },
    email: { type: String, required:[true,'Email é Obrigatório'], unique: true},
    senha: { type: String, required:[true,'Senha é Obrigatória']},
},
{
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema)