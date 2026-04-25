const cases = [
    { name: "Budget", price: 500, img: "case1.png" },
    { name: "Starter", price: 1500, img: "case2.webp" },
    { name: "Basic", price: 2500, img: "case3.webp" },
    { name: "Silver", price: 3500, img: "case4.webp" }
];

// 1. Sahifalar navigatsiyasi
function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
}

// 2. Cases render
function renderCases() {
    const grid = document.getElementById('cases-grid');
    if(!grid) return;
    grid.innerHTML = cases.map(c => `
        <div class="case-item" style="background:#111; border:1px solid #333; padding:10px; border-radius:10px; text-align:center;">
            <img src="img/${c.img}" style="width:100%;">
            <p>${c.name}</p>
            <button onclick="startRoulette()">Ochish</button>
        </div>
    `).join('');
}

// 3. Roulette Placeholder
function startRoulette() {
    alert("Ruletka ishga tushdi!");
    document.getElementById('roulette-modal').classList.add('active');
}

// 4. Balans
function updateUIBalance() {
    const bal = localStorage.getItem('userBalance') || 10000;
    document.getElementById('balance').innerText = bal;
}

document.addEventListener('DOMContentLoaded', () => {
    renderCases();
    updateUIBalance();
});
