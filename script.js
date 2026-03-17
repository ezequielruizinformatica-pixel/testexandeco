let registros = JSON.parse(localStorage.getItem("registros")) || [];

/* FUNCIONÁRIOS PARA LOGIN */

let funcionarios = [

{usuario:"Alexandre", senha:"123", nome:"Alexandre Ferreira do Nascimento"},
{usuario:"Roseane", senha:"123", nome:"Roseane Bastos Ferreira"}

];


/* LOGIN */

function login(){

let usuario = document.getElementById("usuario").value;
let senha = document.getElementById("senha").value;

let funcionario = funcionarios.find(f => f.usuario === usuario && f.senha === senha);

if(funcionario){

localStorage.setItem("usuarioLogado", funcionario.nome);

window.location.href = "index.html";

}else{

alert("Usuário ou senha inválidos");

}

}


/* LOGOUT */

function logout(){

localStorage.removeItem("usuarioLogado");

window.location.href="login.html";

}


/* VERIFICAR USUÁRIO LOGADO */

let usuarioLogado = localStorage.getItem("usuarioLogado");

if(!usuarioLogado){

    // se não estiver logado e não estiver na página de login
    if(!window.location.pathname.includes("login.html")){
        window.location.href = "login.html";
    }

}else{

    // mostrar nome do funcionário no painel
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


/* RENDER TABELA */

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


/* CARREGAR TABELA */

render();
