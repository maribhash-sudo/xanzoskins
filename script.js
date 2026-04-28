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

// BALANSNI SAQLASH VA YANGILASH (CloudStorage orqali)
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
    uz: { 
        topup: "TO'LDIRISH", 
        cases_title: "CASES", 
        active_tasks: "FAOL VAZIFALAR", 
        completed: "BAJARILGAN", 
        inventory_title: "INVENTORY", 
        nav_bonus: "Bonus", 
        nav_cases: "Cases", 
        nav_inv: "Inv", 
        nav_profile: "Profile", 
        select_lang: "Tilni tanlang:", 
        trade_link: "Steam Trade Link:", 
        save_btn: "SAQLASH", 
        claim_btn: "OLISH", 
        done_btn: "BAJARILDI",
        balance_desc: "Sizning balansingiz",
        bonus_title: "DOIMIY BONUSLAR",
        daily_reward: "Kunlik mukofot",
        daily_desc: "+50 dan 5000 COINgacha",
        referral_title: "Do'stlarni taklif qilish",
        referral_desc: "Har bir do'st uchun +500 COIN",
        nick_title: "Nikga bot nomini qo'shish",
        nick_desc: "Har 24 soatda +50 COIN",
        link_btn: "LINK",
        check_btn: "TEKSHIRISH"
    },
    ru: { 
        topup: "ПОПОЛНИТЬ", 
        cases_title: "КЕЙСЫ", 
        active_tasks: "ЗАДАНИЯ", 
        completed: "ВЫПОЛНЕНО", 
        inventory_title: "ИНВЕНТАРЬ", 
        nav_bonus: "Бонус", 
        nav_cases: "Кейсы", 
        nav_inv: "Инв.", 
        nav_profile: "Профиль", 
        select_lang: "Выберите язык:", 
        trade_link: "Steam Trade Link:", 
        save_btn: "СОХРАНИТЬ", 
        claim_btn: "ПОЛУЧИТЬ", 
        done_btn: "ВЫПОЛНЕНО",
        balance_desc: "Ваш баланс",
        bonus_title: "ПОСТОЯННЫЕ БОНУСЫ",
        daily_reward: "Ежедневная награда",
        daily_desc: "От 50 до 5000 COIN",
        referral_title: "Пригласить друзей",
        referral_desc: "За каждого друга +500 COIN",
        nick_title: "Добавить имя бота",
        nick_desc: "Каждые 24 часа +50 COIN",
        link_btn: "ССЫЛКА",
        check_btn: "ПРОВЕРИТЬ"
    },
    en: { 
        topup: "TOP UP", 
        cases_title: "CASES", 
        active_tasks: "ACTIVE TASKS", 
        completed: "COMPLETED", 
        inventory_title: "INVENTORY", 
        nav_bonus: "Bonus", 
        nav_cases: "Cases", 
        nav_inv: "Inv", 
        nav_profile: "Profile", 
        select_lang: "Select Language:", 
        trade_link: "Steam Trade Link:", 
        save_btn: "SAVE", 
        claim_btn: "CLAIM", 
        done_btn: "DONE",
        balance_desc: "Your balance",
        bonus_title: "DAILY BONUSES",
        daily_reward: "Daily Reward",
        daily_desc: "+50 to 5000 COIN",
        referral_title: "Invite Friends",
        referral_desc: "Per friend +500 COIN",
        nick_title: "Add Bot Name to Nick",
        nick_desc: "Every 24h +50 COIN",
        link_btn: "LINK",
        check_btn: "CHECK"
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

function completeTask(id) {
    const t = tasks.find(x => x.id === id);
    if (!t.done) {
        t.done = true;
        updateBalance(t.reward);
        if(t.link) window.open(t.link, '_blank');
        renderTasks();
    }
}

function saveSteamLink() {
    const link = document.getElementById('tradeLinkInput').value;
    window.Telegram.WebApp.CloudStorage.setItem('tradeLink', link);
    alert("Saqlandi!");
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    if(!grid) return;
    grid.innerHTML = "";
    window.Telegram.WebApp.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.forEach((item, index) => {
            grid.innerHTML += `
                <div class="case-card">
                    <img src="${item.img}" style="width:60px">
                    <p>${item.name}</p>
                    <small style="display:flex; justify-content:center; align-items:center; gap:3px;">
                        <img src="img/nav_diamond.png" style="width:12px;"> ${item.price}
                    </small>
                    <button onclick="withdrawItem(${index})" style="font-size:10px;">Steam</button>
                </div>`;
        });
    });
}

