const isLoaded = true;

function start() {
  loadTheme();
  print({ quote: greeting() });
  showElement(".container");
}

function print({ quote, author }) {
  if (quote) document.querySelector("#quote").innerText = handleQuote(quote);
  if (author) document.querySelector("#author").innerText = author;
}

function handleQuote(quote) {
  let str = quote.trim();
  if (![".", "?", "!", '"'].includes(str.slice(-1))) str = `${str}.`;
  return `${str.slice(0, 1).toLocaleUpperCase()}${str.slice(1)}`;
}

function greeting() {
  const h = new Date().getHours();
  if (h > 3 && h <= 12) return "Bom dia!";
  if (h > 12 && h <= 18) return "Boa tarde!";
  return "Boa noite!";
}

function showElement(selector) {
  document.querySelector(selector).classList.add("show");
}

function getParams(param) {
  const urlParams = new URLSearchParams(document.location.search);
  const params = Object.fromEntries(urlParams);
  return param ? params[param] : params;
}

function loadTheme() {
  const theme = getParams("theme")?.toLocaleLowerCase();
  if (theme) document.querySelector("body").classList.add(theme);
}

async function loadQuote(id) {
  if (id === undefined) {
    id = Math.floor(Math.random() * (pagination.itemsPerPage - 0 + 1));
  }

  try {
    const data = await getQuote(id);
    print(data);
    return data;
  } catch (erro) {
    console.error(erro);
  }
}

async function getQuote(id, itemsPerPage = pagination?.itemsPerPage) {
  const page = id < itemsPerPage ? 1 : parseInt(id / itemsPerPage) + 1;
  const data = await (await fetch(`quotes/${page}.json`)).json();
  return data[id % itemsPerPage];
}

function getRandomNumberInRange(min, max, drawnNumbers) {
  let n;
  do {
    n = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (drawnNumbers?.includes(n));
  return n;
}

function parse(value, elseValue) {
  return JSON.parse(value || elseValue);
}

function stringify(value) {
  return JSON.stringify(value);
}
