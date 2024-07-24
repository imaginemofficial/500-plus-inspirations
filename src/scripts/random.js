window.onload = async function () {
  let pagination = {};

  function greeting() {
    const h = new Date().getHours();
    if (h > 3 && h <= 12) return "Bom dia!";
    if (h > 12 && h <= 18) return "Boa tarde!";
    return "Boa noite!";
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
    const id = Math.floor(Math.random() * (pagination.itemsPerPage - 0 + 1));
    const data = await getQuote(id);
    
    quote.innerText = data.quote;
    author.innerText = data.author;
  } catch (erro) {
    console.error(erro);
  }
};
