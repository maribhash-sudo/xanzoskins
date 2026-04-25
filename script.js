// 1. Telegram WebApp-ni eng birinchi bo'lib ishga tushiramiz
const tg = window.Telegram.WebApp;

// Telegram interfeysini to'liq ekranga yoyish va tayyorligini bildirish
if (tg) {
    tg.expand();
    tg.ready();
    // Tepada (Header) rangini qora qilish (telefon tepasi chiroyli ko'rinishi uchun)
    tg.setHeaderColor('#050505');
    tg.setBackgroundColor('#050505');
}

// 2. Mobil qurilmalarda "Scroll" (siljish) muammosini oldini olish uchun Viewport balandligini sozlash
function setDocHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', setDocHeight);
window.addEventListener('orientationchange', setDocHeight);
setDocHeight();

// 3. Keyslar datasi (Rasmlar yo'llari o'zgarishsiz qoldi)
const caseData = [
    { id: 1, name: "Kilowatt Case", img: "./img/case1.png" },
    { id: 2, name: "Revolution Case", img: "./img/case2.webp" },
    { id: 3, name: "Recoil Case", img: "./img/case3.webp" },
    { id: 4, name: "Dreams & Nightmares", img: "./img/case4.webp" },
    { id: 5, name: "Snakebite Case", img: "./img/case5.png" },
    { id: 6, name: "Broken Fang", img: "./img/case6.webp" },
    { id: 7, name: "Fracture Case", img: "./img/case7.webp" },
    { id: 8, name: "Prisma 2 Case", img: "./img/case8.png" },
    { id: 9, name: "CS20 Case", img: "./img/case9.png" },
    { id: 10, name: "Shattered Web", img: "./img/case10.png" }
];

// 4. Keyslarni ekranga render qilish
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

// 5. Sahifani almashtirish funksiyasi (Takomillashtirildi)
function showPage(pageId, btn) {
    // Sahifalarni yashirish
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // Tanlangan sahifani ko'rsatish
    const targetPage = document.getElementById('page-' + pageId) || document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Navigatsiyadagi aktiv tugmani yangilash
    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('active');
    });
    
    if (btn) {
        btn.classList.add('active');
    } else {
        const targetBtn = document.querySelector(`.nav-btn[onclick*="'${pageId}'"]`);
        if (targetBtn) targetBtn.classList.add('active');
    }
    
    // HapticFeedback (Tebranish)
    if (tg && tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }
    
    // Sahifa almashganda tepaga qaytarish (scroll reset)
    window.scrollTo(0, 0);
}

// 6. Keys ochish (Telegram xabarnomasi bilan)
function openCase(id) {
    const selectedCase = caseData.find(c => c.id === id);
    const caseName = selectedCase ? selectedCase.name : id;

    if (tg && tg.showAlert) {
        tg.showAlert(`📦 ${caseName} ochilmoqda...`);
    } else {
        alert("Keys ochilmoqda: " + caseName);
    }
}

// 7. Sahifa yuklanganda barcha funksiyalarni ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    renderCases();
    
    // Boshlang'ich sahifani (Bonus) navigatsiyada aktiv qilish
    const initialBtn = document.querySelector('.nav-btn[onclick*="showPage(\'bonus\'"]');
    if (initialBtn) {
        initialBtn.classList.add('active');
    }
    
    // Ilovani to'liq yuklanganini Telegramga bildirish
    if (tg) {
        tg.ready();
    }
});
