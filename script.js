const tg = window.Telegram.WebApp;
tg.expand();

const cases = [
    { name: "Budget Case", price: "50" },
    { name: "All In", price: "150" },
    { name: "Pro Case", price: "300" }
];

const grid = document.getElementById('cases-grid');

cases.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.innerHTML = `
        <img src="img/case${index + 1}.png" alt="case">
        <p>${item.name}</p>
        <button onclick="openCase('${item.name}')">${item.price} Coin</button>
    `;
    grid.appendChild(card);
});

function openCase(name) {
    tg.sendData("Open: " + name);
}
