// Deve ser criado junto com os arquivos da pasta "views"
/**
 * Processo de renderização do documento index.html
 */

console.log("Processo de renderização");

// Estratégia para renderizar(desenhar) as notas adesivas:
// usar uma lista para preencher de forma dinâmica os itens(notas)

// Vetor global para manipular os dados do banco
let arrayNotes = [];

// captura do id da lista <ul> do documento index.html
const list = document.getElementById("listNotes");

// Inserção da data no rodapé
function obterData() {
  const data = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return data.toLocaleDateString("pt-BR", options);
}

document.getElementById("dataAtual").innerHTML = obterData();

// Troca do ícone do banco de dados (status da conexão)
// uso da api do preload.js
api.dbStatus((event, message) => {
  // Teste de recebimento da mensagem
  console.log(message);
  if (message === "conectado") {
    document.getElementById("iconeDB").src = "../public/img/dbon.png";
  } else {
    document.getElementById("iconeDB").src = "../public/img/dboff.png";
  }
});

// Enviar ao main um pedido para conectar com o banco de dados quando a janela principal for inicializada
api.dbConnect()

// ========================================================
// ===================== CRUD READ ========================

// Passo 1: Enviar ao main um pedido para listar as notas
api.listNotes();

// Passo 5: Recebimento das notas via IPC e renderização das notas no documento html
api.renderNotes((event, notes) => {
  const renderNotes = JSON.parse(notes); // JSON.parse converte de string para JSON
  console.log(renderNotes); // teste de recebimento do passo 5
  // renderizar no index.html o conteúdo do vetor(array)
  arrayNotes = renderNotes; // atribuir ao vetor o JSON recebido
  // uso do laço forEach para percorrer o vetor e extrair os dados
  arrayNotes.forEach((n) => {
    // Adição de tags <li> no documento index.html
    list.innerHTML += `
    <br>
    <li>
    <p onclick="deleteNote('${n._id}')" id="x">X</p>
    <p>${n._id}</p>
    <p>${n.texto}</p>
    <p>${n.cor}</p>
    </li>`
  });
});

// ========================================================
// =================== FIM CRUD READ ======================

// ========================================================
// =============== ATUALIZAÇÃO DAS NOTAS ==================

api.mainReload((args) =>{
  location.reload()
})

// ========================================================
// ============= FIM ATUALIZAÇÃO DAS NOTAS ================

// ========================================================
// =============== CRUD - DELETE ==================
// deve estar no renderer da pagina onde será deletado
function deleteNote(id){
  console.log(id) // Passo 1: receber o id da nota a ser excluída
  api.deleteNote(id) // Passo 2: enviar o id da nota ao main
}

// ========================================================
// ============= FIM - CRUD DELETE ================