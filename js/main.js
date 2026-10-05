import { search, movie, poster } from "./api.js";
import { STREAMING } from "./streaming.js";
import { auth, onAuthStateChanged, signIn, signUp, logOut, saveMovie, watchMovies } from "./firebase.js";

const $ = (s) => document.querySelector(s);
const view = $("#view"), modal = $("#modal"), box = $("#modal-body");
// Cada fileira da página inicial é uma busca na OMDb (ela não tem "listas populares"). Edite à vontade.
const ROWS = [["Batman", "batman"], ["Star Wars", "star wars"], ["Harry Potter", "harry potter"], ["Matrix", "matrix"]];
const ERR = { "auth/invalid-credential":"E-mail ou senha incorretos.", "auth/email-already-in-use":"Este e-mail já tem cadastro. Use Entrar.",
  "auth/weak-password":"A senha precisa de pelo menos 6 caracteres.", "auth/invalid-email":"E-mail inválido.",
  "auth/too-many-requests":"Muitas tentativas. Aguarde um pouco." };

const st = { user: null, list: {}, view: "home", rows: [], q: "", page: 1, results: [], total: 0, cur: null };
let unwatch = () => {}, mode = "in";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const val = (x) => (x && x !== "N/A" ? esc(x) : "Não informado");
const norm = (m) => ({ id: m.imdbID, titulo: m.Title, ano: m.Year, poster: poster(m.Poster) });
const errMsg = (e) => /api key/i.test(e.message) ? "Chave da OMDb inválida ou não ativada."
  : /not found/i.test(e.message) ? "Nenhum filme encontrado."
  : /too many/i.test(e.message) ? "Digite pelo menos 3 letras."
  : /limit/i.test(e.message) ? "Limite diário da OMDb atingido." : "Não foi possível carregar. Tente de novo.";

function card(m) {
  const f = st.list[m.id] || {};
  return `<a class="card" href="#/filme/${esc(m.id)}">${m.poster ? `<img loading="lazy" src="${esc(m.poster)}" alt="">` : `<div class="noimg">${esc(m.titulo)}</div>`}
    <span class="t">${esc(m.titulo)}</span><span class="y">${esc(m.ano)}${f.nota ? `<b>★ ${f.nota}</b>` : ""}${f.lista ? `<b>✓</b>` : ""}</span></a>`;
}

/* ------ telas ------ */
function renderHome() {
  view.innerHTML = ROWS.map(([t], i) => {
    const r = st.rows[i];
    return `<section><h2>${t}</h2><div class="row">${Array.isArray(r) ? r.map(card).join("") : `<p class="empty">${r || "Carregando…"}</p>`}</div></section>`;
  }).join("");
}

function loadHome() {
  renderHome();
  ROWS.forEach(async ([, s], i) => {
    try { st.rows[i] = (await search(s)).Search.map(norm); } catch (e) { st.rows[i] = errMsg(e); }
    if (st.view === "home") renderHome();
  });
}

function renderSearch(msg = "") {
  view.innerHTML = `<h2>Resultados para “${esc(st.q)}”</h2>
    ${st.results.length ? `<div class="grid">${st.results.map(card).join("")}</div>` : `<p class="empty">${msg || "Buscando…"}</p>`}
    <button id="more" class="primary" ${st.results.length < st.total ? "" : "hidden"}>Carregar mais</button>`;
}

async function runSearch(more = false) {
  if (!more) { st.page = 1; st.results = []; st.total = 0; renderSearch(); } else st.page++;
  const asked = st.q;
  try {
    const d = await search(asked, st.page);
    if (asked !== st.q) return;
    st.results.push(...d.Search.map(norm)); st.total = +d.totalResults;
    renderSearch();
  } catch (e) { if (asked === st.q) renderSearch(errMsg(e)); }
}

function renderList() {
  if (!st.user) { view.innerHTML = `<p class="empty">Entre na sua conta para ver sua lista. <a href="#/entrar">Entrar</a></p>`; return; }
  const items = Object.entries(st.list).filter(([, d]) => d.lista).map(([id, d]) => ({ id, titulo: d.titulo, ano: d.ano, poster: d.poster }));
  view.innerHTML = `<h2>Minha lista</h2>` + (items.length ? `<div class="grid">${items.map(card).join("")}</div>`
    : `<p class="empty">Sua lista está vazia. Abra um filme e toque em “Adicionar à minha lista”.</p>`);
}

function setView(v) {
  st.view = v;
  document.querySelectorAll("#nav [data-view]").forEach((b) => b.classList.toggle("on", b.dataset.view === v));
  refresh();
}
const refresh = () => ({ home: renderHome, search: () => runSearch(), list: renderList }[st.view]());
// atualiza sem nova busca (usado quando a lista do usuário muda)
const redraw = () => ({ home: renderHome, search: () => renderSearch(), list: renderList }[st.view]());

/* ------ modal: filme, login, em breve ----- */
const show = () => { if (!modal.open) modal.showModal(); };

