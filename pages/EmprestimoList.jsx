import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function EmprestimoList() {
    const [emprestimos, setEmprestimos] = useState([]);

    const carregarEmprestimos = () => {
        api.get("/emprestimos")
            .then(res => setEmprestimos(res.data))
            .catch(() => alert("Erro ao buscar empréstimos."));
    };

    useEffect(() => {
        carregarEmprestimos();
    }, []);

    const excluir = async (id) => {
        if (window.confirm("Deseja realmente excluir este registro?")) {
            try {
                await api.delete(`/emprestimos/${id}`);
                carregarEmprestimos();
            } catch {
                alert("Erro ao excluir.");
            }
        }
    };

    return (
        <div className="container" style={{ padding: '20px' }}>
            <h1>Lista de Empréstimos</h1>
            
            <Link to="/emprestimos/create">
                <button className="create-btn" style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                    + Novo Empréstimo
                </button>
            </Link>

           
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Livro</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Usuário</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Status</th>
                        <th style={{ padding: '12px', borderBottom: '2px solid #ddd', textAlign: 'center' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {emprestimos.length === 0 ? (
                        <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center' }}>Nenhum empréstimo encontrado.</td></tr>
                    ) : (
                        emprestimos.map(e => (
                            <tr key={e._id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px' }}>{e.livro?.titulo || "N/A"}</td>
                                <td style={{ padding: '12px' }}>{e.usuario?.nome || "N/A"}</td>
                                <td style={{ padding: '12px' }}>
                                    
                                    <span style={{ 
                                        color: e.status ? 'green' : 'orange', 
                                        fontWeight: 'bold',
                                        backgroundColor: e.status ? '#e6fffa' : '#fffaf0',
                                        padding: '4px 8px',
                                        borderRadius: '4px'
                                    }}>
                                        {e.status ? "✅ Devolvido" : "⏳ Pendente"}
                                    </span>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                              
                                    <Link to={`/emprestimos/edit/${e._id}`}>
                                        <button style={{ 
                                            marginRight: '8px', 
                                            padding: '6px 12px', 
                                            backgroundColor: '#4A90E2', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}>
                                            Editar
                                        </button>
                                    </Link>
                                    
                                  
                                    <button 
                                        onClick={() => excluir(e._id)} 
                                        style={{ 
                                            padding: '6px 12px', 
                                            backgroundColor: '#FF4D4D', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
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

export default EmprestimoList;