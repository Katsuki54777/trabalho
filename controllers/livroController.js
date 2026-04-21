const Livro = require('../models/livroModel');

const listarLivros = async (req, res) => {
    try {
        const livros = await Livro.find()
        res.json(livros)
    } catch (error) {
        res.status(500).json({ msg: "Erro ao listar livros", error: error.message })
    }
}

const criarLivro = async (req, res) => {
    const { titulo, autor, ano, editora, paginas } = req.body

    try {
        const novoLivro = await Livro.create({ titulo, autor, ano, editora, paginas })
        res.json({ msg: "Livro criado com sucesso", livro: novoLivro })
    } catch (error) {
        res.status(500).json({ msg: "Erro ao criar livro", error: error.message })
    }
}

const editarLivro = async (req, res) => {
    const { id } = req.params
    const { titulo, autor, ano, editora, paginas, status } = req.body

    try {
        const livro = await Livro.findById(id)

        if (!livro) {
            return res.status(404).json({ msg: "Livro não encontrado" })
        }

        if (titulo) livro.titulo = titulo
        if (autor) livro.autor = autor
        if (ano) livro.ano = ano
        if (editora) livro.editora = editora
        if (paginas) livro.paginas = paginas
        if (typeof status === 'boolean') livro.status = status

        await livro.save();

        res.json({ msg: "Livro atualizado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar livro", error: error.message })
    }
}

const deletarLivro = async (req, res) => {
    const { id } = req.params

    try {
        const livro = await Livro.findByIdAndDelete(id)

        if (!livro) {
            return res.status(404).json({ msg: "Livro não encontrado" })
        }

        res.json({ msg: "Livro deletado com sucesso" })
    } catch (error) {
        res.status(500).json({ msg: "Erro ao deletar livro", error: error.message })
    }
}

module.exports = {
    listarLivros, criarLivro, editarLivro, deletarLivro
}