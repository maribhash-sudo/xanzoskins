// Telegram WebApp-ni kengaytirish
const tg = window.Telegram.WebApp;
if (tg.expand) {
    tg.expand();
}

// Keyslar datasi (Rasmlar yo'llari to'g'ri: ./img/...)
const caseData = [
    { id: 1, name: "Chroma Case", img: "./img/case1.png" },
    { id: 2, name: "Gamma Case", img: "./img/case2.png" },
    { id: 3, name: "Spectrum Case", img: "./img/case3.png" },
    { id: 4, name: "Prisma Case", img: "./img/case4.png" },
    { id: 5, name: "Danger Zone", img: "./img/case5.png" },
    { id: 6, name: "Clutch Case", img: "./img/case6.png" },
    { id: 7, name: "Horizon Case", img: "./img/case7.png" },
    { id: 8, name: "Phoenix Case", img: "./img/case8.png" },
    { id: 9, name: "Wildfire Case", img: "./img/case9.png" },
    { id: 10, name: "Snakebite Case", img: "./img/case10.png" }
];

// Keyslarni ekranga render qilish
function renderCases() {
    const container = document.getElementById('cases-grid');
    if (!container) return;
    container.innerHTML = caseData.map(c => `
        <div class="case-card" onclick="openCase(${c.id})">
            <img src="${c.img}" class="case-img" alt="${c.name}">
            <div class="case-name">${c.name}</div>
        </div>
    `).join('');
}

// Sahifani almashtirish funksiyasi
function showPage(pageId, btn) {
    // 1. Hamma sahifalarni yashirish
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // 2. Tanlangan sahifani ko'rsatish
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        // Agar page- IDsi noto'g'ri bo'lsa, to'g'ridan-to'g'ri IDni qidirish
        const directPage = document.getElementById(pageId);
        if (directPage) directPage.classList.add('active');
    }
    
    // 3. Navigatsiyadagi aktiv tugmani yangilash
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('active');
    });
    if (btn) {
        btn.classList.add('active');
    } else {
        // Agar tugma yuborilmagan bo'lsa, onclick-da pageId bor tugmani topish
        const targetBtn = document.querySelector(`.nav-btn[onclick*="'${pageId}'"]`);
        if (targetBtn) targetBtn.classList.add('active');
    }
    
    // 4. Tebranish effekti
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
}

// Keys ochish (Hozircha alert)
function openCase(id) {
    if (tg.showAlert) {
        tg.showAlert("Keys ochilmoqda: " + id);
    } else {
        alert("Keys ochilmoqda: " + id);
    }
}

// Sahifa yuklanganda ishlash
window.onload = () => {
    // 1. Keyslarni render qilish
    renderCases();
    
    // 2. Telegram WebApp-ni tayyorligini bildirish
    if (tg.ready) {
        tg.ready();
    }
    
    // 3. Boshlang'ich sahifani (Bonus) navigatsiyada aktiv qilish
    const initialBtn = document.querySelector('.nav-btn[onclick*="showPage(\'bonus\'"]');
    if (initialBtn) {
        initialBtn.classList.add('active');
    }
};
