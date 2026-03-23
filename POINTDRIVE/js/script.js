/* ================= VARIÁVEIS ================= */
let container;
let dadosParceiros = [];
let parceirosAtuais = [];


/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {

  container = document.getElementById("parceiros");

  // GARANTE QUE OS DADOS EXISTEM
  dadosParceiros = window.partners || [];
  parceirosAtuais = [...dadosParceiros];

  renderPartners(parceirosAtuais);
  renderUser();
});


/* ================= RENDERIZAR PARCEIROS ================= */
function renderPartners(lista) {

  container.innerHTML = "";

  // PREMIUM PRIMEIRO
  lista.sort((a, b) => b.premium - a.premium);

  lista.forEach((parceiro, index) => {

    const card = document.createElement("div");
    card.classList.add("card-parceiro");

    if (parceiro.premium) {
      card.classList.add("premium");
    }

    card.innerHTML = `
      ${parceiro.premium ? "<span class='badge'>⭐ Premium</span>" : ""}

      <h3>${parceiro.name}</h3>
      <p>${parceiro.type}</p>
      <p>${parceiro.location}</p>

      <button onclick="abrirModalPorIndex(${index})">
        Ver detalhes
      </button>
    `;

    container.appendChild(card);
  });

  // atualiza lista atual
  parceirosAtuais = [...lista];
}


/* ================= ABRIR MODAL PELO INDEX ================= */
function abrirModalPorIndex(index) {
  const parceiro = parceirosAtuais[index];
  abrirModal(parceiro);
}


/* ================= FILTRO ================= */
function filterPartners(tipo) {

  if (tipo === "all") {
    parceirosAtuais = [...dadosParceiros];
  } else {
    parceirosAtuais = dadosParceiros.filter(p =>
      p.type.toLowerCase().includes(tipo.toLowerCase())
    );
  }

  renderPartners(parceirosAtuais);
}


/* ================= BUSCA ================= */
function searchPartners() {

  const valor = document
    .getElementById("campoBusca")
    .value
    .toLowerCase();

  const filtrados = parceirosAtuais.filter(p =>
    p.name.toLowerCase().includes(valor)
  );

  renderPartners(filtrados);
}


/* ================= ABRIR MODAL ================= */
function abrirModal(parceiro) {

  document.getElementById("janela").style.display = "flex";

  document.getElementById("janelaNome").innerText = parceiro.name;
  document.getElementById("janelaTipo").innerText = parceiro.type;
  document.getElementById("janelaLocal").innerText = parceiro.location;

  const servicosHTML = parceiro.services
    .map(servico => `<li>${servico}</li>`)
    .join("");

  let conteudoServicos = `
    <h4>Serviços:</h4>
    <ul>${servicosHTML}</ul>
  `;

  if (parceiro.premium) {
    conteudoServicos += `
      <p style="color: gold; margin-top:10px;">
        🚀 Atendimento prioritário
      </p>
    `;
  }

  document.getElementById("janelaServicos").innerHTML = conteudoServicos;

  document.getElementById("janelaAvaliacao").innerText =
    "⭐ Avaliação: " + parceiro.rating;

  document.getElementById("botaoWhatsapp").href =
    `https://wa.me/${parceiro.phone}`;
}


/* ================= FECHAR MODAL ================= */
function closeModal() {
  document.getElementById("janela").style.display = "none";
}


/* ================= FECHAR CLICANDO FORA ================= */
window.onclick = function (event) {

  const modal = document.getElementById("janela");

  if (event.target === modal) {
    modal.style.display = "none";
  }
};


/* ================= LOGIN ================= */
function openLogin() {
  document.getElementById("janelaLogin").style.display = "flex";
}

function closeLogin() {
  document.getElementById("janelaLogin").style.display = "none";
}


/* ================= RENDER USUÁRIO ================= */
function renderUser() {

  const usuario = JSON.parse(
    localStorage.getItem("pointdriver_user")
  );

  if (!usuario) return;

  const navRight = document.querySelector(".nav-right");

  navRight.innerHTML = `
    <span>Olá, ${usuario.name}</span>
    <button onclick="logout()">Sair</button>
  `;
}


/* ================= LOGIN ================= */
function loginUser() {

  const nome = document.getElementById("loginNome").value;
  const email = document.getElementById("loginEmail").value;

  const usuario = {
    name: nome,
    email: email
  };

  localStorage.setItem(
    "pointdriver_user",
    JSON.stringify(usuario)
  );

  closeLogin();
  renderUser();
}


/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("pointdriver_user");
  location.reload();
}