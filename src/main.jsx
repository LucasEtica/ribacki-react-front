import React from "react"; // 🔹 Importa o React
import ReactDOM from "react-dom/client"; // 🔹 Importa a API para renderizar no DOM
import App from "./App"; // 🔹 Importa o componente principal

// 🔹 Garante que o elemento "root" existe antes de tentar renderizar
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Elemento #root não encontrado no index.html");
}

// 🔹 Renderiza o App dentro do elemento "root"
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
