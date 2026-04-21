import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function CategoriaEdit() {
    const { id } = useParams();
    const [genero, setGenero] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/categorias`).then(res => {
            const cat = res.data.find(c => c._id === id);
            if (cat) setGenero(cat.genero);
        });
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/categorias/${id}`, { genero });
            alert("Gênero atualizado!");
            navigate("/categorias");
        } catch {
            alert("Erro ao atualizar categoria.");
        }
    };

    return (
        <div className="container">
            <h2>Editar Gênero</h2>
            <form onSubmit={handleUpdate} className="create-form">
                <label>Nome do Gênero</label>
                <input 
                    type="text" 
                    value={genero} 
                    onChange={e => setGenero(e.target.value)} 
                    required 
                />
                <button type="submit" className="submit-btn">Salvar Alterações</button>
            </form>
        </div>
    );
}

export default CategoriaEdit;