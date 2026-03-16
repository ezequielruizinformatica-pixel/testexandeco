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

function gerarRelatorio(){

let mesAtual=new Date().getMonth()+1;

let relatorio=registros.filter(r=>{

let partes=r.data.split("/");

return parseInt(partes[1])==mesAtual;

});

alert("Registros deste mês: "+relatorio.length);

}

function exportarPDF(){

const { jsPDF } = window.jspdf;

let doc=new jsPDF();

doc.text("Relatório de Ponto - Escola",20,20);

let y=40;

registros.forEach(r=>{

doc.text(

`${r.nome} | ${r.data} | Entrada: ${r.entrada} | Saída: ${r.saida}`,

20,y

);

y+=10;

});

doc.save("relatorio_ponto.pdf");

}

atualizarSelect();
render();
