let funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];
let registros = JSON.parse(localStorage.getItem("registros")) || [];

function salvar(){

localStorage.setItem("funcionarios", JSON.stringify(funcionarios));
localStorage.setItem("registros", JSON.stringify(registros));

}

function atualizarSelect(){

let select=document.getElementById("funcionarioSelect");

select.innerHTML="";

funcionarios.forEach(f=>{

let option=document.createElement("option");
option.textContent=f;

select.appendChild(option);

});

}

function adicionarFuncionario(){

let nome=document.getElementById("nomeFuncionario").value;

if(nome=="") return;

funcionarios.push(nome);

document.getElementById("nomeFuncionario").value="";

salvar();
atualizarSelect();

}

function hora(){

let d=new Date();

return d.getHours()+":"+d.getMinutes();

}

function data(){

return new Date().toLocaleDateString();

}

function registrarEntrada(){

let nome=document.getElementById("funcionarioSelect").value;

registros.push({

nome:nome,
data:data(),
entrada:hora(),
saida:""

});

salvar();
render();

}

function registrarSaida(){

let nome=document.getElementById("funcionarioSelect").value;

registros.forEach(r=>{

if(r.nome==nome && r.saida==""){

r.saida=hora();

}

});

salvar();
render();

}

function render(){

let tabela=document.getElementById("tabelaRegistros");

tabela.innerHTML="";

registros.forEach(r=>{

tabela.innerHTML+=`

<tr>

<td>${r.nome}</td>
<td>${r.data}</td>
<td>${r.entrada}</td>
<td>${r.saida}</td>

</tr>

`;

});

}

function exportarPDF(){

let doc = new jsPDF();

doc.text("Relatório de Controle de Ponto", 14, 20);

let dados = [];

registros.forEach(r => {

dados.push([
r.nome,
r.data,
r.entrada,
r.saida
]);

});

doc.autoTable({
head: [["Funcionário", "Data", "Entrada", "Saída"]],
body: dados,
startY: 30
});

doc.save("relatorio_ponto.pdf");

}
atualizarSelect();
render();
const { jsPDF } = window.jspdf;
let funcionarios = [

{usuario:"maria", senha:"123", nome:"Maria Silva"},
{usuario:"joao", senha:"123", nome:"João Santos"}

];

let registros = JSON.parse(localStorage.getItem("registros")) || [];

function login(){

let usuario = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

let funcionario = funcionarios.find(f => f.usuario === usuario && f.senha === senha);

if(funcionario){

localStorage.setItem("usuarioLogado", funcionario.nome);

window.location.href="index.html";

}else{

alert("Usuário ou senha inválidos");

}

}

function logout(){

localStorage.removeItem("usuarioLogado");

window.location.href="login.html";

}

function registrarEntrada(){

let nome = localStorage.getItem("usuarioLogado");

let registro = {

nome:nome,
data:new Date().toLocaleDateString(),
entrada:new Date().toLocaleTimeString(),
saida:""

};

registros.push(registro);

localStorage.setItem("registros", JSON.stringify(registros));

render();

}

function registrarSaida(){

let nome = localStorage.getItem("usuarioLogado");

registros.forEach(r => {

if(r.nome === nome && r.saida === ""){

r.saida = new Date().toLocaleTimeString();

}

});

localStorage.setItem("registros", JSON.stringify(registros));

render();

}

function render(){

let nome = localStorage.getItem("usuarioLogado");

document.getElementById("nomeFuncionario").innerText = "Funcionário: " + nome;

let tabela = document.getElementById("tabelaRegistros");

tabela.innerHTML="";

registros.forEach(r => {

if(r.nome === nome){

tabela.innerHTML += `

<tr>

<td>${r.data}</td>
<td>${r.entrada}</td>
<td>${r.saida}</td>

</tr>

`;

}

});

}

render();
