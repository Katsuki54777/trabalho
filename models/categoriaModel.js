const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({ 
      genero: { type: String, required:[true,'Gênero é Obrigatório'] },
      livro: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro', required: true },
}
,{
    timestamps: true,
});

module.exports = mongoose.model('Categoria', categoriaSchema);