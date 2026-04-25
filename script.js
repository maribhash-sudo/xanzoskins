// A. Sahifalar va Header nazorati
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${pageId}`);
    if (target) target.classList.add('active');
    
    const header = document.getElementById('main-header');
    if (header) header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if (element) element.classList.add('active');

    if (pageId === 'inventory') renderInventory();
    updateUIBalance();
}

// B. Ma'lumotlar
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

let tasks = [
    { id: 'tg', name: {uz: "Telegram Obuna", ru: "Подписка Telegram", en: "Join Telegram"}, reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: {uz: "Instagram Obuna", ru: "Подписка Instagram", en: "Follow Instagram"}, reward: 250, done: false, link: 'https://instagram.com/' }
];

const translations = {
    uz: {
        cases_title: "CASES", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile",
        topup: "TO'LDIRISH", balance_desc: "Sizning balansingiz", bonus_title: "DOIMIY BONUSLAR",
        daily_reward: "Kunlik mukofot", daily_desc: "+50 dan 5000 COINgacha", claim_btn: "OLISH",
        referral_title: "Do'stlarni taklif qilish", referral_desc: "Har bir do'st uchun +500 COIN",
        link_btn: "LINK", nick_title: "Nikga bot nomini qo'shish", nick_desc: "Har 24 soatda +50 COIN",
        check_btn: "TEKSHIRISH", active_tasks: "ACTIVE TASKS", completed: "COMPLETED",
        inventory_title: "INVENTORY", select_lang: "Tilni tanlang:", trade_link: "Steam Trade Link:", save_btn: "SAQLASH",
        profile_title: "Mening profilim", upgrade_title: "Upgrade", trade_title: "Trade Link", community_title: "Hamjamiyat", settings_title: "Sozlamalar"
    },
    ru: {
        cases_title: "КЕЙСЫ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль",
        topup: "ПОПОЛНИТЬ", balance_desc: "Ваш баланс", bonus_title: "БОНУСЫ",
        daily_reward: "Ежедневная награда", daily_desc: "От +50 до 5000 COIN", claim_btn: "ЗАБРАТЬ",
        referral_title: "Пригласить друзей", referral_desc: "За каждого друга +500 COIN",
        link_btn: "ССЫЛКА", nick_title: "Добавить имя бота в ник", nick_desc: "Каждые 24 часа +50 COIN",
        check_btn: "ПРОВЕРИТЬ", active_tasks: "ЗАДАНИЯ", completed: "ВЫПОЛНЕНО",
        inventory_title: "ИНВЕНТАРЬ", select_lang: "Выберите язык:", trade_link: "Steam Trade Link:", save_btn: "СОХРАНИТЬ",
        profile_title: "Мой профиль", upgrade_title: "Апгрейд", trade_title: "Трейд ссылка", community_title: "Сообщество", settings_title: "Настройки"
    },
    en: {
        cases_title: "CASES", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile",
        topup: "TOP UP", balance_desc: "Your balance", bonus_title: "DAILY BONUSES",
        daily_reward: "Daily reward", daily_desc: "+50 to 5000 COIN", claim_btn: "CLAIM",
        referral_title: "Invite friends", referral_desc: "Per friend +500 COIN",
        link_btn: "LINK", nick_title: "Add bot name to nickname", nick_desc: "Every 24h +50 COIN",
        check_btn: "CHECK", active_tasks: "ACTIVE TASKS", completed: "COMPLETED",
        inventory_title: "INVENTORY", select_lang: "Select language:", trade_link: "Steam Trade Link:", save_btn: "SAVE",
        profile_title: "My Profile", upgrade_title: "Upgrade", trade_title: "Trade Link", community_title: "Community", settings_title: "Settings"
    }
};

// C. Funksiyalar
function updateUIBalance() {
    let balEl = document.getElementById('balance');
    if (!balEl) return;
    let bal = balEl.innerText;
    let largeBal = document.getElementById('balance-large');
    if(largeBal) largeBal.innerText = bal;
}

function applyLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT') el.placeholder = translations[lang][key];
            else el.innerText = translations[lang][key];
        }
    });
}

function setLanguage(lang) {
    localStorage.setItem('userLang', lang); // Standart key: 'userLang'
    applyLanguage(lang);
    renderCases();
    renderTasks();
    const settingsContent = document.getElementById('settings-content');
    if (settingsContent) settingsContent.style.display = 'none';
}

function renderCases() {
    const lang = localStorage.getItem('userLang') || 'uz';
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = "";
    cases.forEach(c => {
        let clickAction = (c.name.uz === "Budget") ? 'onclick="startBudgetRoulette()"' : '';
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}" class="case-img coin-glow">
                <p class="case-name">${c.name[lang]}</p>
                <button class="case-buy-btn" ${clickAction}>
                    <span>${c.price}</span>
                    <img src="img/nav_diamond.png" style="width:24px; height:24px; object-fit:contain; aspect-ratio:1/1; vertical-align:middle;">
                </button>
            </div>`;
    });
}

function renderTasks() {
    const lang = localStorage.getItem('userLang') || 'uz';
    const activeCont = document.getElementById('active-tasks-list');
    const doneCont = document.getElementById('done-tasks-list');
    if (!activeCont || !doneCont) return;
    activeCont.innerHTML = "";
    doneCont.innerHTML = "";

    tasks.forEach(t => {
        const btnText = (lang === 'uz') ? (t.done ? 'BAJARILDI' : 'OLISH') : (lang === 'ru') ? (t.done ? 'ВЫПОЛНЕНО' : 'ЗАБРАТЬ') : (t.done ? 'DONE' : 'CLAIM');
        const taskHTML = `
            <div class="task-card-pro">
                <div class="task-info-main">
                    <div class="task-icon-circle">${t.id === 'tg' ? '📱' : '📸'}</div>
                    <div class="task-text-content">
                        <h4>${t.name[lang]}</h4>
                        <p>+${t.reward} COIN</p>
                    </div>
                </div>
                <button onclick="${t.done ? '' : `completeTask('${t.id}')`}" class="btn-action-pro" ${t.done ? 'disabled style="background:#555!important; cursor:default;"' : ''}>
                    ${btnText}
                </button>
            </div>`;
        t.done ? doneCont.innerHTML += taskHTML : activeCont.innerHTML += taskHTML;
    });
}

function completeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        window.open(task.link, '_blank');
        task.done = true;
        renderTasks();
    }
}

// D. Init
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    const savedLang = localStorage.getItem('userLang') || 'uz';
    applyLanguage(savedLang);
    renderCases();
    renderTasks();
});

// Sozlamalar va Trade
function toggleSettings() {
    const content = document.getElementById('settings-content');
    if(content) content.classList.toggle('active');
}
document.getElementById('trade-link-trigger')?.addEventListener('click', () => {
    const sec = document.getElementById('trade-input-section');
    if(sec) sec.style.display = (sec.style.display === 'none') ? 'block' : 'none';
});
