// 1. Sahifalarni almashtirish funksiyasi
function showSection(sectionId, element) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${sectionId}`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// 2. Keyslar ro'yxati (sizning papkangizdagi fayl nomlariga mos)
const cases = [
    { name: "Budget", price: "500", img: "case1.png" },
    { name: "Starter", price: "1500", img: "case2.webp" },
    { name: "Basic", price: "2500", img: "case3.webp" },
    { name: "Silver", price: "3500", img: "case4.webp" },
    { name: "Gold", price: "4500", img: "case5.png" },
    { name: "Elite", price: "5500", img: "case6.webp" },
    { name: "Master", price: "6500", img: "case7.webp" },
    { name: "Pro", price: "7500", img: "case8.png" },
    { name: "Legend", price: "8500", img: "case9.png" },
    { name: "God", price: "10000", img: "case10.png" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('cases-grid');
    if (grid) {
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
    }
});