async function openFilme(id) {
  box.innerHTML = `<p class="empty" style="padding:1.2rem">Carregando…</p>`; show();
  try {
    const d = await movie(id);
    if (location.hash !== `#/filme/${id}`) return;
    st.cur = d;
    const imdb = d.imdbRating !== "N/A" ? d.imdbRating : "–";
    const outras = (d.Ratings || []).filter((r) => r.Source !== "Internet Movie Database").map((r) => `<li>${esc(r.Source)}: <b>${esc(r.Value)}</b></li>`).join("");
    const onde = STREAMING[id] || [];
    box.innerHTML = `<div class="filme"><img class="poster" src="${esc(poster(d.Poster))}" alt="Pôster de ${esc(d.Title)}">
      <div class="info"><h2>${esc(d.Title)}</h2>
      <p class="meta">${[d.Year, d.Rated, d.Runtime].filter((x) => x && x !== "N/A").map(esc).join(" | ")}</p>
      <div class="chips">${(d.Genre || "").split(", ").filter((g) => g && g !== "N/A").map((g) => `<span>${esc(g)}</span>`).join("")}</div>
      <div class="notas">
        <div><span>Nota do mundo (IMDb)</span><b class="mundo">★ ${esc(imdb)}<small> /10${d.imdbVotes !== "N/A" ? `, ${esc(d.imdbVotes)} votos` : ""}</small></b><ul>${outras}</ul></div>
        <div><span>Sua nota</span><div id="stars" role="group" aria-label="Sua nota de 1 a 5">${[1,2,3,4,5].map((n) => `<button class="star" data-n="${n}" aria-label="${n} de 5">★</button>`).join("")}</div><span id="minha"></span></div>
      </div>
      <button id="addlist" class="primary"></button>
      <h3>Sinopse</h3><p>${val(d.Plot)}</p>
      <h3>Onde assistir</h3>${onde.length ? `<div class="chips">${onde.map((s) => `<span>${esc(s)}</span>`).join("")}</div>` : `<p class="meta">Disponibilidade não informada para este filme.</p>`}
      <h3>Ficha técnica</h3><dl><dt>Direção</dt><dd>${val(d.Director)}</dd><dt>Elenco</dt><dd>${val(d.Actors)}</dd><dt>País</dt><dd>${val(d.Country)}</dd><dt>Idioma</dt><dd>${val(d.Language)}</dd><dt>Prêmios</dt><dd>${val(d.Awards)}</dd></dl>
      </div></div>`;
    paintFilme();
  } catch (e) { box.innerHTML = `<p class="empty" style="padding:1.2rem">${errMsg(e)}</p>`; }
}

function paintFilme() {
  if (!modal.open || !$("#stars") || !st.cur) return;
  const f = st.list[st.cur.imdbID] || {};
  document.querySelectorAll(".star").forEach((b) => b.classList.toggle("on", +b.dataset.n <= (f.nota || 0)));
  $("#minha").textContent = f.nota ? `Você deu ${f.nota} de 5` : "Toque numa estrela para avaliar";
  const a = $("#addlist");
  a.textContent = f.lista ? "Na minha lista ✓ (remover)" : "Adicionar à minha lista";
  a.classList.toggle("on", !!f.lista);
}

function openAuth() {
  const login = mode === "in";
  box.innerHTML = `<form id="auth"><h2>${login ? "Entrar" : "Criar conta"}</h2>
    <label>E-mail<input type="email" name="email" required autocomplete="email"></label>
    <label>Senha<input type="password" name="pw" required minlength="6" autocomplete="${login ? "current-password" : "new-password"}"></label>
    <p id="err" role="alert"></p>
    <button class="primary" style="margin:0">${login ? "Entrar" : "Criar conta"}</button>
    <button type="button" id="swap" class="link">${login ? "Não tenho conta" : "Já tenho conta"}</button></form>`;
  show();
}

function openSoon(nome) {
  box.innerHTML = `<div class="soon"><h2>${esc(nome)}</h2><p>Esta parte ainda está em implementação e chega em breve.</p><button class="primary" id="ok" style="margin:0">Entendi</button></div>`;
  show();
}

function route() {
  const h = location.hash;
  if (/^#\/filme\/tt\d+$/.test(h)) openFilme(h.slice(8));
  else if (h === "#/entrar") openAuth();
  else if (h.startsWith("#/em-breve/")) openSoon(decodeURIComponent(h.slice(11)));
  else if (modal.open) modal.close();
}

/* ---------- eventos ---------- */
addEventListener("hashchange", route);
modal.addEventListener("close", () => { if (location.hash) location.hash = ""; });
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
$("#close").onclick = () => modal.close();

box.addEventListener("submit", async (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  try { await (mode === "in" ? signIn : signUp)(f.get("email"), f.get("pw")); location.hash = ""; }
  catch (err) { $("#err").textContent = ERR[err.code] || "Algo deu errado. Tente novamente."; }
});

document.addEventListener("click", async (e) => {
  const t = e.target;
  if (t.id === "swap") { mode = mode === "in" ? "up" : "in"; openAuth(); }
  else if (t.id === "ok") modal.close();
  else if (t.id === "more") runSearch(true);
  else if (t.id === "out") logOut();
  else if (t.id === "home") { e.preventDefault(); setView("home"); }
  else if (t.dataset.view) { if (t.dataset.view === "list" && !st.user) location.hash = "#/entrar"; setView(t.dataset.view); }
  else if (t.id === "addlist" || t.classList.contains("star")) {
    if (!st.user) { location.hash = "#/entrar"; return; }
    const f = st.list[st.cur.imdbID] || {};
    const patch = t.id === "addlist" ? { lista: !f.lista } : { nota: +t.dataset.n === f.nota ? 0 : +t.dataset.n };
    try { await saveMovie(st.user.uid, norm(st.cur), patch); } catch { alert("Não foi possível salvar. Tente de novo."); }
  }
});

$("#search").onsubmit = (e) => { e.preventDefault(); st.q = $("#q").value.trim(); if (st.q) setView("search"); };

onAuthStateChanged(auth, (u) => {
  st.user = u; st.list = {}; unwatch();
  $("#who").textContent = u?.email || "";
  $("#who").hidden = $("#out").hidden = !u;
  $("#in").hidden = !!u;
  if (u) unwatch = watchMovies(u.uid, (m) => { st.list = m; redraw(); paintFilme(); });
  else { redraw(); paintFilme(); }
});

loadHome();
route();
