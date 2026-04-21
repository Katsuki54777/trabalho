import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";
import CategoriaList from "./pages/CategoriaList";
import CategoriaCreate from "./pages/CategoriaCreate";
import CategoriaEdit from "./pages/CategoriaEdit";
import LivroList from "./pages/LivroList";
import LivroCreate from "./pages/LivroCreate";
import LivroEdit from "./pages/LivroEdit";
import EmprestimoList from "./pages/EmprestimoList";
import EmprestimoCreate from "./pages/EmprestimoCreate";
import EmprestimoEdit from "./pages/EmprestimoEdit";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/users">Usuários</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/livros">Livros</Link>
        <Link to="/emprestimos">Empréstimos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" />} />

        <Route path="/users" element={<UserList />} />
        <Route path="/users/create" element={<UserCreate />} />
        <Route path="/users/edit/:id" element={<UserEdit />} />

        
        <Route path="/categorias" element={<CategoriaList />} />
        <Route path="/categorias/create" element={<CategoriaCreate />} />
        <Route path="/categorias/edit/:id" element={<CategoriaEdit />} />

       
        <Route path="/livros" element={<LivroList />} />
        <Route path="/livros/create" element={<LivroCreate />} />
        <Route path="/livros/edit/:id" element={<LivroEdit />} />

       
        <Route path="/emprestimos" element={<EmprestimoList />} />
        <Route path="/emprestimos/create" element={<EmprestimoCreate />} />
        <Route path="/emprestimos/edit/:id" element={<EmprestimoEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;