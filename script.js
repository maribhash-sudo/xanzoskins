const tg = window.Telegram.WebApp;
tg.expand();

const caseData = [
    { id: 1, name: "Chroma Case", img: "case1.png" },
    { id: 2, name: "Gamma Case", img: "case2.png" },
    { id: 3, name: "Spectrum Case", img: "case3.png" },
    { id: 4, name: "Prisma Case", img: "case4.png" },
    { id: 5, name: "Danger Zone", img: "case5.png" },
    { id: 6, name: "Clutch Case", img: "case6.png" },
    { id: 7, name: "Horizon Case", img: "case7.png" },
    { id: 8, name: "Phoenix Case", img: "case8.png" },
    { id: 9, name: "Wildfire Case", img: "case9.png" },
    { id: 10, name: "Snakebite Case", img: "case10.png" }
];

function renderCases() {
    const container = document.getElementById('cases-grid');
    if (!container) return;
    container.innerHTML = caseData.map(c => `
        <div class="case-card" onclick="openCase(${c.id})">
            <img src="img/${c.img}" class="case-img">
            <div class="case-name">${c.name}</div>
        </div>
    `).join('');
}

function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) targetPage.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');
    
    tg.HapticFeedback.impactOccurred('medium');
}

function openCase(id) {
    alert("Keys ochilmoqda: " + id);
}

window.onload = () => {
    renderCases();
};
