import React, { useEffect, useState } from "react";
import api from "../services/api";

function Fornecedores() {

    const [fornecedores, setFornecedores] = useState([]);

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [contato, setContato] = useState("");

    useEffect(() => {
        listar();
    }, []);

    async function listar() {
        const response = await api.get("/fornecedores");
        setFornecedores(response.data);
    }

    async function salvar() {

        const dados = {
            nome,
            cnpj,
            endereco,
            contato
        };

        if (id === null) {
            await api.post("/fornecedores", dados);
        } else {
            await api.put(`/fornecedores/${id}`, dados);
        }

        limpar();
        listar();
    }

    function editar(fornecedor) {

        setId(fornecedor.id);
        setNome(fornecedor.nome);
        setCnpj(fornecedor.cnpj);
        setEndereco(fornecedor.endereco);
        setContato(fornecedor.contato);

    }

    async function excluir(id) {

        if (window.confirm("Deseja excluir este fornecedor?")) {

            await api.delete(`/fornecedores/${id}`);

            listar();

        }

    }

    function limpar() {

        setId(null);
        setNome("");
        setCnpj("");
        setEndereco("");
        setContato("");

    }

    return (

<div className="container mt-4">

    <div className="card shadow">

        <div className="card-header bg-primary text-white">

            <h3>🏢 Cadastro de Fornecedores</h3>

        </div>

        <div className="card-body">

            <div className="row">

                <div className="col-md-6 mb-3">

                    <label className="form-label">Nome</label>

                    <input
                        className="form-control"
                        value={nome}
                        onChange={(e)=>setNome(e.target.value)}
                    />

                </div>

                <div className="col-md-6 mb-3">

                    <label className="form-label">CNPJ</label>

                    <input
                        className="form-control"
                        value={cnpj}
                        onChange={(e)=>setCnpj(e.target.value)}
                    />

                </div>

                <div className="col-md-8 mb-3">

                    <label className="form-label">Endereço</label>

                    <input
                        className="form-control"
                        value={endereco}
                        onChange={(e)=>setEndereco(e.target.value)}
                    />

                </div>

                <div className="col-md-4 mb-3">

                    <label className="form-label">Contato</label>

                    <input
                        className="form-control"
                        value={contato}
                        onChange={(e)=>setContato(e.target.value)}
                    />

                </div>

                <div className="col-12">

                    <button
                        className="btn btn-success me-2"
                        onClick={salvar}
                    >
                        💾 Salvar
                    </button>

                    <button
                        className="btn btn-secondary"
                        onClick={limpar}
                    >
                        Limpar
                    </button>

                </div>

            </div>

        </div>

    </div>

    <div className="card shadow mt-4">

        <div className="card-header bg-dark text-white">

            <h4>Lista de Fornecedores</h4>

        </div>

        <div className="card-body">

            <table className="table table-striped table-hover align-middle">

                <thead className="table-primary">

                    <tr>

                        <th>ID</th>
                        <th>Nome</th>
                        <th>CNPJ</th>
                        <th>Endereço</th>
                        <th>Contato</th>
                        <th width="180">Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {fornecedores.map((fornecedor)=>(

                        <tr key={fornecedor.id}>

                            <td>{fornecedor.id}</td>

                            <td>{fornecedor.nome}</td>

                            <td>{fornecedor.cnpj}</td>

                            <td>{fornecedor.endereco}</td>

                            <td>{fornecedor.contato}</td>

                            <td>

                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={()=>editar(fornecedor)}
                                >
                                    ✏ Editar
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={()=>excluir(fornecedor.id)}
                                >
                                    🗑 Excluir
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </div>

</div>

    );

}

export default Fornecedores;