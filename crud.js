document.querySelector("#salvar").addEventListener("click", cadastrar)


let lista_tarefas = []


window.addEventListener("load", () => {
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  atualizar()
  
})

document.querySelector("#pendentes").addEventListener("click", ()=>{
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  atualizar()
  lista_tarefas=lista_tarefas.filter(tarefa => tarefa.concluida==false)
  atualizar()
})


document.querySelector("#busca").addEventListener("keyup", ()=>{
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  atualizar()
  const titulo = document.querySelector("#busca").value
  lista_tarefas=lista_tarefas.filter(tarefa => tarefa.titulo.includes(titulo))
  atualizar()
})

document.querySelector("#concluidas").addEventListener("click", ()=>{
  lista_tarefas = JSON.parse(localStorage.getItem("lista_tarefas")) || []
  atualizar()
  lista_tarefas=lista_tarefas.filter(tarefa => tarefa.concluida==true)
  atualizar()
})



function cadastrar() {
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))
    let titulo = document.querySelector("#titulo").value
    let descricao = document.querySelector("#descricao").value
    let pontos = document.querySelector("#pontos").value
    let categoria = document.querySelector("#categoria").value
    let cota = document.querySelector("#cota").value
    let qtd = document.querySelector("#qtd").value
    const tarefa = {
      
        id: Date.now(),
        titulo,
        descricao,
        pontos,
        categoria,
        cota,
        qtd,
        concluida:false
    }
    if (tarefa.titulo.length == 0 ){
      document.querySelector("#titulo").classList.add("is-invalid")
      return
    }
    lista_tarefas.push(tarefa)
    document.querySelector("#tarefas").innerHTML += gerarCard(tarefa)
    document.querySelector("#titulo").value=""
    document.querySelector("#descricao").value=""
    salvar()
    modal.hide()
}

function atualizar(){
  document.querySelector("#tarefas").innerHTML = ""
  lista_tarefas.forEach((tarefa)=> {
    document.querySelector("#tarefas").innerHTML += gerarCard(tarefa)
  })
}


function salvar(){

  localStorage.setItem("lista_tarefas", JSON.stringify(lista_tarefas))

}
function apagar(id){
  lista_tarefas=lista_tarefas.filter((tarefa) => {
    return tarefa.id != id
   
  }) //arrow function
  salvar()
  atualizar()
}

function concluir(id){
  let tarefa_encontrada=lista_tarefas.find((tarefa) => {
    return tarefa.id == id
  })
  tarefa_encontrada.concluida = true
  salvar()
  atualizar()
}

function gerarCard(tarefa) {
  const disabled = (tarefa.concluida) ? "disabled" : ""
    return `<div class="col-12 col-md-6 col-lg-3">
    <div class="card">
    <div class="card-header">
      ${tarefa.titulo}
    </div>
    <div class="card-body">
      <p class="card-text"> Data: ${tarefa.descricao}</p>
      <p>
        <span class="badge text-bg-warning">${tarefa.categoria}</span>
      </p>
      <p> Valor investido: R$${tarefa.pontos}</p>
      <p> Valor da cota: R$${tarefa.cota} </p>
      <p> Quantidade de cotas ${tarefa.qtd} cota(s) </p>
      <a href="#" onClick='concluir(${tarefa.id})' class="btn btn-success ${disabled}">
        <i class="bi bi-check-lg"></i>
      </a>
      <a href="#" onClick='apagar(${tarefa.id})' class="btn btn-danger">
        <i class="bi bi-x-circle"></i>
      </a>
    </div>
  </div>
  </div>`
}