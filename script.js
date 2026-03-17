let funcionarios = [];
let registros = [];

function adicionarFuncionario(){

let nome=document.getElementById("nomeFuncionario").value;

if(nome=="") return;

funcionarios.push(nome);

document.getElementById("nomeFuncionario").value="";

atualizarSelect();
atualizarDashboard();

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

render();

}

function registrarSaida(){

let nome=document.getElementById("funcionarioSelect").value;

registros.forEach(r=>{

if(r.nome==nome && r.saida==""){

r.saida=hora();

}

});

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

function atualizarDashboard(){

document.getElementById("totalFuncionarios").innerText=funcionarios.length;

}

function exportarPDF(){

const { jsPDF } = window.jspdf;

let doc=new jsPDF();

doc.text("Relatório de Controle de Ponto",14,20);

let dados=[];

registros.forEach(r=>{

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
