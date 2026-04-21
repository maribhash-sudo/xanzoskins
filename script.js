const cases = [
    { name: "Budget", price: "500", img: "case1.png" },
    { name: "Starter", price: "1500", img: "case2.png" },
    { name: "Basic", price: "2500", img: "case3.png" },
    { name: "Silver", price: "3500", img: "case4.png" },
    { name: "Gold", price: "4500", img: "case5.png" },
    { name: "Elite", price: "5500", img: "case6.png" },
    { name: "Master", price: "6500", img: "case7.png" },
    { name: "Pro", price: "7500", img: "case8.png" },
    { name: "Legend", price: "8500", img: "case9.png" },
    { name: "God", price: "10000", img: "case10.png" }
];

const grid = document.getElementById('cases-grid');
grid.innerHTML = ""; 

cases.forEach(item => {
    grid.innerHTML += `
        <div class="case-card">
            <img src="img/${item.img}" alt="${item.name}">
            <p>${item.name}</p>
            <button>${item.price} Coin</button>
        </div>
    `;
});
