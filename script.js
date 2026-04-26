// A. Sahifalar va Header nazorati
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    const header = document.getElementById('main-header');
    if (header) header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if (element) element.classList.add('active');

    if (pageId === 'inventory') renderInventory();
    updateUIBalance();
}

// BALANSNI SAQLASH VA YANGILASH
function updateBalance(amount) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let currentBal = val ? parseInt(val) : 10000;
        let newBal = currentBal + amount;
        tg.CloudStorage.setItem('userBalance', newBal.toString());
        let balEl = document.getElementById('balance');
        if(balEl) balEl.innerText = newBal;
        updateUIBalance();
    });
}

function updateUIBalance() {
    let balEl = document.getElementById('balance');
    if (!balEl) return;
    let bal = balEl.innerText;
    let largeBal = document.getElementById('balance-large');
    if(largeBal) largeBal.innerText = bal;
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

// --- 500 LIK KEYS UCHUN SKINLAR ---
const budgetSkins = [
    { name: "AK-47", img: "img/AK47.png", price: 500 },
    { name: "Deagle White", img: "img/DEAGLEWHITE.png", price: 700 },
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 300 },
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 200 },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAINT.png", price: 900 },
    { name: "M4A1-S Red", img: "img/M4A1-SRED.png", price: 850 },
    { name: "Mac 10", img: "img/MAC10.png", price: 400 },
    { name: "MP5", img: "img/MP5.png", price: 350 },
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 250 },
    { name: "USP Tropic", img: "img/USP-TOPIC.png", price: 1500 }
];
let currentWinningSkin = null;

let tasks = [
    { id: 'tg', name: {uz: "Telegram Obuna", ru: "Подписка Telegram", en: "Join Telegram"}, reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: {uz: "Instagram Obuna", ru: "Подписка Instagram", en: "Follow Instagram"}, reward: 250, done: false, link: 'https://instagram.com/' }
];

// --- TO'LOV PAKETLARI ---
const uzsPackages = [
    { coins: 25000, price: "15 000 UZS" }, { coins: 62500, price: "35 000 UZS" },
    { coins: 125000, price: "70 000 UZS" }, { coins: 312500, price: "170 000 UZS" },
    { coins: 625000, price: "340 000 UZS" }, { coins: 1250000, price: "680 000 UZS" },
    { coins: 2500000, price: "1 300 000 UZS" }, { coins: 5000000, price: "2 500 000 UZS" },
    { coins: 10000000, price: "4 800 000 UZS" }, { coins: 12000000, price: "5 500 000 UZS" }
];

const usdPackages = [
    { coins: 25000, price: "1.8 $" }, { coins: 62500, price: "4.05 $" },
    { coins: 125000, price: "7.8 $" }, { coins: 312500, price: "18.75 $" },
    { coins: 625000, price: "37.5 $" }, { coins: 1250000, price: "75.0 $" },
    { coins: 2500000, price: "150.0 $" }, { coins: 5000000, price: "260.0 $" },
    { coins: 10000000, price: "500.0 $" }, { coins: 12000000, price: "750.0 $" }
];

const translations = {
    uz: { 
        topup: "TO'LDIRISH", cases_title: "CASES", active_tasks: "FAOL VAZIFALAR", completed: "BAJARILGAN", 
        inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", 
        select_lang: "Tilni tanlang:", trade_link: "Steam Trade Link:", save_btn: "SAQLASH", claim_btn: "OLISH", 
        done_btn: "BAJARILDI", balance_desc: "Sizning balansingiz", bonus_title: "DOIMIY BONUSLAR", 
        daily_reward: "Kunlik mukofot", daily_desc: "+50 dan 5000 COINgacha", referral_title: "Do'stlarni taklif qilish", 
        referral_desc: "Har bir do'st uchun +500 COIN", nick_title: "Nikga bot nomini qo'shish", nick_desc: "Har 24 soatda +50 COIN", 
        link_btn: "LINK", check_btn: "TEKSHIRISH", profile_title: "Mening profilim", upgrade_title: "Upgrade", 
        trade_title: "Trade Link", community_title: "Hamjamiyat", settings_title: "Sozlamalar"
    },
    ru: { 
        topup: "ПОПОЛНИТЬ", cases_title: "КЕЙСЫ", active_tasks: "ЗАДАНИЯ", completed: "ВЫПОЛНЕНО", 
        inventory_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", 
        select_lang: "Выберите язык:", trade_link: "Steam Trade Link:", save_btn: "СОХРАНИТЬ", claim_btn: "ПОЛУЧИТЬ", 
        done_btn: "ВЫПОЛНЕНО", balance_desc: "Ваш баланс", bonus_title: "ПОСТОЯННЫЕ БОНУСЫ", 
        daily_reward: "Ежедневная награда", daily_desc: "От 50 до 5000 COIN", referral_title: "Пригласить друзей", 
        referral_desc: "За каждого друга +500 COIN", nick_title: "Добавить имя бота", nick_desc: "Каждые 24 часа +50 COIN", 
        link_btn: "ССЫЛКА", check_btn: "ПРОВЕРИТЬ", profile_title: "Мой профиль", upgrade_title: "Апгрейд", 
        trade_title: "Трейд ссылка", community_title: "Сообщество", settings_title: "Настройки"
    },
    en: { 
        topup: "TOP UP", cases_title: "CASES", active_tasks: "ACTIVE TASKS", completed: "COMPLETED", 
        inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", 
        select_lang: "Select Language:", trade_link: "Steam Trade Link:", save_btn: "SAVE", claim_btn: "CLAIM", 
        done_btn: "DONE", balance_desc: "Your balance", bonus_title: "DAILY BONUSES", 
        daily_reward: "Daily Reward", daily_desc: "+50 to 5000 COIN", referral_title: "Invite Friends", 
        referral_desc: "Per friend +500 COIN", nick_title: "Add Bot Name to Nick", nick_desc: "Every 24h +50 COIN", 
        link_btn: "LINK", check_btn: "CHECK", profile_title: "My Profile", upgrade_title: "Upgrade", 
        trade_title: "Trade Link", community_title: "Community", settings_title: "Settings"
    }
};


