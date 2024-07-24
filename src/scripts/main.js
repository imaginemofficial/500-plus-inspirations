window.onload = async function () {
  await new Promise((r) => setInterval(() => isLoaded && r()));

  start();
  await loadQuote();
};
