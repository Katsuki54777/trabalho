import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function CategoriaCreate() {
    const [genero, setGenero] = useState("");
    const [livroId, setLivroId] = useState("");
    const [livros, setLivros] = useState([]);
    const navigate = useNavigate();

    // Carrega os livros para o usuário selecionar um
    useEffect(() => {
        api.get("/livros").then(res => setLivros(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envia o gênero e a referência do livro
            await api.post("/categorias", { genero, livro: livroId });
            alert("Categoria vinculada ao livro com sucesso!");
            navigate("/categorias");
        } catch (error) {
            alert("Erro ao criar categoria.");
        }
    };

    return (
        <div className="container">
            <h2>Vincular Gênero ao Livro</h2>
            <form onSubmit={handleSubmit} className="create-form">
                <div className="form-group">
                    <label>Gênero</label>
                    <input 
                        type="text" 
                        placeholder="Ex: Suspense" 
                        onChange={e => setGenero(e.target.value)} 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label>Selecione o Livro</label>
                    <select onChange={e => setLivroId(e.target.value)} required>
                        <option value="">Escolha um livro...</option>
                        {livros.map(l => (
                            <option key={l._id} value={l._id}>{l.titulo}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="submit-btn">Salvar Categoria</button>
            </form>
        </div>
    );
}
export default CategoriaCreate;