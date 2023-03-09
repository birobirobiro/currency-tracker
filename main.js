const cardValuesQuotes = document.querySelectorAll('.quotes .cards .card-value');
const cardValuesStocks = document.querySelectorAll('.stocks .cards .card-value');

function fetchData() {
  fetch('https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/finance?key=c60e30cf')
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      const stocks = results.stocks;
      const currencies = results.currencies;

      Object.entries(stocks).forEach(([key, value]) => {
        cardValuesStocks.forEach(element => {
          const id = element.dataset.id;
          if (id === key) {
            element.textContent = `${value.variation.toFixed(2)}%`;
            if (value.variation < 0) {
              element.classList.add("negative");
            } else {
              element.classList.remove("negative");
            }
          }
        });
      });

      Object.entries(currencies).forEach(([key, value], index) => {
        if (index > 0) {
          cardValuesQuotes.forEach(element => {
            const id = element.dataset.id;
            if (id === key) {
              element.textContent = value.buy.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              });
            }
          });
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}

function displayDate() {
  const dateHourElem = document.getElementById('date-hour');
  const now = new Date();
  const formattedDate = now.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  });
  const formattedTime = now.toLocaleTimeString('pt-BR', {
    hour: 'numeric',
    minute: 'numeric'
  });
  dateHourElem.textContent = `Atualizado em: ${formattedDate} às ${formattedTime}`;
}

fetchData();
setInterval(fetchData, 3600000);
setInterval(displayDate, 1000);
