import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await api.get("/users");
        setUsers(response.data);
    };

    useEffect(() => { fetchUsers(); }, []);

    return (
        <div className="container">
            <h1>Lista de Usuários</h1>
            <Link to="/users/create"><button className="create-btn">Novo Usuário</button></Link>
            <div className="list-grid">
                {users.map((user) => (
                    <div className="card" key={user._id}>
                        <div><strong>{user.nome}</strong><p>{user.email}</p></div>
                        <div className="actions">
                            <Link to={`/users/edit/${user._id}`}>
                                <button className="edit-btn">Editar</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default UserList;