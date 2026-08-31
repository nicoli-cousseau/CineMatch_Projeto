// "Gaveta de dados": uma lista (array) com um objeto para cada filme/série.
// Cada objeto é como uma linha de planilha; cada propriedade é uma coluna.
// O "id" é o apelido único do filme — é ele que aparece na URL (filme.html?id=parasita)
// e é por meio dele que o filme.js vai encontrar o filme certo depois.

const filmes = [
  {
    id: "oppenheimer",
    titulo: "Oppenheimer",
    poster: "assets/imgs/Oppenheimer.webp",
    ano: 2023,
    genero: "Drama",
    duracao: "3h",
    notaEstrelas: 4,       // quantas estrelas cheias mostrar (de 0 a 5)
    notaNumero: 9.2,
    votos: "3.4K votos",
    sinopse: "A história do físico que liderou o projeto da bomba atômica e as consequências que marcaram o mundo.",
    plataformas: ["Prime Video", "Max"],
    reviews: []
  },
  {
    id: "parasita",
    titulo: "Parasita",
    poster: "assets/imgs/Parasita.jpg",
    ano: 2019,
    genero: "Drama",
    duracao: "2h12min",
    notaEstrelas: 5,
    notaNumero: 9.4,
    votos: "2.847 votos da comunidade",
    sinopse: "Uma família pobre se infiltra na vida de uma família rica numa teia de mentiras que culmina em eventos inesperados.",
    plataformas: ["Prime Video", "Max"],
    reviews: [
      { autor: "Maria F.", estrelas: 5, texto: "Uma obra-prima. A metáfora das escadas diz mais do que qualquer palavra poderia." }
    ]
  },
  {
    id: "clube-da-luta",
    titulo: "Clube da Luta",
    poster: "assets/imgs/ClubedaLuta.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 5,
    notaNumero: 9.1,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "ela",
    titulo: "Ela",
    poster: "assets/imgs/Ela.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.8,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "corra",
    titulo: "Corra!",
    poster: "assets/imgs/Corra.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.7,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "dexter",
    titulo: "Dexter",
    poster: "assets/imgs/Dexter.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.5,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "morro-dos-ventos-uivantes",
    titulo: "O Morro dos Ventos Uivantes",
    poster: "assets/imgs/OMorrodosVentosUivantes.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 7.0,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "breaking-bad",
    titulo: "Breaking Bad",
    poster: "assets/imgs/BreakingBad.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 5,
    notaNumero: 9.0,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "forma-da-agua",
    titulo: "A Forma da Água",
    poster: "assets/imgs/AFormadaAgua.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.0,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "retorno-do-rei",
    titulo: "O Senhor dos Anéis: O Retorno do Rei",
    poster: "assets/imgs/SA_ORetornodoRei.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 5,
    notaNumero: 9.0,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "sonho-de-liberdade",
    titulo: "Um Sonho de Liberdade",
    poster: "assets/imgs/UmSonhodeLiberdade.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 5,
    notaNumero: 9.4,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "cavaleiro-das-trevas",
    titulo: "Batman: O Cavaleiro das Trevas",
    poster: "assets/imgs/Batman-OCavaleirodasTrevas.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 5,
    notaNumero: 9.3,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "doze-homens-e-uma-sentenca",
    titulo: "12 Homens e uma Sentença",
    poster: "assets/imgs/12HomenseumaSentença.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 5,
    notaNumero: 9.2,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "marley-e-eu",
    titulo: "Marley & Eu",
    poster: "assets/imgs/Marley&Eu.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.5,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "cinderela-2015",
    titulo: "Cinderela (2015)",
    poster: "assets/imgs/Cinderela(2015).jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.4,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  },
  {
    id: "orgulho-e-preconceito",
    titulo: "Orgulho e Preconceito",
    poster: "assets/imgs/OrgulhoePreconceito.jpg",
    ano: "----",
    genero: "A completar",
    duracao: "--",
    notaEstrelas: 4,
    notaNumero: 8.2,
    votos: "",
    sinopse: "Sinopse ainda não cadastrada.",
    plataformas: [],
    reviews: []
  }
];

// ===== Preencher a página do filme com os dados certos =====

// 1) Descobrir qual filme foi clicado, lendo o "bilhete" que veio na URL
//    Exemplo de URL: filme.html?id=parasita
const parametros = new URLSearchParams(window.location.search);
const idFilme = parametros.get("id"); // vira a string "parasita"

// 2) Procurar, dentro da gaveta de dados (filmes.js), o filme com esse id
const filme = filmes.find(function (item) {
  return item.id === idFilme;
});

// 3) Se não encontrar (id errado, ausente, ou digitado à mão)
if (!filme) {
  document.getElementById("detalhe-titulo").textContent = "Filme não encontrado";
  document.getElementById("detalhe-sinopse").textContent =
    "Volte para a Home e escolha um filme da lista.";
} else {
  // 4) Preencher cada "espaço vazio" do molde com os dados do filme encontrado

  // Pôster
  const poster = document.getElementById("detalhe-poster");
  poster.src = filme.poster;
  poster.alt = "Pôster de " + filme.titulo;

  // Título
  document.getElementById("detalhe-titulo").textContent = filme.titulo;

  // Linha "2019 · Drama · 2h12min"
  document.getElementById("detalhe-meta").textContent =
    filme.ano + " · " + filme.genero + " · " + filme.duracao;

  // Nota e votos
  document.getElementById("detalhe-nota").textContent = filme.notaNumero;
  document.getElementById("detalhe-votos").textContent = filme.votos;

  // Estrelas: monta 5 símbolos, preenchendo conforme "notaEstrelas"
  let estrelasHTML = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= filme.notaEstrelas) {
      estrelasHTML += '<span class="material-symbols-outlined estrela-cheia">star</span>';
    } else {
      estrelasHTML += '<span class="material-symbols-outlined estrela-vazia">star_outline</span>';
    }
  }
  document.getElementById("detalhe-estrelas").innerHTML = estrelasHTML;

  // Sinopse
  document.getElementById("detalhe-sinopse").textContent = filme.sinopse;

  // Plataformas: uma "pílula" pra cada plataforma da lista
  const plataformasDiv = document.getElementById("detalhe-plataformas");
  if (filme.plataformas.length === 0) {
    plataformasDiv.textContent = "Ainda não informado.";
  } else {
    filme.plataformas.forEach(function (nome) {
      plataformasDiv.innerHTML += `
        <span class="plataforma">
          <span class="material-symbols-outlined">check</span>
          ${nome}
        </span>
      `;
    });
  }

  // Reviews: um bloco pra cada review da lista
  const reviewsDiv = document.getElementById("detalhe-reviews");
  if (filme.reviews.length === 0) {
    reviewsDiv.textContent = "Ainda não há reviews para este título.";
  } else {
    filme.reviews.forEach(function (review) {
      reviewsDiv.innerHTML += `
        <div class="review-item">
          <p class="review-autor">${review.autor} ${"★".repeat(review.estrelas)}</p>
          <p class="review-texto">${review.texto}</p>
        </div>
      `;
    });
  }
}