import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function LivroCreate() {
  const [formData, setFormData] = useState({
    titulo: "", autor: "", ano: "", editora: "", paginas: "", status: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // O back-end espera números em ano e páginas
      const dadosParaEnviar = {
        ...formData,
        ano: Number(formData.ano),
        paginas: Number(formData.paginas)
      };
      await api.post("/livros", dadosParaEnviar);
      alert("Livro criado!");
      navigate("/livros");
    } catch (error) {
      alert("Erro ao criar livro. Verifique os campos.");
    }
  };

  return (
    <div className="create-container">
      <h2>Criar Livro</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <input placeholder="Título" onChange={e => setFormData({...formData, titulo: e.target.value})} required />
        <input placeholder="Autor" onChange={e => setFormData({...formData, autor: e.target.value})} required />
        <input type="number" placeholder="Ano" onChange={e => setFormData({...formData, ano: e.target.value})} required />
        <input placeholder="Editora" onChange={e => setFormData({...formData, editora: e.target.value})} required />
        <input type="number" placeholder="Páginas" onChange={e => setFormData({...formData, paginas: e.target.value})} required />
        <button type="submit" className="submit-btn">Criar</button>
      </form>
    </div>
  );
}
export default LivroCreate;