const tg = window.Telegram.WebApp;
tg.expand();

const cases = [
    { name: "Budget", price: "50", img: "case1.png.png" },
    { name: "Knife", price: "150", img: "case2.png.webp" },
    { name: "Elite", price: "300", img: "case3.png.webp" },
    { name: "Dragon", price: "500", img: "case4.png.webp" },
    { name: "Glove", price: "800", img: "case5.png.png" },
    { name: "Winter", price: "400", img: "case6.png.webp" },
    { name: "Summer", price: "400", img: "case7.png.webp" },
    { name: "Gold", price: "1000", img: "case8.png.png" },
    { name: "Mystic", price: "750", img: "case9.png.png" },
    { name: "Pro", price: "2000", img: "case10.png.png" }
];

const grid = document.getElementById('cases-grid');
grid.innerHTML = ""; 

cases.forEach(item => {
    grid.innerHTML += `
        <div class="case-card">
            <img src="img/${item.img}" alt="case" style="width: 80px;">
            <p>${item.name}</p>
            <button>${item.price} Coin</button>
        </div>
    `;
});

const grid = document.getElementById('cases-grid');
cases.forEach(item => {
    grid.innerHTML += `
        <div class="case-card">
            <img src="img/${item.img}" alt="case">
            <p>${item.name}</p>
            <button>${item.price} Coin</button>
        </div>
    `;
});;

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
