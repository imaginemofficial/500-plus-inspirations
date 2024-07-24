window.onload = async function () {
  let pagination = {};

  function greeting() {
    const h = new Date().getHours();
    if (h > 3 && h <= 12) return "Bom dia!";
    if (h > 12 && h <= 18) return "Boa tarde!";
    return "Boa noite!";
  }

  function dayOfYear(date) {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  }

  async function getQuote(id) {
    const { itemsPerPage } = pagination;
    const page = id < itemsPerPage ? 1 : parseInt(id / itemsPerPage) + 1;
    const data = await (await fetch(`src/quotes/${page}.json`)).json();
    return data[id % itemsPerPage];
  }

  const quote = document.querySelector("#quote");
  const author = document.querySelector("#author");

  quote.innerText = greeting();

  try {
    pagination = await (await fetch("src/quotes")).json();
    const data = await getQuote(dayOfYear(new Date()));
    quote.innerText = data.quote;
    author.innerText = data.author;
  } catch (erro) {
    console.error(erro);
  }
};
