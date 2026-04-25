const tg = window.Telegram.WebApp;
tg.expand();

// GitHub-dagi fayl turlarini aniq yozdik (png va webp)
const caseData = [
    { id: 1, name: "Kilowatt Case", img: "./img/case1.png" },
    { id: 2, name: "Revolution Case", img: "./img/case2.webp" },
    { id: 3, name: "Recoil Case", img: "./img/case3.webp" },
    { id: 4, name: "Dreams Case", img: "./img/case4.webp" },
    { id: 5, name: "Snakebite Case", img: "./img/case5.png" },
    { id: 6, name: "Broken Fang", img: "./img/case6.webp" },
    { id: 7, name: "Fracture Case", img: "./img/case7.webp" },
    { id: 8, name: "Prisma 2 Case", img: "./img/case8.png" },
    { id: 9, name: "CS20 Case", img: "./img/case9.png" },
    { id: 10, name: "Shattered Web", img: "./img/case10.png" }
];

function renderCases() {
    const container = document.getElementById('cases-grid');
    if (!container) return;
    container.innerHTML = caseData.map(c => `
        <div class="case-card" onclick="openCase('${c.name}')">
            <img src="${c.img}" class="case-img" alt="${c.name}">
            <div class="case-name">${c.name}</div>
        </div>
    `).join('');
}

function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    if(tg.HapticFeedback) tg.HapticFeedback.impactOccurred('medium');
}

function openCase(name) {
    alert("Keys ochilmoqda: " + name);
}

window.onload = () => {
    renderCases();
    tg.ready();
};
