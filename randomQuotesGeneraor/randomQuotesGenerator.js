const colorCombos = [
  ["#ff512f", "#dd2476"],
  ["#f7971e", "#ffd200"],
  ["#11998e", "#38ef7d"],
  ["#fc4a1a", "#f7b733"],
  ["#654ea3", "#eaafc8"],
  ["#00c6ff", "#0072ff"],
  ["#ee0979", "#ff6a00"],
  ["#56ab2f", "#a8e063"],
  ["#c31432", "#240b36"],
  ["#4568dc", "#b06ab3"]
];

function getRandomColorCombo() {
  const randomIndex = Math.floor(Math.random() * colorCombos.length);
  return colorCombos[randomIndex];
}

async function getNewRandomQuote() {
  const response = await fetch("https://www.drivebird.com/api/quotes/random")
  if (!response.ok){
    alert("There was a problem fetching the quote.");
  }
  const Data = await response.json()
  const quoteText = Data.data[0].quote;
  const quoteAuthor = Data.data[0].author;
  document.getElementById("random-quote-text").textContent = quoteText;
  document.getElementById("random-quote-author").textContent = quoteAuthor;

  const colorCombo = getRandomColorCombo();

  document.getElementById("random-quote-generator").style.background = `linear-gradient(to bottom right, ${colorCombo[0]}, ${colorCombo[1]})`;
}