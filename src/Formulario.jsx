import React from "react"; // 🔹 Importa o React
import { useState } from "react"; // 🔹 Hook para gerenciar estados
import PropTypes from "prop-types"; // 🔹 Biblioteca para validar props

// 🔹 Componente do formulário que recebe a função `onUsuarioAdicionado` como prop
function Formulario({ onUsuarioAdicionado }) {
  // 🔹 Estados locais para armazenar os valores digitados nos inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  // 🔹 Função chamada quando o formulário é enviado
  function handleSubmit(e) {
    e.preventDefault(); // 🔹 Evita o recarregamento da página

    // 🔹 Envia os dados para o backend via API
    fetch("https://ribacki-react.onrender.com/usuarios", {
      method: "POST", // 🔹 Método HTTP POST para enviar dados
      headers: { "Content-Type": "application/json" }, // 🔹 Define o tipo do corpo da requisição
      body: JSON.stringify({ nome, email }), // 🔹 Converte os valores para JSON antes de enviar
    })
      .then((res) => res.json()) // 🔹 Converte a resposta para JSON
      .then((data) => {
        setNome(""); // 🔹 Limpa o campo "nome"
        setEmail(""); // 🔹 Limpa o campo "email"
        if (onUsuarioAdicionado) onUsuarioAdicionado(data); // 🔹 Atualiza a lista no App
      })
      .catch((error) => console.error("Erro ao cadastrar usuário:", error)); // 🔹 Exibe erro no console
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Usuário</h2>
      {/* 🔹 Campo de entrada para o nome */}
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      {/* 🔹 Campo de entrada para o email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {/* 🔹 Botão para cadastrar */}
      <button type="submit">Cadastrar</button>
    </form>
  );
}

// 🔹 Validação das props recebidas pelo componente
Formulario.propTypes = {
  onUsuarioAdicionado: PropTypes.func.isRequired, // 🔹 Garante que é uma função obrigatória
};

export default Formulario;
