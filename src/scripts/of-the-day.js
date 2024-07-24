window.onload = async function () {
  await new Promise((r) => setInterval(() => isLoaded && r()));

  start();

  function dayOfYear(date) {
    return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  }

  const idsAlreadyDrawn = parse(localStorage.getItem("idsAlreadyDrawn"), "[]");
  const last = parse(localStorage.getItem("last"), "{}");
  const today = dayOfYear(new Date());

  if (last.day === today) return print(last);

  const id = getRandomNumberInRange(0, pagination.total, idsAlreadyDrawn);
  const data = await loadQuote(id);

  localStorage.setItem("last", stringify({ day: today, ...data }));
  localStorage.setItem("idsAlreadyDrawn", stringify([...idsAlreadyDrawn, id]));
};
