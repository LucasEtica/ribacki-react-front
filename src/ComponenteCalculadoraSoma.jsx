import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔹 Para voltar à página inicial

function ComponenteCalculadoraSoma() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState(null);
  const navigate = useNavigate(); // 🔹 Permite voltar para a tela principal

  function calcularSoma() {
    setResultado(Number(num1) + Number(num2));
  }

  async function calcularSoma() { // async → Essa palavra-chave transforma a função em assíncrona, permitindo o uso de await dentro dela.
    const soma = Number(num1) + Number(num2);
    setResultado(soma);

    // Enviar para o backend (salvar no histórico)
    try {
      // fetch("http://localhost:5000/historico", { ... }) → Faz uma requisição HTTP POST para o backend.
      // headers: { "Content-Type": "application/json" } → Indica que os dados serão enviados no formato JSON.
      // await → Espera o servidor responder antes de continuar.
      const response = await fetch("https://ribacki-react.onrender.com/historico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ numero1: num1, numero2: num2, resultado: soma }),
      });

      // response.ok → Verifica se a requisição foi bem-sucedida.
      if (!response.ok) throw new Error("Erro ao salvar no histórico!"); 

      console.log("Cálculo salvo no histórico!");
    } catch (error) { // Se qualquer erro ocorrer (exemplo: backend fora do ar), ele será capturado e exibido no console.
      console.error("Erro:", error);
    }
  }
  

  function limpar() {
    setNum1("");
    setNum2("");
    setResultado(null);
  }

  return (
    <div style={styles.container}>
      <h1>Componente calculadora soma!</h1>
      <input
        type="number"
        placeholder="Digite o primeiro número"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Digite o segundo número"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={styles.input}
      />
      <button onClick={calcularSoma} style={styles.button}>Calcular</button>
      <button onClick={limpar} style={styles.button}>Limpar</button>
      {resultado !== null && <h2>Resultado: {resultado}</h2>}

      {/* 🔹 Botão para acessar o histórico */}
      <button onClick={() => navigate("/historico")} style={styles.buttonHistorico}>
        Ver Histórico
      </button>

      {/* 🔹 Botão para voltar para a página principal */}
      <button onClick={() => navigate("/")} style={styles.buttonVoltar}>Voltar</button>
    </div>
  );
}

// 🔹 Estilos simples para o componente
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  input: {
    margin: "10px",
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    margin: "5px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
  buttonVoltar: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "red",
    color: "white",
    cursor: "pointer",
  },
  buttonHistorico: {
    marginTop: "20px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "blue",
    color: "white",
    cursor: "pointer",
  },
};

export default ComponenteCalculadoraSoma;

/*
  Proximo passo irei fazer as seguintes alterações:
  - Criar uma tabela historico no PostgreSQL para armazenar os cálculos.
    #> psql -U ribacki -d ribacki_react_dev

    CREATE TABLE historico (
      id SERIAL PRIMARY KEY,
      numero1 DECIMAL(10,2) NOT NULL,
      numero2 DECIMAL(10,2) NOT NULL,
      resultado DECIMAL(10,2) NOT NULL,
      data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

     O que essa tabela faz?
      ✔ id SERIAL PRIMARY KEY → ID único para cada operação.
      ✔ numero1 e numero2 → Os números usados no cálculo.
      ✔ resultado → O resultado da soma.
      ✔ data_hora → Data e hora da operação (preenchido automaticamente).

    Pode testar com:
      #> SELECT * FROM historico;
------------------------------------------------------------------------------
  - Modificar a calculadora para enviar os cálculos para o backend.

  - Criar uma API no backend para salvar e listar o histórico.
  - Criar uma nova página no frontend (/historico) para exibir os cálculos.
  - Adicionar um botão na calculadora para acessar o histórico.
  - Permitir excluir cálculos do histórico.
*/

/* Comandos pertinentes que usei para testar a calculador no terminal mesmo!!!
  // Faz o cadastro de um historico!
  curl -X POST http://localhost:5000/historico \
  -H "Content-Type: application/json" \
  -d '{"numero1": 10, "numero2": 5, "resultado": 15}'

  // Puxa todos os historicos
  curl -X GET http://localhost:5000/historico 
*/