// C. Tilni boshqarish
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
    localStorage.setItem('lang', lang);
    applyLanguage(lang);
    renderCases();
    renderTasks();
    const settingsContent = document.getElementById('settings-content');
    if (settingsContent) settingsContent.style.display = 'none';
}

// D. Render funksiyalari
function renderCases() {
    const lang = localStorage.getItem('lang') || 'uz';
    const grid = document.getElementById('cases-grid');
    if(!grid) return;
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
    const lang = localStorage.getItem('lang') || 'uz';
    const active = document.getElementById('active-tasks-list');
    const done = document.getElementById('done-tasks-list');
    if(!active) return;
    active.innerHTML = ""; done.innerHTML = "";
    tasks.forEach(t => {
        const btnText = t.done ? translations[lang].done_btn : translations[lang].claim_btn;
        const card = `
        <div class="task-card-pro">
            <div class="task-info-main">
                <div class="task-icon-circle">📱</div>
                <div class="task-text-content">
                    <h4>${t.name[lang]}</h4>
                    <p style="display:flex; align-items:center; gap:5px;"><img src="img/nav_diamond.png" style="width:14px;"> +${t.reward}</p>
                </div>
            </div>
            <button class="btn-action-pro" onclick="completeTask('${t.id}')">${btnText}</button>
        </div>`;
        t.done ? done.innerHTML += card : active.innerHTML += card;
    });
}

// TO'LOV FUNKSIYALARI
function renderTopUpList(containerId, data) {
    const list = document.getElementById(containerId);
    if (!list) return;
    list.innerHTML = "";
    data.forEach(p => {
        list.innerHTML += `
            <div class="package-item" onclick="alert('Demo: ${p.coins} Coin olindi!'); updateBalance(${p.coins}); showPage('cases', document.querySelector('.nav-btn[onclick*=\\'cases\\']'));">
                <div class="package-info">${p.coins.toLocaleString()} Coin</div>
                <div class="package-price">${p.price}</div>
            </div>`;
    });
}

// ROULETTE FUNKSIYASI (QO'SHILDI)
function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}

function startBudgetRoulette() {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        if (bal < 500) { alert("Balans yetarli emas!"); return; }
        updateBalance(-500); 
        
        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        if (!modal || !track) { console.log("Modal yoki track topilmadi"); return; }

        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";
        
        for (let i = 0; i < 50; i++) {
            let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
            track.innerHTML += `<div class="roulette-item"><img src="${s.img}" style="width:100px;"></div>`;
            if (i === 40) currentWinningSkin = s;
        }

        setTimeout(() => {
            track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
            track.style.top = `-${40 * 160 - 80}px`; 
        }, 100);

        setTimeout(() => {
            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            document.getElementById('won-skin-img').src = currentWinningSkin.img;
            document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
            addToInventory(currentWinningSkin);
        }, 5200);
    });
}

// E. Interfeys funksiyalari
function toggleSettings() { const content = document.getElementById('settings-content'); if(content) content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none'; }
function toggleTrade() { const section = document.getElementById('trade-input-section'); if(section) section.style.display = (section.style.display === 'none' || section.style.display === '') ? 'block' : 'none'; }
function completeTask(id) { const t = tasks.find(x => x.id === id); if (t && !t.done) { t.done = true; updateBalance(t.reward); if(t.link) window.open(t.link, '_blank'); renderTasks(); } }

// F. Init
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    renderTopUpList('uzs-list', uzsPackages);
    renderTopUpList('usd-list', usdPackages);
    const lang = localStorage.getItem('lang') || 'uz';
    applyLanguage(lang);
    renderCases();
    renderTasks();
});
