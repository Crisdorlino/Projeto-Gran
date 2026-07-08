import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Produto from "./pages/Produto";
import Fornecedor from "./pages/Fornecedor";
import ProdutoFornecedor from "./pages/ProdutoFornecedor";

function App() {
  return (
    <BrowserRouter>

      <nav
        style={{
          background: "#1976d2",
          padding: "15px"
        }}
      >

        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Produtos
        </Link>

        <Link
          to="/fornecedores"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Fornecedores
        </Link>

        <Link
          to="/associacao"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Associação
        </Link>

      </nav>

      <Routes>

        <Route
          path="/"
          element={<Produto />}
        />

        <Route
          path="/fornecedores"
          element={<Fornecedor />}
        />

        <Route
          path="/associacao"
          element={<ProdutoFornecedor />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;