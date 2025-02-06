import React, { useState } from "react"; // Aqui importamos alem do react, o useState

// Aqui é o corpo do componente, tambem presente suas ações.
function ComponenteComUseState(){

    const [contador, setContador] = useState(0); // Inicia com zero

    return (
        <div>
            <h1>Sou o Componente usando o useState!</h1> 
            <h2>Contador: {contador}</h2> {/* Aqui temos a variavel criada acima */}
            <button onClick={() => setContador(contador + 1)}>Aumentar</button> {/* Podemos notar o 'set'Contador é usado para alterar a outra variavel. */}
        </div>
    ) 
        
}

// Aqui é onde possibilita o componente ser usado em outros arquivo. Veja no App.jsx como ele é importado.
export default ComponenteComUseState;
