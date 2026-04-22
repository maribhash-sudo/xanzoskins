// A. Sahifalar va Header nazorati
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    // Header faqat Cases sahifasida ko'rinadi
    const header = document.getElementById('main-header');
    header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');
}

// 1. 10 ta Keyslar ro'yxati
const cases = [
    { name: "tohiraka bomj", price: 500, img: "case1.png" },
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

const translations = {
    uz: {
        topup: "TO'LDIRISH",
        cases_title: "KEYS LAR",
        active_tasks: "FAOL VAZIFALAR",
        completed: "BAJARILGAN",
        select_lang: "Tilni tanlang:",
        nav_bonus: "Bonus",
        nav_cases: "Keyslar"
    },
    ru: {
        topup: "ПОПОЛНИТЬ",
        cases_title: "КЕЙСЫ",
        active_tasks: "ЗАДАНИЯ",
        completed: "ВЫПОЛНЕНО",
        select_lang: "Выберите язык:",
        nav_bonus: "Бонус",
        nav_cases: "Кейсы"
    },
    en: {
        topup: "TOP UP",
        cases_title: "CASES",
        active_tasks: "ACTIVE TASKS",
        completed: "COMPLETED",
        select_lang: "Select Language:",
        nav_bonus: "Bonus",
        nav_cases: "Cases"
    }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
    
    // Keyslarni ham qayta render qilish (agar nomlari tarjima qilinishi kerak bo'lsa)
    renderCases();
}

function renderCases() {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = "";
    cases.forEach(c => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}">
                <p style="color: #FF4500; font-weight: 800;">${c.name}</p>
                <button>${c.price} COIN</button>
            </div>`;
    });
}

function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    const header = document.getElementById('main-header');
    header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    renderCases();
    // Saqlangan tilni yuklash
    const savedLang = localStorage.getItem('lang') || 'uz';
    setLanguage(savedLang);
});
