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

// 1. 10 ta Keyslar
const cases = [
    { name: {uz: "Budget", ru: "Бюджет", en: "Budget"}, price: 500, img: "case1.png" },
    { name: {uz: "Starter", ru: "Стартовый", en: "Starter"}, price: 1500, img: "case2.webp" },
    { name: {uz: "Basic", ru: "Базовый", en: "Basic"}, price: 2500, img: "case3.webp" },
    { name: {uz: "Silver", ru: "Серебро", en: "Silver"}, price: 3500, img: "case4.webp" },
    { name: {uz: "Gold", ru: "Золото", en: "Gold"}, price: 4500, img: "case5.png" },
    { name: {uz: "Elite", ru: "Элита", en: "Elite"}, price: 5500, img: "case6.webp" },
    { name: {uz: "Master", ru: "Мастер", en: "Master"}, price: 6500, img: "case7.webp" },
    { name: {uz: "Pro", ru: "Профи", en: "Pro"}, price: 7500, img: "case8.png" },
    { name: {uz: "Legend", ru: "Легенда", en: "Legend"}, price: 8500, img: "case9.png" },
    { name: {uz: "God", ru: "Бог", en: "God"}, price: 10000, img: "case10.png" }
];

// 2. Vazifalar
let tasks = [
    { id: 'tg', name: {uz: "Telegram Obuna", ru: "Подписка Telegram", en: "Join Telegram"}, reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: {uz: "Instagram Obuna", ru: "Подписка Instagram", en: "Follow Instagram"}, reward: 250, done: false, link: 'https://instagram.com/' }
];

const translations = {
    uz: { topup: "TO'LDIRISH", cases_title: "CASES", active_tasks: "FAOL VAZIFALAR", completed: "BAJARILGAN", inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Tilni tanlang:", trade_link: "Steam Trade Link:", save_btn: "SAQLASH" },
    ru: { topup: "ПОПОЛНИТЬ", cases_title: "КЕЙСЫ", active_tasks: "ЗАДАНИЯ", completed: "ВЫПОЛНЕНО", inventory_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", select_lang: "Выберите язык:", trade_link: "Steam Trade Link:", save_btn: "СОХРАНИТЬ" },
    en: { topup: "TOP UP", cases_title: "CASES", active_tasks: "ACTIVE TASKS", completed: "COMPLETED", inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Select Language:", trade_link: "Steam Trade Link:", save_btn: "SAVE" }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
    });
    renderCases();
    renderTasks();
}

// YAQILGAN QISM: Budget tugmasi uchun ruletkani ulash
function renderCases() {
    const lang = localStorage.getItem('lang') || 'uz';
    const grid = document.getElementById('cases-grid');
    if(!grid) return;
    grid.innerHTML = "";
    cases.forEach(c => {
        // Agar nomi Budget bo'lsa, ruletka ishga tushadi
        let clickAction = (c.name.uz === "Budget") ? 'onclick="startBudgetRoulette()"' : '';
        grid.innerHTML += `<div class="case-card"><img src="img/${c.img}"><p>${c.name[lang]}</p><button ${clickAction}>${c.price} COIN</button></div>`;
    });
}

function renderTasks() {
    const lang = localStorage.getItem('lang') || 'uz';
    const active = document.getElementById('active-tasks-list');
    const done = document.getElementById('done-tasks-list');
    if(!active) return;
    active.innerHTML = ""; done.innerHTML = "";
    tasks.forEach(t => {
        const card = `<div class="task-card">
            <div class="task-info"><span>${t.name[lang]}</span><small>+${t.reward} COIN</small></div>
            <button class="btn-task ${t.done ? 'done-btn' : ''}" onclick="completeTask('${t.id}')">${t.done ? 'DONE' : 'CLAIM'}</button>
        </div>`;
        t.done ? done.innerHTML += card : active.innerHTML += card;
    });
}

function completeTask(id) {
    const t = tasks.find(x => x.id === id);
    if (!t.done) {
        t.done = true;
        let bal = parseInt(document.getElementById('balance').innerText);
        document.getElementById('balance').innerText = bal + t.reward;
        if(t.link) window.open(t.link, '_blank');
        renderTasks();
    }
}

function saveSteamLink() {
    const link = document.getElementById('tradeLinkInput').value;
    localStorage.setItem('tradeLink', link);
    alert("Saqlandi!");
}

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem('lang') || 'uz';
    setLanguage(lang);
    renderCases();
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe?.user) document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
});
