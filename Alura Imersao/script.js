let cardContainer = document.querySelector(".card-container");
let dados = []; // Variável para armazenar os dados do JSON

// Função para buscar e renderizar os cards
async function carregarDados() {
  try {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
    // Não renderiza mais os cards ao carregar. A tela começa vazia.
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
    cardContainer.innerHTML = `<p>Falha ao carregar informações. Tente novamente mais tarde.</p>`;
  }
}

function iniciarBusca() {
  const termoBusca = document.getElementById("campo-busca").value.toLowerCase();

  // Se o campo de busca estiver vazio, limpa a tela e não faz nada.
  if (termoBusca.trim() === "") {
    renderizarCards([]); // Chama renderizar com um array vazio para limpar a tela
    return;
  }

  // Filtra os dados com base no termo de busca
  const resultados = dados.filter(
    (dado) =>
      dado.nome.toLowerCase().includes(termoBusca) ||
      dado.descricao.toLowerCase().includes(termoBusca)
  );
  renderizarCards(resultados);
}

function renderizarCards(cardsParaRenderizar) {
  // Limpa o container antes de adicionar os novos cards
  cardContainer.innerHTML = "";

  for (let dado of cardsParaRenderizar) {
    let article = document.createElement("article");
    article.innerHTML = `
        <h2>${dado.nome}</h2>
          <p>${dado.ano}
          </p>
          <p>${dado.descricao}</p>
          <a href="${dado.link}" target="_blank">Leia mais</a>
        `;
    cardContainer.appendChild(article);
  }
}

// Chama a função para carregar os dados assim que o script for executado
carregarDados();
