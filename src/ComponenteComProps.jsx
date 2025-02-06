import React from "react"; // Aqui importamos os react para as demais funções serer acolhidas por ele.

// Aqui é o corpo do componente, tambem presente suas ações.
function ComponenteComProps(props){
    return <h1>Sou o Componente que usa props! Olá, {props.nome}!</h1> 
}

// Aqui é onde possibilita o componente ser usado em outros arquivo. Veja no App.jsx como ele é importado.
export default ComponenteComProps;
