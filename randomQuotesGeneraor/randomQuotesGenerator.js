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

function getNewRandomQuote() {
  fetch("https://www.drivebird.com/api/quotes/random")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(result => {
      const colorCombo = getRandomColorCombo();

      document.getElementById("random-quote-generator").style.background =
        `linear-gradient(to bottom right, ${colorCombo[0]}, ${colorCombo[1]})`;

      const quoteText = result.data[0].quote;
      const quoteAuthor = result.data[0].author;

      document.getElementById("random-quote-text").textContent = quoteText;
      document.getElementById("random-quote-author").textContent = quoteAuthor;
    })
    .catch(error => {
      alert("There was a problem fetching the quote.");
      console.error(error);
    });
}