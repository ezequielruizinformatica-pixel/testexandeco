let alunos = [];

function adicionarAluno(){

let nome = document.getElementById("nomeAluno").value;

if(nome === "") return;

alunos.push({
nome:nome,
pontos:0
});

document.getElementById("nomeAluno").value="";

render();
}

function adicionarPonto(index){

alunos[index].pontos++;

render();

}

function removerPonto(index){

alunos[index].pontos--;

render();

}

function render(){

let tabela = document.getElementById("listaAlunos");

tabela.innerHTML="";

alunos.sort((a,b)=> b.pontos - a.pontos);

alunos.forEach((aluno,index)=>{

tabela.innerHTML += `
<tr>
<td>${aluno.nome}</td>
<td>${aluno.pontos}</td>

<td>
<button onclick="adicionarPonto(${index})">+1</button>
<button onclick="removerPonto(${index})">-1</button>
</td>

</tr>
`;

});

}
