// --- 1. CASES MA'LUMOTLARI ---
const cases = [
    { name: "Budget", price: 500, img: "case1.png" },
    { name: "Starter", price: 1500, img: "case2.webp" },
    { name: "Basic", price: 2500, img: "case3.webp" },
    { name: "Silver", price: 3500, img: "case4.webp" },
    { name: "Gold", price: 4500, img: "case5.png" },
    { name: "Elite", price: 5500, img: "case6.webp" },
    { name: "Master", price: 6500, img: "case7.webp" },
    { name: "Pro", price: 7500, img: "case8.png" },
    { name: "Legend", price: 8500, img: "case9.png" },
    { name: "God", price: 10000, img: "case10.png" }
];

// --- 2. SAHIFA BOSHQARUVI ---
function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    // Tugma aktivligini almashtirish
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
}

// --- 3. CASES RENDER ---
function renderCases() {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    
    grid.innerHTML = cases.map(c => `
        <div class="case-item">
            <img src="img/${c.img}" alt="${c.name}">
            <p>${c.name}</p>
            <button onclick="alert('${c.name} ochilmoqda...')">${c.price} COIN</button>
        </div>
    `).join('');
}

// --- 4. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    renderCases();
});
