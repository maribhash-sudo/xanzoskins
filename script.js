function showSection(sectionId, element) {
    document.querySelectorAll('.app-section').forEach(s => s.classList.remove('active'));
    document.getElementById(`section-${sectionId}`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// Keyslarni yuklash
const cases = [{ name: "Budget", price: "500", img: "case1.png" }, { name: "Starter", price: "1500", img: "case2.webp" }];
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('cases-grid');
    cases.forEach(c => {
        grid.innerHTML += `<div class="case-card"><img src="img/${c.img}" style="width:100%"><p>${c.name}</p><button>${c.price} Coin</button></div>`;
    });
});
