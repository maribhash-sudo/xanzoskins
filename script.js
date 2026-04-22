function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

const cases = [
    { name: "Budget", price: "500", img: "case1.png" },
    { name: "Starter", price: "1500", img: "case2.webp" },
    { name: "Basic", price: "2500", img: "case3.webp" },
    { name: "Silver", price: "3500", img: "case4.webp" },
    { name: "Gold", price: "4500", img: "case5.png" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('cases-grid');
    cases.forEach(c => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}">
                <p>${c.name}</p>
                <button>${c.price} Coin</button>
            </div>`;
    });
});
