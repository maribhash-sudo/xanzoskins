const tg = window.Telegram.WebApp;
tg.expand();

const cases = [
    { name: "Budget Case", price: "50", img: "img/case1.png.png" },
    { name: "All In", price: "150", img: "img/case2.png.webp" },
    { name: "Pro Case", price: "300", img: "img/case3.png.webp" }
];

const grid = document.getElementById('cases-grid');

cases.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'case-card';
    card.innerHTML = `
        <img src="${item.img}" alt="case">
        <p>${item.name}</p>
        <button onclick="openCase('${item.name}')">${item.price} Coin</button>
    `;
    grid.appendChild(card);
});

function openCase(name) {
    tg.sendData("Open: " + name);
}
