import React from "react"; // 🔹 Importa o React
import { useState, useEffect } from "react"; // 🔹 Hooks para estado e efeito
import Formulario from "./Formulario"; // 🔹 Importa o formulário
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; // Aqui é onde usaremos as rotas para separar as interfaces. npm install react-router-dom

import ComponenteCalculadoraSoma from "./ComponenteCalculadoraSoma";
import Historico from "./Historico"; // 🔹 Importando a nova página

import ComponenteSimples from "./ComponenteSimples"; // Aqui ele "puxa" o export default do componente e possibilita ser usado, veja mais embaixo como ele é usado.
import ComponenteComProps from "./ComponenteComProps"; // Outro componente para testes, aqui utilizamos o props para seu conhecimento.
import ComponenteComUseState from "./ComponenteComUseState"; // importa outro componente.

function App() {
  console.log("🚀 App.jsx foi carregado!"); // 🔹 Mensagem para verificar se o App carregou

  // 🔹 Estado para armazenar a lista de usuários
  const [usuarios, setUsuarios] = useState([]);

  // 🔹 Busca os usuários do backend quando o componente é montado
  useEffect(() => {
    fetch("https://ribacki-react.onrender.com/usuarios") // 🔹 Faz a requisição GET para listar os usuários
      .then((res) => res.json()) // 🔹 Converte a resposta para JSON
      .then((data) => setUsuarios(data)) // 🔹 Atualiza o estado com os usuários recebidos
      .catch((error) => console.error("Erro ao buscar usuários:", error)); // 🔹 Captura erros na requisição
  }, []); // 🔹 O array vazio garante que a requisição acontece apenas uma vez (quando o componente monta)

  // 🔹 Função que adiciona um novo usuário à lista sem precisar recarregar a página
  function atualizarLista(usuario) {
    setUsuarios([...usuarios, usuario]);
  }

  function excluirUsuario(id) {
    fetch(`https://ribacki-react.onrender.com/usuarios/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        setUsuarios(usuarios.filter((user) => user.id !== id)); // Atualiza a lista
      })
      .catch((error) => console.error("Erro ao excluir usuário:", error));
  }

  return (
    <Router> {/* Define o escopo da navegação pelas rotas do react */}
      <Routes> {/* Rotas da aplicação */}
        {/* O Route define o link em que cada pagina erá acessar e seu conteudo. */}
        {/* Página principal */}
        <Route path="/" element={ 
          <div style={styles.container}>
            <div>

              <ComponenteSimples /> {/* O mesmo nome que esta no import no comço do arquivo é chamado aqui*/}
              <ComponenteComProps nome="Lucas" /> {/* Aqui passamos um parametro fixo para utilizar o props.*/}
              <ComponenteComUseState /> {/* Faz a importação normal do contador, sem ter ele em ciatado, toda lógica ocorre no componente. */}
              <br />
              <h1>Cadastro de Usuários</h1>
              <Formulario onUsuarioAdicionado={atualizarLista} /> {/* 🔹 Chama o formulário e passa a função como prop */}
              <h2>Lista de Usuários</h2>
              <ul>
                {usuarios.map((user) => (
                  <li key={user.id}>
                    {user.nome} - {user.email}
                    <button onClick={() => excluirUsuario(user.id)}>❌ Excluir</button>
                  </li>
                ))}
              </ul>
            </div>
            {/* O Link é a ponte para a troca das rotas, ele é igual ao link_to, indicando a rota e consequentemente o elemento. */}
            <Link to="/calculadora"> 
              <button style={styles.button}>Acessar Calculadora</button>
            </Link>
          </div>
        } />

        {/* 🔹 Página da Calculadora */}
        <Route path="/calculadora" element={<ComponenteCalculadoraSoma />} />
        
        {/* 🔹 Página do Histórico */}
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
    
  );
}

  // 🔹 Estilos simples
const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
  },
  button: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default App;
