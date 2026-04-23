// A. Sahifalar va Header nazorati
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    const header = document.getElementById('main-header');
    header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');

    if(pageId === 'inventory') renderInventory();
    updateUIBalance();
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

// 2. Vazifalar (Ko'p tilli qilindi)
let tasks = [
    { id: 'tg', name: {uz: "Telegram kanalga obuna", ru: "Подписка на Telegram", en: "Join Telegram Channel"}, reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: {uz: "Instagramga obuna", ru: "Подписка на Instagram", en: "Follow Instagram"}, reward: 250, done: false, link: 'https://instagram.com/' }
];

// Tarjimalar ro'yxati (Bonus va Tugmalar qo'shildi)
const translations = {
    uz: { 
        topup: "TO'LDIRISH", cases_title: "CASES", active_tasks: "FAOL VAZIFALAR", completed: "BAJARILGAN", inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Tilni tanlang:", trade_link: "Steam Trade Link:", save_btn: "SAQLASH",
        bonus_title: "DOIMIY BONUSLAR", daily_reward: "Kunlik mukofot", daily_desc: "+50 dan 5000 COINgacha", referral_title: "Do'stlarni taklif qilish", referral_desc: "Har bir do'st uchun +500 COIN", nick_title: "Nikga bot nomini qo'shish", nick_desc: "Har 24 soatda +50 COIN",
        claim_btn: "OLISH", done_btn: "BAJARILDI"
    },
    ru: { 
        topup: "ПОПОЛНИТЬ", cases_title: "КЕЙСЫ", active_tasks: "ЗАДАНИЯ", completed: "ВЫПОЛНЕНО", inventory_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", select_lang: "Выберите язык:", trade_link: "Steam Trade Link:", save_btn: "СОХРАНИТЬ",
        bonus_title: "ПОСТОЯННЫЕ БОНУСЫ", daily_reward: "Ежедневная награда", daily_desc: "От 50 до 5000 COIN", referral_title: "Пригласить друзей", referral_desc: "За каждого друга +500 COIN", nick_title: "Добавить имя бота", nick_desc: "Каждые 24 часа +50 COIN",
        claim_btn: "ПОЛУЧИТЬ", done_btn: "ВЫПОЛНЕНО"
    },
    en: { 
        topup: "TOP UP", cases_title: "CASES", active_tasks: "ACTIVE TASKS", completed: "COMPLETED", inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Select Language:", trade_link: "Steam Trade Link:", save_btn: "SAVE",
        bonus_title: "DAILY BONUSES", daily_reward: "Daily Reward", daily_desc: "+50 to 5000 COIN", referral_title: "Invite Friends", referral_desc: "Per friend +500 COIN", nick_title: "Add Bot Name to Nick", nick_desc: "Every 24h +50 COIN",
        claim_btn: "CLAIM", done_btn: "DONE"
    }
};

function updateUIBalance() {
    let bal = document.getElementById('balance').innerText;
    let largeBal = document.getElementById('balance-large');
    if(largeBal) largeBal.innerText = bal;
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
    });
    renderCases();
    renderTasks();
}

function renderCases() {
    const lang = localStorage.getItem('lang') || 'uz';
    const grid = document.getElementById('cases-grid');
    if(!grid) return;
    grid.innerHTML = "";
    cases.forEach(c => {
        let clickAction = (c.name.uz === "Budget") ? 'onclick="startBudgetRoulette()"' : '';
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}">
                <p>${c.name[lang]}</p>
                <button ${clickAction}>${c.price} <img src="img/nav_diamond.png" style="width:14px; height:auto; vertical-align:middle;"></button>
            </div>`;
    });
}

function renderTasks() {
    const lang = localStorage.getItem('lang') || 'uz';
    const active = document.getElementById('active-tasks-list');
    const done = document.getElementById('done-tasks-list');
    if(!active || !done) return;
    active.innerHTML = ""; done.innerHTML = "";
    
    tasks.forEach(t => {
        // Tugma matni va vazifa nomi tanlangan tilga moslanadi
        const btnText = t.done ? translations[lang].done_btn : translations[lang].claim_btn;
        
        const card = `
        <div class="task-card-pro">
            <div class="task-info-main">
                <div class="task-icon-circle">${t.id === 'tg' ? '✈️' : '📸'}</div>
                <div class="task-text-content">
                    <h4>${t.name[lang]}</h4>
                    <p style="display:flex; align-items:center; gap:5px;">
                        <img src="img/nav_diamond.png" style="width:16px; height:auto;"> +${t.reward}
                    </p>
                </div>
            </div>
            <button class="btn-action-pro ${t.done ? 'done-btn' : ''}" onclick="completeTask('${t.id}')">${btnText}</button>
        </div>`;
        t.done ? done.innerHTML += card : active.innerHTML += card;
    });
}

function completeTask(id) {
    const t = tasks.find(x => x.id === id);
    if (!t.done) {
        t.done = true;
        let balEl = document.getElementById('balance');
        let currentBal = parseInt(balEl.innerText);
        balEl.innerText = currentBal + t.reward;
        updateUIBalance();
        if(t.link) window.open(t.link, '_blank');
        renderTasks();
    }
}

function saveSteamLink() {
    const link = document.getElementById('tradeLinkInput').value;
    localStorage.setItem('tradeLink', link);
    alert("Saqlandi!");
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    if(!grid) return;
    grid.innerHTML = "";
    let inv = JSON.parse(localStorage.getItem('inventory') || '[]');
    inv.forEach((item, index) => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="${item.img}" style="width:60px; height:auto;">
                <p>${item.name}</p>
                <small style="display:flex; justify-content
