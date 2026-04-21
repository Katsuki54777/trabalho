import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function CategoriaList() {
    const [categorias, setCategorias] = useState([]);

    const carregarCategorias = () => {
        api.get("/categorias")
            .then(res => setCategorias(res.data))
            .catch(() => alert("Erro ao carregar categorias"));
    };

    useEffect(() => {
        carregarCategorias();
    }, []);

    const excluir = async (id) => {
        if (window.confirm("Deseja excluir este gênero?")) {
            try {
                await api.delete(`/categorias/${id}`);
                carregarCategorias(); // Recarrega a lista após deletar
            } catch {
                alert("Erro ao deletar.");
            }
        }
    };

    return (
        <div className="container">
            <h1>Gêneros por Livro</h1>
            <Link to="/categorias/create">
                <button className="create-btn">Vincular Novo Gênero</button>
            </Link>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Gênero</th>
                        <th>Livro Vinculado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.length === 0 ? (
                        <tr><td colSpan="3">Nenhuma categoria encontrada.</td></tr>
                    ) : (
                        categorias.map(cat => (
                            <tr key={cat._id}>
                                <td>{cat.genero}</td>
                                <td>{cat.livro?.titulo || "Livro não encontrado"}</td>
                                <td>
                                    <Link to={`/categorias/edit/${cat._id}`}>
                                        <button className="edit-btn">Editar</button>
                                    </Link>
                                    <button 
                                        onClick={() => excluir(cat._id)} 
                                        className="delete-btn"
                                        style={{ marginLeft: '10px', backgroundColor: '#ff4d4d' }}
                                    >
                                        Deletar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default CategoriaList;