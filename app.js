function init(seletorFrase, seletorAutor) {
  // Selecionando elementos do DOM
  const frase = document.querySelector(seletorFrase);
  const autor = document.querySelector(seletorAutor);

  // Mensagem inicial de acordo com o horário
  const now = new Date().getHours();
  if (now > 3 && now <= 12) frase.innerText = "Bom dia!";
  if (now > 12 && now <= 18) frase.innerText = "Boa tarde!";
  else frase.innerText = "Boa noite!";

  function getArrayIndexForToday(arrayLength) {
    const dayOfYear = Math.floor(
      (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000
    );
    return (dayOfYear - 1) % arrayLength;
  }

  // Tratativa de erro
  if (frase && autor) {
    // Função Assincrona puxando a frase da API
    async function activeApp() {
      try {
        // Frase API

        // Faz um fetch na url
        const dadosResponse = await fetch("./phrases.json");
        // Aguarda o retorno do Fetch e transforma em JSON
        const dadosJSON = await (await dadosResponse).json();
        // Puxando as frases de forma aleatoria
        const aleatorio = dadosJSON[getArrayIndexForToday(dadosJSON.length)];

        // Insere os dados no DOM
        frase.innerText = aleatorio.quote;
        autor.innerText = aleatorio.author;
      } catch (erro) {
        console.log(erro);
      }
    }

    // Ativando a função quando entra no site
    activeApp();
  }
}

// Chamando a função geral para inicar o codigo
init(".frase", ".autor");
