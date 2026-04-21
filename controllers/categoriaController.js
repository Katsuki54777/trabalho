const Categoria = require('../models/categoriaModel');


const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find().populate('livro', 'titulo');
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao listar categorias" });
    }
};


const criarCategoria = async (req, res) => {
    try {
        const novaCategoria = await Categoria.create(req.body);
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao criar categoria" });
    }
};

const editarCategoria = async (req, res) => {
    try {
        const atualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(atualizada);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao editar categoria" });
    }
};


const deletarCategoria = async (req, res) => {
    try {
        await Categoria.findByIdAndDelete(req.params.id);
        res.json({ msg: "Categoria deletada com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar categoria" });
    }
};

module.exports = { listarCategorias, criarCategoria, editarCategoria, deletarCategoria };