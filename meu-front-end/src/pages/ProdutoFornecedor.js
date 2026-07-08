import React, { useEffect, useState } from "react";
import api from "../services/api";

function ProdutoFornecedor() {

  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);

  const [produtoId, setProdutoId] = useState("");
  const [fornecedorId, setFornecedorId] = useState("");

  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    carregarProdutos();
    carregarFornecedores();
  }, []);

  async function carregarProdutos() {
    const response = await api.get("/produtos");
    setProdutos(response.data);
  }

  async function carregarFornecedores() {
    const response = await api.get("/fornecedores");
    setFornecedores(response.data);
  }

  async function associar() {

    if (!produtoId || !fornecedorId) {
      alert("Selecione um produto e um fornecedor.");
      return;
    }

    await api.post("/associacao", {
      produtoId: Number(produtoId),
      fornecedorId: Number(fornecedorId)
    });

    alert("Associação realizada com sucesso!");
  }

  async function listarProdutosFornecedor() {

    if (!fornecedorId) return;

    const response = await api.get(
      `/associacao/fornecedor/${fornecedorId}/produtos`
    );

    setResultado(response.data);
  }

  async function listarFornecedoresProduto() {

    if (!produtoId) return;

    const response = await api.get(
      `/associacao/produto/${produtoId}/fornecedores`
    );

    setResultado(response.data);
  }

  return (

    <div className="container mt-5">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3 className="mb-0">
            Associação Produto / Fornecedor
          </h3>

        </div>

        <div className="card-body">

          <div className="row">

            <div className="col-md-6">

              <label className="form-label">
                Produto
              </label>

              <select
                className="form-select"
                value={produtoId}
                onChange={(e) => setProdutoId(e.target.value)}
              >

                <option value="">Selecione</option>

                {produtos.map(produto => (

                  <option
                    key={produto.id}
                    value={produto.id}
                  >
                    {produto.nome}
                  </option>

                ))}

              </select>

            </div>

            <div className="col-md-6">

              <label className="form-label">
                Fornecedor
              </label>

              <select
                className="form-select"
                value={fornecedorId}
                onChange={(e) => setFornecedorId(e.target.value)}
              >

                <option value="">Selecione</option>

                {fornecedores.map(fornecedor => (

                  <option
                    key={fornecedor.id}
                    value={fornecedor.id}
                  >
                    {fornecedor.nome}
                  </option>

                ))}

              </select>

            </div>

          </div>

          <div className="mt-4 d-flex gap-2">

            <button
              className="btn btn-success"
              onClick={associar}
            >
              Associar
            </button>

            <button
              className="btn btn-primary"
              onClick={listarProdutosFornecedor}
            >
              Produtos do Fornecedor
            </button>

            <button
              className="btn btn-warning"
              onClick={listarFornecedoresProduto}
            >
              Fornecedores do Produto
            </button>

          </div>

        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header bg-dark text-white">

          Resultado

        </div>

        <div className="card-body">

          {resultado.length === 0 ? (

            <p className="text-muted">
              Nenhum resultado encontrado.
            </p>

          ) : (

            <table className="table table-striped table-hover">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Nome</th>

                </tr>

              </thead>

              <tbody>

                {resultado.map(item => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.nome}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </div>

  );

}

export default ProdutoFornecedor;