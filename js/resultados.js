// resultados.js — lê o termo buscado na URL e mostra os filmes encontrados na OMDb

// 1) Ler o termo de busca, igual fizemos com o "id" no filme.js
const parametrosBusca = new URLSearchParams(window.location.search);
const termoBusca = parametrosBusca.get("q");

const tituloResultados = document.getElementById("resultados-titulo");
const grid = document.getElementById("resultados-grid");

if (!termoBusca) {
  tituloResultados.textContent = "Nenhum termo de busca informado";
} else {
  tituloResultados.textContent = `Resultados para "${termoBusca}"`;

  // 2) Chamar a função que criamos no api.js
  //    Como NÃO estamos dentro de uma função async aqui, usamos .then()/.catch()
  //    em vez de await — são duas formas diferentes de lidar com o mesmo tipo
  //    de resposta (uma Promise), que só chega depois de um tempo.
  buscarFilmes(termoBusca)
    .then(function (filmesEncontrados) {
      // 3) Deu certo: monta um card para cada filme encontrado
      grid.innerHTML = "";
      filmesEncontrados.forEach(function (filme) {
        const temPoster = filme.Poster && filme.Poster !== "N/A";

        grid.innerHTML += `
          <a href="filme.html?id=${filme.imdbID}" class="card-resultado">
            ${
              temPoster
                ? `<img src="${filme.Poster}" alt="Pôster de ${filme.Title}">`
                : `<div class="sem-poster">${filme.Title}</div>`
            }
            <p>${filme.Title} (${filme.Year})</p>
          </a>
        `;
      });
    })
    .catch(function (erro) {
      // 4) Deu errado (ex: nenhum filme encontrado, ou erro de rede)
      grid.innerHTML = "";
      tituloResultados.textContent = `Nenhum resultado para "${termoBusca}"`;
    });
}
