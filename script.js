// Pega TODAS as setas direitas da página
document.querySelectorAll(".seta-direita").forEach(function(seta) {

  // Para CADA seta, escuta o evento de clique
  seta.addEventListener("click", function() {

    // A partir da seta clicada, sobe até o container pai
    const container = seta.closest(".carrossel-container");

    // Dentro DESSE container específico, acha a div de imagens
    const carrossel = container.querySelector(".carrossel-imagens");

    // Rola esse carrossel específico para a direita
    carrossel.scrollBy({ left: 300, behavior: "smooth" });
  });
});

document.querySelectorAll(".seta-esquerda").forEach(function(seta) {

  seta.addEventListener("click", function() {

    const container = seta.closest(".carrossel-container");

    const carrossel = container.querySelector(".carrossel-imagens");

    carrossel.scrollBy({ left: -300, behavior: "smooth" });
  });
});

document.querySelectorAll("nav a").forEach(function(link) {
  link.addEventListener("click", function() {
    console.log("cliquei em:", link);
  });
});