const router = require('express').Router();
const controller = require('../controllers/categoriaController');

router.get('/categorias', controller.listarCategorias);
router.post('/categorias', controller.criarCategoria);
router.put('/categorias/:id', controller.editarCategoria);
router.delete('/categorias/:id', controller.deletarCategoria);

module.exports = router;