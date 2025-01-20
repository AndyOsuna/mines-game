/*
0. TODO: Registrar los puntos (victorias y derrotas)
1. TODO: Multijugador Competitivo: tener un tablero propio, y al lado mostrando al competidor.
2. TODO: Multijugador Cooperativo: tener un tablero compartido.
*/

import { Link, Route, Switch } from "wouter";
import "./App.css";
import Grid from "./components/Grid";
import Grid2 from "./components/Grid2";
import Header from "./components/Header";

function App() {
  return (
    <main>
      <nav className="nav">
        <Link className="link" href="/">
          Home
        </Link>
        <Link className="link" href="/new">
          New
        </Link>
      </nav>
      <Switch>
        <Route
          path="/"
          component={() => (
            <>
              <Header />
              <Grid />
            </>
          )}
        />
        <Route path="/new" component={() => <Grid2 />} />
      </Switch>
    </main>
  );
}

export default App;
