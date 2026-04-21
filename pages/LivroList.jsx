import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function LivroList() {
    const [livros, setLivros] = useState([]);

    const fetchLivros = async () => {
        const response = await api.get("/livros");
        setLivros(response.data);
    };

    useEffect(() => { fetchLivros(); }, []);

    const deleteLivro = async (id) => {
        if (!window.confirm("Excluir este livro?")) return;
        try {
            await api.delete(`/livros/${id}`);
            fetchLivros();
        } catch (error) {
            alert("Erro ao excluir livro");
        }
    };

    return (
        <div className="container">
            <h1>Lista de Livros</h1>
            <Link to="/livros/create"><button className="create-btn">Novo Livro</button></Link>
            {livros.map((livro) => (
                <div className="card" key={livro._id}>
                    <div><strong>{livro.titulo}</strong><p>{livro.autor}</p></div>
                    <div className="actions">
                        <Link to={`/livros/edit/${livro._id}`}>
                            <button className="edit-btn">Editar</button>
                        </Link>
                        <button className="delete-btn" onClick={() => deleteLivro(livro._id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default LivroList;