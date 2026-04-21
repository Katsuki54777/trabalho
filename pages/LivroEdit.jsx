import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css"

function LivroEdit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [titulo, setTitulo] = useState("")
    const [autor, setAutor] = useState("")
    const [ano, setAno] = useState("")
    const [editora, setEditora] = useState("")
    const [paginas, setPaginas] = useState("")
    const [status, setStatus] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/livros")
                const livro = response.data.find((l) => l._id === id)

                if (livro) 
                {
                    setTitulo(livro.titulo)
                    setAutor(livro.autor)
                    setAno(livro.ano)
                    setEditora(livro.editora)
                    setPaginas(livro.paginas)
                    setStatus(livro.status)
                }
            } catch (error) {
                console.error("Erro ao carregar livro: ", error)
            }
        };
        fetchUser()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await api.put(`/livros/${id}`,
                {
                    titulo: titulo,
                    autor: autor,
                    ano: ano,
                    editora: editora,
                    paginas: paginas,
                    status: status,
                });

                alert("Livro atualizado com sucesso!")
                navigate("/")
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message)
            alert("Erro ao atualizar livro");
        }
    }

    return (
        <div className="create-container">
            <h2>Editar Livro</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Título:</label>
                    <input type="text"
                    value={titulo} 
                    onChange={(e) => setTitulo(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Autor:</label>
                    <input type="text"
                    value={autor} 
                    onChange={(e) => setAutor(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Ano:</label>
                    <input type="number"
                    value={ano} 
                    onChange={(e) => setAno(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Editora:</label>
                    <input type="text"
                    value={editora} 
                    onChange={(e) => setEditora(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Páginas:</label>
                    <input type="number"
                    value={paginas} 
                    onChange={(e) => setPaginas(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Status:</label>
                    <input type="text"
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    required />
                </div>

                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default LivroEdit;