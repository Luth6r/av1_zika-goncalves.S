
// Variáveis
let tarefas = [];
const tarefaInput = document.getElementById("tarefa");
const adicionarBotao = document.getElementById("adicionar");
const listaTarefas = document.getElementById("tarefas");

// Event Listeners
adicionarBotao.addEventListener("click", adicionarTarefa);

tarefaInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
      adicionarTarefa();} });

window.addEventListener("DOMContentLoaded", function () {
    const tarefasSalvas = localStorage.getItem("minhaLista");

    if (tarefasSalvas) {
        const lista = JSON.parse(tarefasSalvas);
        tarefas.push(...lista);
        renderTarefas();}});


// Funções
function validarTarefa(texto) {
    if (texto.trim() === "") {
        return false;}
        return true;}


function adicionarTarefa() {
    const tarefaTexto = tarefaInput.value;
        if (!validarTarefa(tarefaTexto)) {
            document.getElementById("mensagem").textContent = "Por favor, digite uma tarefa";
        return;}    
    document.getElementById("mensagem").textContent = "";
    tarefas.push({
    texto: tarefaTexto,
    concluida: false});
        renderTarefas();
        salvarTarefas();
            tarefaInput.value = "";}


function adicionarTarefaNaTela(tarefa, index) {
    const novaTarefa = document.createElement("li");
    novaTarefa.className = "item-tarefa";
    novaTarefa.innerHTML = `
        <input type="checkbox" class="checkbox-tarefa" data-index="${index}" ${tarefa.concluida ? 'checked' : ''}>
        <span class="${tarefa.concluida ? 'tarefa-concluida' : ''}">${tarefa.texto}</span>
        <button class="excluir" data-index="${index}">Excluir</button>`;
    const checkbox = novaTarefa.querySelector('.checkbox-tarefa');
    checkbox.addEventListener('change', function(e) {
        const i = e.target.dataset.index;
        tarefas[i].concluida = e.target.checked;
        renderTarefas();
        salvarTarefas();}); 
    listaTarefas.appendChild(novaTarefa);}


function renderTarefas() {
    listaTarefas.innerHTML = "";
    tarefas.forEach(function (tarefa, index) {
        adicionarTarefaNaTela(tarefa, index);});}


function salvarTarefas() {
    localStorage.setItem("minhaLista", JSON.stringify(tarefas));}
    
 //TE AMO HENRIQUE <3