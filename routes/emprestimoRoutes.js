const router = require('express').Router();
const controller = require('../controllers/emprestimoController');

router.get('/emprestimos', controller.listarEmprestimos);
router.post('/emprestimos', controller.criarEmprestimo);
router.put('/emprestimos/:id', controller.editarEmprestimo);
router.delete('/emprestimos/:id', controller.deletarEmprestimo);

module.exports = router;