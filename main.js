const cardTitleQuotes = document.querySelectorAll(".quotes .cards .card-title");
const cardValuesQuotes = document.querySelectorAll(
  ".quotes .cards .card-value"
);

const cardTitleStocks = document.querySelectorAll(".stocks .cards .card-title");
const cardValuesStocks = document.querySelectorAll(
  ".stocks .cards .card-value"
);

function fetchData() {
  fetch(
    `https://cors-everywhere.onrender.com/https://api.hgbrasil.com/finance?key=c38d9f1a`
  )
    .then((response) => response.json())
    .then((data) => {
      const results = data.results;
      const stocks = results.stocks;
      const currencies = results.currencies;

      Object.entries(stocks).map(([key, value], index) => {
        [...cardTitleStocks].map((element) => {
          const id = element.dataset.id;
          if (id === key) {
            value.name === "Índice de Fundos de Investimentos Imobiliários B3"
              ? (cardTitleStocks[1].innerHTML = "IFIX")
              : (cardTitleStocks[index].textContent = value.name);

            cardValuesStocks[index].textContent = value.variation + "%";
          }
        });
      });

      Object.entries(currencies).map(([key, value], index) => {
        [...cardTitleQuotes].map((element) => {
          const id = element.dataset.id;
          if (id === key) {
            value.name === "Renminbi"
              ? (cardTitleQuotes[7].innerHTML = "Chinese Yuan")
              : cardTitleQuotes[index - 1].textContent = value.name;

            cardValuesQuotes[index - 1].textContent = value.buy.toLocaleString(
              "pt-BR",
              { style: "currency", currency: "BRL" }
            );
          }
        });
      });
    });
}

// Display current date and time
function displayDate() {
  const dateHourElem = document.getElementById("date-hour");
  const now = new Date();
  const formattedDate = now.toLocaleString("pt-BR", { dateStyle: "short" });
  const formattedTime = now.toLocaleString("pt-BR", { timeStyle: "short" });
  dateHourElem.textContent = `Atualizado em: ${formattedDate} às ${formattedTime}`;
}

// Call fetchData() immediately
fetchData();

// Call fetchData() every hour (in milliseconds)
setInterval(fetchData, 3600000);

// Update the date and time display every second
setInterval(displayDate, 1000);
