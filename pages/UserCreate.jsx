import { useState } from "react";
import api from "../services/api";
import "../styles/form.css"

function UserCreate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post("/users", {
                nome: name,
                email: email,
                senha: password,
            })

            console.log("Resposta da API:", response.data)

            setName("");
            setEmail("");
            setPassword("");
            alert("Usuário criado com sucesso");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao criar usuário.")
        }
    }

    return (
        <div className="create-container">
            <h2>Criar Usuário</h2>
            
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome</label>
                    <input type="text"
                    value={name}
                    onChange={(e) =>setName(e.target.value)}
                    required
                    />
                </div>

                <div className="form-row">
                    <label>Email</label>
                    <input type="email"
                    value={email}
                    onChange={(e) =>setEmail(e.target.value)}
                    required
                    />
                </div>

                <div className="form-row">
                    <label>Senha</label>
                    <input type="password"
                    value={password}
                    onChange={(e) =>setPassword(e.target.value)}
                    required
                    />
                </div>

                <div className="form-row button-row">
                    <button type="submit">Criar</button>
                </div>
                
            </form>
        </div>
    );
}

export default UserCreate;