let registros = JSON.parse(localStorage.getItem("registros")) || [];

/* FUNCIONÁRIOS */

let funcionarios = [

{
usuario:"Alexandre",
senha:"123",
nome:"Alexandre Ferreira do Nascimento",
tipo:"admin"
},

{
usuario:"Roseane",
senha:"123",
nome:"Roseane Bastos Ferreira",
tipo:"funcionario"
}

];


/* LOGIN */

function login(){

let usuario = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

let funcionario = funcionarios.find(f =>
f.usuario === usuario && f.senha === senha
);

if(funcionario){

localStorage.setItem("usuarioLogado", funcionario.nome);
localStorage.setItem("tipoUsuario", funcionario.tipo);

if(funcionario.tipo === "admin"){

window.location.href = "admin.html";

}else{

window.location.href = "funcionario.html";

}

}else{

alert("Usuário ou senha inválidos");

}

}


/* LOGOUT */

function logout(){

localStorage.removeItem("usuarioLogado");
localStorage.removeItem("tipoUsuario");

window.location.href="login.html";

}


/* VERIFICAR USUÁRIO LOGADO */

let usuarioLogado = localStorage.getItem("usuarioLogado");

if(!usuarioLogado){

if(!window.location.pathname.includes("login.html")){
window.location.href = "login.html";
}

}else{

let el = document.getElementById("usuarioLogado");

if(el){
el.innerText = "Funcionário: " + usuarioLogado;
}

}


/* REGISTRAR ENTRADA */

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


/* REGISTRAR SAÍDA */

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


/* TABELA DE REGISTROS */

function render(){

let tabela = document.getElementById("tabelaRegistros");

if(!tabela) return;

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


/* EXPORTAR PDF */

function exportarPDF(){

const { jsPDF } = window.jspdf;

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
head:[["Funcionário","Data","Entrada","Saída"]],
body:dados,
startY:30
});

doc.save("relatorio_ponto.pdf");

}


/* LIMPAR HISTÓRICO */

function limparHistorico(){

let confirmar = confirm("Tem certeza que deseja apagar todo o histórico?");

if(confirmar){

registros = [];

localStorage.setItem("registros", JSON.stringify(registros));

render();

alert("Histórico apagado com sucesso.");

}

}


/* CARREGAR TABELA */

render();
