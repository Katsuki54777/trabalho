const express = require('express')
const router = express.Router()

const { listarLivros, criarLivro, editarLivro, deletarLivro } = require('../controllers/livroController')

router.get('/livros', listarLivros)
router.post('/livros', criarLivro)
router.put('/livros/:id', editarLivro)
router.delete('/livros/:id', deletarLivro)

module.exports = router;