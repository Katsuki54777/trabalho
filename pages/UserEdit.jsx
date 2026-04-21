import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css"

function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/users");
                const user = response.data.find((u) => u._id === id);

                if (user) 
                {
                    setName(user.nome);
                    setEmail(user.email);
                }
            } catch (error) {
                console.error("Erro ao carregar usuário: ", error);
            }
        };
        fetchUser();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/users/${id}`,
                {
                    nome: name,
                    email: email,
                    senha: password,
                });

                alert("Usuário atualizado com sucesso!");
                navigate("/");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar usuário");
        }
    }

    return (
        <div className="create-container">
            <h2>Editar Usuário</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome:</label>
                    <input type="text"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Email:</label>
                    <input type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>

                <div className="form-row">
                    <label>Nova Senha:</label>
                    <input type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>

                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    )
}

export default UserEdit;