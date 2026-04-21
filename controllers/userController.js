const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const criarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    if(!nome || !email || !senha){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }
    try{
        const existeUsuario = await User.findOne({ email })
        if(existeUsuario){
            return res.status(400).json({ msg: "Email já existe no sistema"})
        }
        const hash = await bcrypt.hash(senha, 10)
        const novoUsuario = await User.create({ nome, email, senha:hash })
        const { _id, nome:nomeUsuario, email:emailUsuario } = novoUsuario
        res.status(201).json({ msg: "Usuario criado com sucesso", usuario:{id:_id, nome:nomeUsuario, email:emailUsuario} })
    } catch (error){
        res.status(500).json({ msg: "Erro ao criar novo usuário: ", error: error.message })
    }
}

const listarUsuarios = async(req, res) =>{
    try {
        const usuarios = await User.find({}, "-senha")
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ msg:"Erro ao listar usuários: ", error: error.message })
    }
}

const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body

    try {
        const usuario = await User.findById(id)

        if(!usuario){
            return res.status(404).json({msg: "Usuário não existe no banco"})
        }
        if(email && email == usuario.email && id != usuario._id){
            const emailExistente = await User.findOne({ email })
            if(emailExistente){
                return res.status(400).json({ msg:"Email já cadastrado" })
            }
        }

        if(nome) usuario.nome = nome
        if(email) usuario.email = email
       if(senha) {
       const hash = await bcrypt.hash(senha, 10);
       usuario.senha = hash; 
       }  

        await usuario.save()

        res.json({
            msg: "Usuário atualizado com sucesso",
            usuario: {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email
            }
        })
    } catch (error) {
        res.status(500).json({
            msg: "Erro ao atualizar usuário",
            error: error.message
        });
    }
};

const deletarUsuario = async (req, res) => {
    const { id } = req.params

    try {
        const usuario = await User.findByIdAndDelete(id);

        if(!usuario){
            return res.status(404).json({msg: "Usuário não encontrado"})
        }

        res.json({ msg: "Usuário deletado com sucesso"})
    } catch (error) {
        res.status(500).json({
            msg:"Erro ao deletar usuário",
            error: error.message
        });
    }
};

module.exports = { criarUsuario, listarUsuarios, editarUsuario, deletarUsuario }