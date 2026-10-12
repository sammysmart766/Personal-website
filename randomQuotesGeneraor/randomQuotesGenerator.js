function getNewRandomQuote() {
  fetch("https://www.drivebird.com/api/quotes/random")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(result => {
      const quoteText = result.data[0].quote;
      const quoteAuthor = result.data[0].author;

      document.getElementById("random-quote-text").textContent = quoteText;
      document.getElementById("random-quote-author").textContent = quoteAuthor;
    })
    .catch(error => {
      alert("There was a problem fetching the quote.");
    });
}