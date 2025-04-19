const nomeInput = document.getElementById("nome-input");
const exercicioInput = document.getElementById("exercicio-input");
const seriesInput = document.getElementById("series-input");
const tableBody = document.getElementById("table-body");
const updateContainer = document.getElementById("update-container");
const updateNome = document.getElementById("update-nome");
const updateExercicio = document.getElementById("update-exercicio");
const updateSeries = document.getElementById("update-series");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");

let fichas = JSON.parse(localStorage.getItem("fichas")) || [];
let currentId = null;

document.getElementById("add-btn").addEventListener("click", () => {
  const nome = nomeInput.value.trim();
  const exercicio = exercicioInput.value.trim();
  const series = seriesInput.value.trim();

  if (!nome || !exercicio || !series) {
    alert("Preencha todos os campos!");
    return;
  }

  let id = 1;
  while (fichas.some(f => f.id === id)) id++;

  const ficha = { id, nome, exercicio, series };
  fichas.push(ficha);
  localStorage.setItem("fichas", JSON.stringify(fichas));
  limparCampos();
  renderTable();
});

function limparCampos() {
  nomeInput.value = "";
  exercicioInput.value = "";
  seriesInput.value = "";
}

function renderTable() {
  tableBody.innerHTML = "";
  fichas.forEach(f => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${f.id}</td>
      <td>${f.nome}</td>
      <td>${f.exercicio}</td>
      <td>${f.series}</td>
      <td>
        <button class="edit-btn" onclick="editarFicha(${f.id})">Editar</button>
        <button class="delete-btn" onclick="deletarFicha(${f.id})">Excluir</button>
      </td>`;
    tableBody.appendChild(tr);
  });
}

function editarFicha(id) {
  const ficha = fichas.find(f => f.id === id);
  updateNome.value = ficha.nome;
  updateExercicio.value = ficha.exercicio;
  updateSeries.value = ficha.series;
  currentId = id;
  updateContainer.style.display = "block";
}

updateBtn.addEventListener("click", () => {
  const nome = updateNome.value.trim();
  const exercicio = updateExercicio.value.trim();
  const series = updateSeries.value.trim();

  if (!nome || !exercicio || !series) {
    alert("Preencha todos os campos!");
    return;
  }

  const index = fichas.findIndex(f => f.id === currentId);
  if (index !== -1) {
    fichas[index] = { id: currentId, nome, exercicio, series };
    localStorage.setItem("fichas", JSON.stringify(fichas));
    updateContainer.style.display = "none";
    renderTable();
  }
});

cancelBtn.addEventListener("click", () => {
  updateContainer.style.display = "none";
});

function deletarFicha(id) {
  fichas = fichas.filter(f => f.id !== id);
  localStorage.setItem("fichas", JSON.stringify(fichas));
  renderTable();
}

renderTable();