function sellAllInventory() {
    window.Telegram.WebApp.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        if(inv.length === 0) { alert("Inventar bo'sh!"); return; }
        let total = 0;
        inv.forEach(i => total += i.price);
        updateBalance(total);
        window.Telegram.WebApp.CloudStorage.setItem('inventory', '[]');
        renderInventory();
        alert("Barchasi sotildi! +" + total + " COIN");
    });
}

function withdrawItem(index) {
    window.Telegram.WebApp.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        alert("Steamga yuborildi!");
        inv.splice(index, 1);
        window.Telegram.WebApp.CloudStorage.setItem('inventory', JSON.stringify(inv));
        renderInventory();
    });
}

function claimDailyBonus() {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('lastClaimDate', (err, lastClaim) => {
        let today = new Date().toDateString();
        if (lastClaim === today) {
            alert("Bugun bonusni olib bo'ldingiz!");
            return;
        }
        tg.CloudStorage.getItem('streakDay', (err, streak) => {
            let dayCount = streak ? parseInt(streak) : 0;
            dayCount++;
            if (dayCount > 30) dayCount = 1;
            let reward = 50 + (dayCount - 1) * 163;
            if (dayCount === 30) reward = 5000;
            
            updateBalance(Math.round(reward));
            tg.CloudStorage.setItem('lastClaimDate', today);
            tg.CloudStorage.setItem('streakDay', dayCount.toString());
            
            let msgEl = document.getElementById('bonus-message');
            if(msgEl) msgEl.innerText = dayCount + "-kun: " + Math.round(reward) + " COIN olindi!";
            alert("Tabriklaymiz!");
            let btn = document.getElementById('bonus-btn');
            if(btn) btn.disabled = true;
        });
    });
}

function copyRefLink() {
    const refInput = document.getElementById('ref-link');
    refInput.style.display = 'block';
    refInput.select();
    document.execCommand('copy');
    refInput.style.display = 'none';
    alert("Havola nusxalandi!");
}

function checkNickName() {
    const tg = window.Telegram.WebApp;
    const user = tg.initDataUnsafe?.user;
    if (!user) { alert("Xatolik!"); return; }
    const fullName = ((user.first_name || "") + " " + (user.last_name || "")).toLowerCase();
    const requiredNick = "@xanzoskins_bot";
    
    tg.CloudStorage.getItem('lastNickCheck', (err, lastNickCheck) => {
        let now = Date.now();
        if (lastNickCheck && (now - parseInt(lastNickCheck) < 24 * 60 * 60 * 1000)) {
            alert("Siz bugun tekshirdingiz!");
            return;
        }
        
        if (fullName.includes(requiredNick.toLowerCase())) {
            updateBalance(50);
            tg.CloudStorage.setItem('lastNickCheck', now.toString());
            alert("Muofot olindi!");
        } else {
            alert("Ismingizda @" + requiredNick + " topilmadi.");
        }
    });
}

// BOT ISHGA TUSHGANDA MA'LUMOTLARNI YUKLASH
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    // Balansni yuklash
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        document.getElementById('balance').innerText = val ? val : '10000';
        updateUIBalance();
    });
    
    const lang = localStorage.getItem('lang') || 'uz';
    setLanguage(lang);
    renderCases();
    renderTasks();
    
    if (tg.initDataUnsafe?.user) {
        let userNameEl = document.getElementById('user-name');
        if(userNameEl) userNameEl.innerText = tg.initDataUnsafe.user.first_name;
        
        let refInput = document.getElementById('ref-link');
        if(refInput) refInput.value = "https://t.me/Xanzo_skins_bot?start=" + tg.initDataUnsafe.user.id;
    }

    tg.CloudStorage.getItem('lastClaimDate', (err, lastClaim) => {
        let btn = document.getElementById('bonus-btn');
        if (lastClaim === new Date().toDateString() && btn) {
            btn.disabled = true;
        }
    });
});

function toggleSettings() {
    const settings = document.getElementById('settings-content');
    if (settings.style.display === 'none') {
        settings.style.display = 'block';
    } else {
        settings.style.display = 'none';
    }
}

function toggleTrade() {
    const tradeSection = document.getElementById('trade-input-section');
    if (tradeSection.style.display === 'none') {
        tradeSection.style.display = 'block';
    } else {
        tradeSection.style.display = 'none';
    }
}
