import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Historico() {
  const [historico, setHistorico] = useState([]); // 🔹 Estado para armazenar o histórico
  const navigate = useNavigate(); // 🔹 Permite voltar para a calculadora

  const API_URL = import.meta.env.VITE_API_URL; // Pega a variavel do .env do front para facilitar os testes

  // Buscar o histórico do backend quando a página carregar
  useEffect(() => {
    async function carregarHistorico() {
      try {
      // http://localhost:5000
      // https://ribacki-react.onrender.com
        const response = await fetch(`${API_URL}/historico`);
        const data = await response.json();
        setHistorico(data);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      }
    }

    carregarHistorico();
  }, []);

  // 🔹 Função para excluir um cálculo do histórico
  async function excluirCalculo(id) {
    try {
      // http://localhost:5000
      // https://ribacki-react.onrender.com
      const response = await fetch(`${API_URL}/historico/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao excluir cálculo!");

      // 🔹 Atualiza o estado removendo o cálculo excluído
      setHistorico(historico.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao excluir cálculo:", error);
    }
  }

  return (
    <div style={styles.container}>
      <h1>📜 Histórico de Cálculos</h1>

      {historico.length === 0 ? (
        <p>Nenhum cálculo encontrado.</p>
      ) : (
        <ul style={styles.lista}>
          {historico.map((item) => (
            <li key={item.id} style={styles.item}>
              {item.numero1} + {item.numero2} = {item.resultado} <br />
              <small>📅 {new Date(item.data_hora).toLocaleString()}</small>
              <button onClick={() => excluirCalculo(item.id)} style={styles.botaoExcluir}>❌ Excluir</button>
            </li>
          ))}
        </ul>
      )}

      {/* 🔹 Botão para voltar à calculadora */}
      <button onClick={() => navigate("/calculadora")} style={styles.botaoVoltar}>
        🔙 Voltar para Calculadora
      </button>
    </div>
  );
}

// 🔹 Estilos simples para a página
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  lista: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  botaoExcluir: {
    marginLeft: "10px",
    padding: "5px",
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
  },
  botaoVoltar: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  },
};

export default Historico;
