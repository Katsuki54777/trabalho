import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function EmprestimoCreate() {
    const [livroId, setLivroId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [livros, setLivros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/livros").then(res => setLivros(res.data));
        api.get("/users").then(res => setUsuarios(res.data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/emprestimos", { livroId, usuarioId });
            alert("Empréstimo realizado!");
            navigate("/emprestimos");
        } catch {
            alert("Erro ao criar empréstimo. Verifique se selecionou Livro e Usuário.");
        }
    };

    return (
        <div className="container">
            <h2>Registrar Empréstimo</h2>
            <form onSubmit={handleSubmit}>
                <label>Selecione o Livro:</label>
                <select onChange={e => setLivroId(e.target.value)} required value={livroId}>
                    <option value="">-- Escolha --</option>
                    {livros.map(l => <option key={l._id} value={l._id}>{l.titulo}</option>)}
                </select>

                <label>Selecione o Usuário:</label>
                <select onChange={e => setUsuarioId(e.target.value)} required value={usuarioId}>
                    <option value="">-- Escolha --</option>
                    {usuarios.map(u => <option key={u._id} value={u._id}>{u.nome}</option>)}
                </select>

                <button type="submit" className="submit-btn">Confirmar Empréstimo</button>
            </form>
        </div>
    );
}

export default EmprestimoCreate;