const cardTitleQuotes = document.querySelectorAll('.quotes .cards .card-title');
const cardValuesQuotes = document.querySelectorAll('.quotes .cards .card-value');

const cardTitleStocks = document.querySelectorAll('.stocks .cards .card-title');
const cardValuesStocks = document.querySelectorAll('.stocks .cards .card-value');

const production = 'https://api.hgbrasil.com/finance?key=c38d9f1a'
const local = 'https://cors-everywhere.onrender.com/https://api.hgbrasil.com/finance?key=c38d9f1a'

fetch(`${local}`)
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    const stocks = results.stocks;
    const currencies = results.currencies;

    console.log(results)

    Object.entries(stocks).map(([key, value], index) => {
      [...cardTitleStocks].map
        (element => {
          const id = element.dataset.id;
          if (id === key) {
            cardTitleStocks[index].textContent = value.name;
            cardValuesStocks[index].textContent = value.variation + '%';
          }
        });
    })

    Object.entries(currencies).map(([key, value], index) => {
      [...cardTitleQuotes].map
        (element => {
          const id = element.dataset.id;
          if (id === key) {
            cardTitleQuotes[index].textContent = value.name;
            cardValuesQuotes[index].textContent = value.buy;
          }
        });
    })
  })