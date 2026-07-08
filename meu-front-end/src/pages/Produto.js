import React, { useEffect, useState } from "react";
import api from "../services/api";

function Produtos() {

    const [produtos, setProdutos] = useState([]);

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [codigo_barras, setCodigoBarras] = useState("");

    useEffect(() => {
        listar();
    }, []);

    async function listar() {
        const response = await api.get("/produtos");
        setProdutos(response.data);
    }

    async function salvar() {

        const dados = {
            nome,
            descricao,
            preco,
            codigo_barras
        };

        if (id == null) {

            await api.post("/produtos", dados);

        } else {

            await api.put(`/produtos/${id}`, dados);

        }

        limpar();
        listar();
    }

    function editar(produto) {

        setId(produto.id);
        setNome(produto.nome);
        setDescricao(produto.descricao);
        setPreco(produto.preco);
        setCodigoBarras(produto.codigo_barras);

    }

    async function excluir(id) {

        if(window.confirm("Deseja excluir?")){

            await api.delete(`/produtos/${id}`);

            listar();

        }

    }

    function limpar(){

        setId(null);
        setNome("");
        setDescricao("");
        setPreco("");
        setCodigoBarras("");

    }

    return (

<div className="container mt-4">

<div className="card shadow">

<div className="card-header bg-primary text-white">

<h3>📦 Cadastro de Produtos</h3>

</div>

<div className="card-body">

<div className="row">

<div className="col-md-6 mb-3">

<label>Nome</label>

<input
className="form-control"
value={nome}
onChange={(e)=>setNome(e.target.value)}
/>

</div>

<div className="col-md-6 mb-3">

<label>Descrição</label>

<input
className="form-control"
value={descricao}
onChange={(e)=>setDescricao(e.target.value)}
/>

</div>

<div className="col-md-3 mb-3">

<label>Preço</label>

<input
className="form-control"
type="number"
value={preco}
onChange={(e)=>setPreco(e.target.value)}
/>

</div>

<div className="col-md-5 mb-3">

<label>Código de Barras</label>

<input
className="form-control"
value={codigo_barras}
onChange={(e)=>setCodigoBarras(e.target.value)}
/>

</div>

<div className="col-md-4 d-flex align-items-end">

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

<h4>Lista de Produtos</h4>

</div>

<div className="card-body">

<table className="table table-striped table-hover">

<thead className="table-primary">

<tr>

<th>ID</th>

<th>Nome</th>

<th>Descrição</th>

<th>Preço</th>

<th>Código</th>

<th width="160">Ações</th>

</tr>

</thead>

<tbody>

{produtos.map(produto=>(

<tr key={produto.id}>

<td>{produto.id}</td>

<td>{produto.nome}</td>

<td>{produto.descricao}</td>

<td>

R$

{Number(produto.preco).toFixed(2)}

</td>

<td>{produto.codigo_barras}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>editar(produto)}
>

✏ Editar

</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>excluir(produto.id)}
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

export default Produtos;