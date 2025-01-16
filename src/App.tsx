/*
0. TODO: Registrar los puntos (victorias y derrotas)
1. TODO: Multijugador Competitivo: tener un tablero propio, y al lado mostrando al competidor.
2. TODO: Multijugador Cooperativo: tener un tablero compartido.
*/

import "./App.css";
import Grid from "./components/Grid";
import Header from "./components/Header";

function App() {
  return (
    <main>
      <Header />
      <Grid />
    </main>
  );
}

export default App;
