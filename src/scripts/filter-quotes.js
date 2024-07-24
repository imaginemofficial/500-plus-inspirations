function splitPhrase(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .trim()
    .split(/\s+/);
}

function sequences(words, length) {
  const sequences = [];
  for (let i = 0; i <= words.length - length; i++) {
    const sequence = words.slice(i, i + length).join(" ");
    sequences.push(sequence);
  }
  return sequences;
}

function checkRule1(a, b) {
  const words = 5;
  const sequencesA = sequences(splitPhrase(a), words);
  const sequencesB = sequences(splitPhrase(b), words);
  const intersection = sequencesA.filter((seq) => sequencesB.includes(seq));
  return intersection.length > 1;
}

function checkRule2(a, b) {
  const words = 4;
  const wordsA = splitPhrase(a);
  const wordsB = splitPhrase(b);
  const sequencesA = sequences(wordsA, words);
  const sequencesB = sequences(wordsB, words);
  const intersection = sequencesA.filter((seq) => sequencesB.includes(seq));
  const commonWords = wordsA.filter(
    (w) => w.length > 3 && wordsB.includes(w)
  );
  return intersection.length > 0 && commonWords.length > words;
}

function filter(array) {
  return array.filter(
    (a, i, arr) =>
      !arr.slice(0, i).some((b) => checkRule1(a, b) || checkRule2(a, b))
  );
}

function findDuplicates(array) {
  return array.flatMap((a, i) =>
    array
      .slice(i + 1)
      .filter((b) => checkRule1(a, b) || checkRule2(a, b))
      .map((b) => [a, b])
  );
}
