import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css"


function EmprestimoEdit() {
    const [livroId, setLivroId] = useState("");
    const [usuarioId, setUsuarioId] = useState("");
    const [dataEmprestimo, setDataEmprestimo] = useState("");
    const [dataDevolucao, setDataDevolucao] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put("/emprestimos", {
                livroId: livroId,
                usuarioId: usuarioId,
                dataEmprestimo: dataEmprestimo,
                dataDevolucao: dataDevolucao,
            });
            console.log("Resposta da API:", response.data);
            setLivroId("");
            setUsuarioId("");
            setDataEmprestimo("");
            setDataDevolucao("");
            alert("Empréstimo editado com sucesso");
        }
        catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao editar empréstimo.");
        }
    };

    return (
        <div className="create-container">
            <h2>Editar Empréstimo</h2>
            <form className="create-form" onSubmit={handleSubmit}>
             <div className="form-row">
              <label>ID do Livro</label>
              <input
                type="text"value={livroId} onChange={(e) => setLivroId(e.target.value)} required
              /> 
                </div>
                <div className="form-row">     
                 <label>ID do Usuário</label>
                    <input
                        type="text"value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)} required
                    />
                </div>
                <div className="form-row">
                    <label>Data do Empréstimo</label>
                    <input
                        type="date"value={dataEmprestimo} onChange={(e) => setDataEmprestimo(e.target.value)} required
                    />
                </div>
                <div className="form-row">
                    <label>Data da Devolução</label>
                    <input
                        type="date"value={dataDevolucao} onChange={(e) => setDataDevolucao(e.target.value)} required
                    />
                </div>
                <button type="submit">Editar Empréstimo</button>
            </form>
        </div>
    );
}

export default EmprestimoEdit;