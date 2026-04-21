const Emprestimo = require("../models/emprestimoModel");

const listarEmprestimos = async (req, res) => {
    try {
        const dados = await Emprestimo.find()
            .populate('livro', 'titulo')
            .populate('usuario', 'nome');
        res.json(dados);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar empréstimos" });
    }
};

const criarEmprestimo = async (req, res) => {
    try {
        const novo = await Emprestimo.create({
            livro: req.body.livroId,
            usuario: req.body.usuarioId,
            status: false
        });
        res.status(201).json(novo);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao criar empréstimo" });
    }
};

const editarEmprestimo = async (req, res) => {
    try {
        const atualizado = await Emprestimo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(atualizado);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao editar" });
    }
};

const deletarEmprestimo = async (req, res) => {
    try {
        await Emprestimo.findByIdAndDelete(req.params.id);
        res.json({ msg: "Empréstimo excluído" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar" });
    }
};

module.exports = { listarEmprestimos, criarEmprestimo, editarEmprestimo, deletarEmprestimo };