let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
let registros = JSON.parse(localStorage.getItem("registros")) || [];

function salvar(){

localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
localStorage.setItem("registros", JSON.stringify(registros));

}

function atualizarSelect(){

let select = document.getElementById("funcionarioSelect");

select.innerHTML="";

funcionarios.forEach(f => {

let option = document.createElement("option");
option.textContent = f;

select.appendChild(option);

});

}

function adicionarFuncionario(){

let nome = document.getElementById("nomeFuncionario").value;

if(nome == "") return;

funcionarios.push(nome);

document.getElementById("nomeFuncionario").value="";

salvar();
atualizarSelect();

}

function horaAtual(){

let agora = new Date();

return agora.getHours()+":"+agora.getMinutes();

}

function dataAtual(){

return new Date().toLocaleDateString();

}

function registrarEntrada(){

let nome = document.getElementById("funcionarioSelect").value;

registros.push({

nome:nome,
data:dataAtual(),
entrada:horaAtual(),
saida:""

});

salvar();
render();

}

function registrarSaida(){

let nome = document.getElementById("funcionarioSelect").value;

for(let r of registros){

if(r.nome == nome && r.saida == ""){

r.saida = horaAtual();

}

}

salvar();
render();

}

function render(){

let tabela = document.getElementById("tabelaRegistros");

tabela.innerHTML="";

registros.forEach(r => {

tabela.innerHTML += `

<tr>

<td>${r.nome}</td>
<td>${r.data}</td>
<td>${r.entrada}</td>
<td>${r.saida}</td>

</tr>

`;

});

}

atualizarSelect();
render();
