// Chave gratuita em https://www.omdbapi.com/apikey.aspx (ativar pelo e-mail recebido).
const KEY = 'eed9fcc4';
const cache = new Map();

async function q(params) {
  const url = `https://www.omdbapi.com/?apikey=${KEY}&${new URLSearchParams(params)}`;
  if (!cache.has(url)) {
    const d = await (await fetch(url)).json();
    if (d.Response === "False") throw new Error(d.Error);
    cache.set(url, d);
  }
  return cache.get(url);
}

export const search = (s, page = 1) => q({ s, type: "movie", page });
export const movie = (id) => q({ i: id, plot: "full" });
export const poster = (p) => (p && p !== "N/A" ? p : "");