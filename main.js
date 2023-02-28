const cardTitle = document.querySelectorAll('.card-title');
const cardValue = document.querySelectorAll('.card-value');

const production = 'https://api.hgbrasil.com/finance?key=c38d9f1a'
const local = 'https://cors-everywhere.onrender.com/https://api.hgbrasil.com/finance?key=c38d9f1a'

fetch(`${local}`)
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    const stocks = results.stocks;
    const currencies = results.currencies;
    const bitcoin = results.bitcoin;
  })