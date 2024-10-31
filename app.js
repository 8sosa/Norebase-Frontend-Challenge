async function fetchCoins(start = 0, limit = 10) {
    const response = await fetch(`https://api.coinlore.net/api/tickers/?start=${start}&limit=${limit}`);
    const data = await response.json();
    return data.data;
}

function displayCoins(coins) {
    const tableBody = document.getElementById("coin-table-body");
    tableBody.innerHTML = "";

    coins.forEach((coin) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-label="💰Coin">${coin.name}</td>
            <td data-label="📄Code">${coin.symbol}</td>
            <td data-label="🤑Price">$${coin.price_usd}</td>
            <td data-label="📉Total Supply">${coin.tsupply} ${coin.symbol}</td>
        `;
        tableBody.appendChild(row);
    });
}

let currentPage = 0;
const limit = 10;

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next"); 

async function updateTable() {
    const start = currentPage * limit;
    const coins = await fetchCoins(start, limit);
    displayCoins(coins);

    console.log(currentPage)
     if (currentPage === 0) {
        prevButton.style.display = "none";
    } else {
        prevButton.style.display = "inline-block";
    }
}

nextButton.addEventListener("click", () => {
    currentPage++;
    updateTable();
});

prevButton.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        updateTable();
    }
});

updateTable();