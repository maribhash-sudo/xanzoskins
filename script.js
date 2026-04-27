// A. Sahifalar va Header nazorati
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    const header = document.getElementById('main-header');
    header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');

    if(pageId === 'inventory') renderInventory();
    
    // Top-up sahifalari uchun
    if(pageId === 'topup-uzs') renderTopup('uzs');
    if(pageId === 'topup-usd') renderTopup('usd');

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

// Har bir keysning sozlamalari (iconlar o'z fayl nomlari bilan)
const casesConfig = [
    { id: "tactical", folder: "tatcial", price: 3000, count: 98, icon: "case1.png" },
    { id: "spectrum", folder: "spectrum", price: 4000, count: 100, icon: "case2.webp" },
    { id: "clutch", folder: "clutch", price: 5000, count: 100, icon: "case3.webp" },
    { id: "urban", folder: "urban", price: 7000, count: 99, icon: "case4.webp" },
    { id: "all_in", folder: "all_in", price: 10000, count: 39, icon: "case5.png" },
    { id: "military", folder: "military", price: 15000, count: 99, icon: "case6.webp" },
    { id: "smg", folder: "smg", price: 20000, count: 100, icon: "case7.webp" },
    { id: "carbon", folder: "carbon", price: 25000, count: 80, icon: "case8.png" },
    { id: "armory", folder: "armory", price: 30000, count: 83, icon: "case9.png" },
    { id: "stattrack", folder: "stattrack", price: 50000, count: 68, icon: "case10.png" }
];

let casesDatabase = {}; 

const tacticalSkins = [ 
     { name: "AK-47 | Olive Polycam (Field-Tested)", img: "AK-47 _ Olive Polycam (Field-Tested).webp" },
    { name: "AK-47 | Olive Polycam (Well-Worn)", img: "AK-47 _ Olive Polycam (Well-Worn).webp" },
    { name: "AK-47 | Slate (Well-Worn)", img: "AK-47 _ Slate (Well-Worn).webp" },
    { name: "AK-47 | VariCamo Grey (Field-Tested)", img: "AK-47 _ VariCamo Grey (Field-Tested).webp" },
    { name: "AUG | Storm (Field-Tested)", img: "AUG _ Storm (Field-Tested).webp" },
    { name: "AWP | Capillary (Well-Worn)", img: "AWP _ Capillary (Well-Worn).webp" },
    { name: "Austin 2025 Challengers Sticker Capsule", img: "Austin 2025 Challengers Sticker Capsule.webp" },
    { name: "Charm | Baby's AK", img: "Charm _ Baby's AK.webp" },
    { name: "Charm | Backsplash", img: "Charm _ Backsplash.webp" },
    { name: "Charm | Hot Hands", img: "Charm _ Hot Hands.webp" },
    { name: "Charm | Pocket AWP", img: "Charm _ Pocket AWP.webp" },
    { name: "Charm | Stitch-Loaded", img: "Charm _ Stitch-Loaded.webp" },
    { name: "Desert Eagle | Blue Ply (Well-Worn)", img: "Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "Desert Eagle | Bronze Deco (Field-Tested)", img: "Desert Eagle _ Bronze Deco (Field-Tested).webp" },
    { name: "Desert Eagle | Serpent Strike (Field-Tested)", img: "Desert Eagle _ Serpent Strike (Field-Tested).webp" },
    { name: "Desert Eagle | Tilted (Field-Tested)", img: "Desert Eagle _ Tilted (Field-Tested).webp" },
    { name: "Dual Berettas | Hideout (Field-Tested)", img: "Dual Berettas _ Hideout (Field-Tested).webp" },
    { name: "Dual Berettas | Hydro Strike (Field-Tested)", img: "Dual Berettas _ Hydro Strike (Field-Tested).webp" },
    { name: "FAMAS | Cyanospatter (Field-Tested)", img: "FAMAS _ Cyanospatter (Field-Tested).webp" },
    { name: "FAMAS | Meow 36 (Well-Worn)", img: "FAMAS _ Meow 36 (Well-Worn).webp" },
    { name: "Five-SeveN | Flame Test (Field-Tested)", img: "Five-SeveN _ Flame Test (Field-Tested).webp" },
    { name: "Five-SeveN | Forest Night (Field-Tested)", img: "Five-SeveN _ Forest Night (Field-Tested).webp" },
    { name: "Five-SeveN | Scrawl (Well-Worn)", img: "Five-SeveN _ Scrawl (Well-Worn).webp" },
    { name: "Five-SeveN | Sky Blue (Field-Tested)", img: "Five-SeveN _ Sky Blue (Field-Tested).webp" },
    { name: "Galil AR | Acid Dart (Minimal Wear)", img: "Galil AR _ Acid Dart (Minimal Wear).webp" },
    { name: "Galil AR | Connexion (Battle-Scarred)", img: "Galil AR _ Connexion (Battle-Scarred).webp" },
    { name: "Galil AR | Control (Field-Tested)", img: "Galil AR _ Control (Field-Tested).webp" },
    { name: "Galil AR | Green Apple (Minimal Wear)", img: "Galil AR _ Green Apple (Minimal Wear).webp" },
    { name: "Galil AR | O-Ranger (Minimal Wear)", img: "Galil AR _ O-Ranger (Minimal Wear).webp" },
    { name: "Galil AR | Robin's Egg (Field-Tested)", img: "Galil AR _ Robin's Egg (Field-Tested).webp" },
    { name: "Galil AR | Rocket Pop (Field-Tested)", img: "Galil AR _ Rocket Pop (Field-Tested).webp" },
    { name: "Galil AR | Sage Spray (Field-Tested)", img: "Galil AR _ Sage Spray (Field-Tested).webp" },
    { name: "Glock-18 | Block-18 (Battle-Scarred)", img: "Glock-18 _ Block-18 (Battle-Scarred).webp" },
    { name: "Glock-18 | Moonrise (Well-Worn)", img: "Glock-18 _ Moonrise (Well-Worn).webp" },
    { name: "Glock-18 | Oxide Blaze (Well-Worn)", img: "Glock-18 _ Oxide Blaze (Well-Worn).webp" },
    { name: "Glock-18 | Shinobu (Well-Worn)", img: "Glock-18 _ Shinobu (Well-Worn).webp" },
    { name: "Glock-18 | Umbral Rabbit (Field-Tested)", img: "Glock-18 _ Umbral Rabbit (Field-Tested).webp" },
    { name: "Glock-18 | Winterized (Field-Tested)", img: "Glock-18 _ Winterized (Field-Tested).webp" },
    { name: "M249 | Gator Mesh (Field-Tested)", img: "M249 _ Gator Mesh (Field-Tested).webp" },
    { name: "M4A1-S | Boreal Forest (Field-Tested)", img: "M4A1-S _ Boreal Forest (Field-Tested).webp" },
    { name: "M4A1-S | Nitro (Field-Tested)", img: "M4A1-S _ Nitro (Field-Tested).webp" },
    { name: "M4A1-S | Wash me plz (Field-Tested)", img: "M4A1-S _ Wash me plz (Field-Tested).webp" },
    { name: "M4A4 | Choppa (Field-Tested)", img: "M4A4 _ Choppa (Field-Tested).webp" },
    { name: "M4A4 | Etch Lord (Battle-Scarred)", img: "M4A4 _ Etch Lord (Battle-Scarred).webp" },
    { name: "M4A4 | Magnesium (Well-Worn)", img: "M4A4 _ Magnesium (Well-Worn).webp" },
    { name: "M4A4 | Mainframe (Field-Tested)", img: "M4A4 _ Mainframe (Field-Tested).webp" },
    { name: "M4A4 | Naval Shred Camo (Well-Worn)", img: "M4A4 _ Naval Shred Camo (Well-Worn).webp" },
    { name: "M4A4 | Poly Mag (Battle-Scarred)", img: "M4A4 _ Poly Mag (Battle-Scarred).webp" },
    { name: "M4A4 | Poly Mag (Well-Worn)", img: "M4A4 _ Poly Mag (Well-Worn).webp" },
    { name: "M4A4 | Steel Work (Field-Tested)", img: "M4A4 _ Steel Work (Field-Tested).webp" },
    { name: "MAC-10 | Allure (Battle-Scarred)", img: "MAC-10 _ Allure (Battle-Scarred).webp" },
    { name: "MAC-10 | Candy Apple (Minimal Wear)", img: "MAC-10 _ Candy Apple (Minimal Wear).webp" },
    { name: "MAC-10 | Carnivore (Well-Worn)", img: "MAC-10 _ Carnivore (Well-Worn).webp" },
    { name: "MAC-10 | Light Box (Field-Tested)", img: "MAC-10 _ Light Box (Field-Tested).webp" },
    { name: "MAC-10 | Pipsqueak (Battle-Scarred)", img: "MAC-10 _ Pipsqueak (Battle-Scarred).webp" },
    { name: "MAG-7 | Wildwood (Field-Tested)", img: "MAG-7 _ Wildwood (Field-Tested).webp" },
    { name: "MP5-SD | Liquidation (Well-Worn)", img: "MP5-SD _ Liquidation (Well-Worn).webp" },
    { name: "MP5-SD | Necro Jr. (Well-Worn)", img: "MP5-SD _ Necro Jr. (Well-Worn).webp" },
    { name: "MP5-SD | Neon Squeezer (Field-Tested)", img: "MP5-SD _ Neon Squeezer (Field-Tested).webp" },
    { name: "MP9 | Featherweight (Well-Worn)", img: "MP9 _ Featherweight (Well-Worn).webp" },
    { name: "MP9 | Orange Peel (Minimal Wear)", img: "MP9 _ Orange Peel (Minimal Wear).webp" },
    { name: "Negev | Bulkhead (Battle-Scarred)", img: "Negev _ Bulkhead (Battle-Scarred).webp" },
    { name: "Negev | Ultralight (Field-Tested)", img: "Negev _ Ultralight (Field-Tested).webp" },
    { name: "Nova | Candy Apple (Minimal Wear)", img: "Nova _ Candy Apple (Minimal Wear).webp" },
    { name: "Nova | Wurst Hölle (Well-Worn)", img: "Nova _ Wurst Hölle (Well-Worn).webp" },
    { name: "P2000 | Acid Etched (Battle-Scarred)", img: "P2000 _ Acid Etched (Battle-Scarred).webp" },
    { name: "P250 | Sedimentary (Field-Tested)", img: "P250 _ Sedimentary (Field-Tested).webp" },
    { name: "P90 | Neoqueen (Battle-Scarred)", img: "P90 _ Neoqueen (Battle-Scarred).webp" },
    { name: "P90 | Vent Rush (Battle-Scarred)", img: "P90 _ Vent Rush (Battle-Scarred).webp" },
    { name: "PP-Bizon | Facility Sketch (Factory New)", img: "PP-Bizon _ Facility Sketch (Factory New).webp" },
    { name: "Paris 2023 Challengers Sticker Capsule", img: "Paris 2023 Challengers Sticker Capsule.webp" },
    { name: "R8 Revolver | Bone Mask (Field-Tested)", img: "R8 Revolver _ Bone Mask (Field-Tested).webp" },
    { name: "SCAR-20 | Poultrygeist (Field-Tested)", img: "SCAR-20 _ Poultrygeist (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (Field-Tested)", img: "SG 553 _ Basket Halftone (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (Minimal Wear)", img: "SG 553 _ Basket Halftone (Minimal Wear).webp" },
    { name: "SG 553 | Cyberforce (Field-Tested)", img: "SG 553 _ Cyberforce (Field-Tested).webp" },
    { name: "SG 553 | Dragon Tech (Well-Worn)", img: "SG 553 _ Dragon Tech (Well-Worn).webp" },
    { name: "SSG 08 | Mainframe 001 (Battle-Scarred)", img: "SSG 08 _ Mainframe 001 (Battle-Scarred).webp" },
    { name: "SSG 08 | Mainframe 001 (Well-Worn)", img: "SSG 08 _ Mainframe 001 (Well-Worn).webp" },
    { name: "Sawed-Off | Analog Input (Minimal Wear)", img: "Sawed-Off _ Analog Input (Minimal Wear).webp" },
    { name: "Sawed-Off | Origami (Field-Tested)", img: "Sawed-Off _ Origami (Field-Tested).webp" },
    { name: "Souvenir AUG | Spalted Wood (Field-Tested)", img: "Souvenir AUG _ Spalted Wood (Field-Tested).webp" },
    { name: "Souvenir MAC-10 | Sienna Damask (Minimal Wear)", img: "Souvenir MAC-10 _ Sienna Damask (Minimal Wear).webp" },
    { name: "Souvenir Sawed-Off | Parched (Field-Tested)", img: "Souvenir Sawed-Off _ Parched (Field-Tested).webp" },
    { name: "StatTrak CZ75-Auto | Tacticat (Well-Worn)", img: "StatTrak™ CZ75-Auto _ Tacticat (Well-Worn).webp" },
    { name: "StatTrak M249 | Downtown (Field-Tested)", img: "StatTrak™ M249 _ Downtown (Field-Tested).webp" },
    { name: "StatTrak M4A4 | Poly Mag (Field-Tested)", img: "StatTrak™ M4A4 _ Poly Mag (Field-Tested).webp" },
    { name: "Sticker | Aim And Fire", img: "Sticker _ Aim And Fire.webp" },
    { name: "Sticker | Angry T", img: "Sticker _ Angry T.webp" },
    { name: "Sticker | Hot Rod Heat", img: "Sticker _ Hot Rod Heat.webp" },
    { name: "Tec-9 | Garter-9 (Field-Tested)", img: "Tec-9 _ Garter-9 (Field-Tested).webp" },
    { name: "Tec-9 | Rebel (Well-Worn)", img: "Tec-9 _ Rebel (Well-Worn).webp" },
    { name: "UMP-45 | Moonrise (Field-Tested)", img: "UMP-45 _ Moonrise (Field-Tested).webp" },
    { name: "UMP-45 | Roadblock (Battle-Scarred)", img: "UMP-45 _ Roadblock (Battle-Scarred).webp" },
    { name: "USP-S | Alpine Camo (Well-Worn)", img: "USP-S _ Alpine Camo (Well-Worn).webp" },
    { name: "USP-S | Torque (Field-Tested)", img: "USP-S _ Torque (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (Field-Tested)", img: "Zeus x27 _ Electric Blue (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (Minimal Wear)", img: "Zeus x27 _ Electric Blue (Minimal Wear).webp" },
    { name: "Zeus x27 | Tosai (Well-Worn)", img: "Zeus x27 _ Tosai (Well-Worn).webp" }
];

// --- 2. BAZANI YARATISH (Bu funksiya ham script.js da tursin) ---
function initCaseDatabase() {
    casesDatabase = {}; // Tozalash
    casesConfig.forEach(c => {
        casesDatabase[c.id] = [];
    });

    // Tactical uchun
    casesDatabase["tactical"] = tacticalSkins.map(skin => ({
        name: skin.name,
        price: 3000,
        img: `img/tatcial/${skin.img}`
    }));

    // Boshqalar uchun
    casesConfig.forEach(c => {
        if (c.id !== "tactical") {
            for (let i = 1; i <= c.count; i++) {
                casesDatabase[c.id].push({
                    name: "Skin " + i,
                    price: c.price,
                    img: `img/${c.folder}/${i}.png`
                });
            }
        }
    });
    console.log("Baza yuklandi:", casesDatabase);
}

// --- 3. ENG MUHIMI: ISHGA TUSHIRISH (DOMContentLoaded ichida) ---
document.addEventListener("DOMContentLoaded", () => {
    // 1. Bazani tayyorla (Bu birinchi bo'lishi shart!)
    initCaseDatabase(); 

    // 2. Keyin boshqa funksiyalarni ishga tushir
    const tg = window.Telegram.WebApp;
    tg.expand();
    
    renderCases(); // Bu funksiya endi bazani ko'radi
    renderTasks();
    // ... qolgan kodlaring ...
});

// --- 4. ROULETTE LOGIC (Shu yerga qo'sh) ---
function startRoulette(caseId) {
    const skins = casesDatabase[caseId];
    if (!skins || skins.length === 0) {
        alert("Xatolik: Bu keys bazasi topilmadi!");
        return;
    }

    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let balance = val ? parseInt(val) : 10000;
        const caseData = casesConfig.find(c => c.id === caseId);

        if (balance < caseData.price) {
            alert("Balans yetarli emas!");
            return;
        }

        // Balansni ayirish
        updateBalance(-caseData.price);

        // Tasodifiy skin
        const winner = skins[Math.floor(Math.random() * skins.length)];

        // Modalni ko'rsatish
        const modal = document.getElementById('roulette-modal');
        modal.style.display = 'flex';
        document.getElementById('won-skin-img').src = winner.img;
        document.getElementById('won-skin-name').innerText = winner.name;

        // Inventarga qo'shish
        addToInventory(winner);
    });
}

// 4. ISHGA TUSHIRISH (Sahifa yuklanganda)
document.addEventListener("DOMContentLoaded", () => {
    initCaseDatabase(); // ENG BIRINCHI BAZANI YUKLAYDI
    renderCases();      // KEYIN KEYS L ARNI CHIQARADI
});

// 2. Vazifalar
let tasks = [
    { id: 'tg', name: {uz: "Telegram Obuna", ru: "Подписка Telegram", en: "Join Telegram"}, reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: {uz: "Instagram Obuna", ru: "Подписка Instagram", en: "Follow Instagram"}, reward: 250, done: false, link: 'https://instagram.com/' }
];

// 3. Top-up Paketlari
const topupPackages = {
    uzs: [
        { amount: 25000, price: "22 500 UZS" },
        { amount: 62500, price: "56 250 UZS", badge: "Хит 🔥" },
        { amount: 125000, price: "112 500 UZS" },
        { amount: 312500, price: "281 250 UZS" },
        { amount: 625000, price: "562 500 UZS" },
        { amount: 1250000, price: "1 125 000 UZS" },
        { amount: 2000000, price: "1 800 000 UZS" },
        { amount: 4375000, price: "3 937 500 UZS" },
        { amount: 6250000, price: "5 625 000 UZS" },
        { amount: 12500000, price: "11 250 000 UZS" },
        { amount: 15000000, price: "13 500 000 UZS" }
    ],
    usd: [
        { amount: 25000, price: "1.8 $" },
        { amount: 62500, price: "4.05 $", badge: "Хит 🔥" },
        { amount: 125000, price: "7.8 $" },
        { amount: 312500, price: "18.75 $" },
        { amount: 625000, price: "37.5 $" },
        { amount: 1250000, price: "75 $" },
        { amount: 4375000, price: "262.5 $" },
        { amount: 12500000, price: "750 $" }
    ]
};

const translations = {
    uz: { 
        topup: "TO'LDIRISH", 
        cases_title: "KEYS", 
        active_tasks: "FAOL VAZIFALAR", 
        completed: "BAJARILGAN", 
        inventory_title: "INVENTORY", 
        nav_bonus: "Bonus", 
        nav_cases: "Keyslar", 
        nav_inv: "Invertar", 
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
        nav_inv: "Инвертар", 
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
        nav_inv: "Invertory", 
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
    let balEl = document.getElementById('balance');
    let bal = balEl ? balEl.innerText : "10000";
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
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = "";
    
    casesConfig.forEach(c => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.icon}" class="case-img coin-glow">
                <p class="case-name">${c.id.toUpperCase()}</p>
                <button class="case-buy-btn" onclick="startRoulette('${c.id}')">
                    <span>${c.price.toLocaleString()}</span>
                    <img src="img/nav_diamond.png" style="width:20px;">
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

// YANGI FUNKSIYA: TOPUP RENDER
function renderTopup(currency) {
    const container = document.getElementById(`${currency}-list`);
    if (!container) return;
    container.innerHTML = ""; 
    topupPackages[currency].forEach(pkg => {
        let badgeHtml = pkg.badge ? `<span class="hit-badge">${pkg.badge}</span>` : '';
        container.innerHTML += `
            <div class="topup-row" onclick="alert('To\\'lov: ${pkg.price}')">
                <div class="topup-left">
                    <img src="img/nav_diamond.png" class="topup-coin">
                    <span>${pkg.amount.toLocaleString()}</span> ${badgeHtml}
                </div>
                <div class="topup-right">${pkg.price}</div>
            </div>
        `;
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

function withdrawWonSkin() {
    if (typeof currentWinningSkin !== 'undefined' && currentWinningSkin) {
        // Inventarga qo'shish funksiyasini chaqiramiz
        addToInventory(currentWinningSkin);
        
        // Oynani yopamiz
        closeResultModal();
    } else {
        alert("Xatolik: Skin topilmadi.");
    }
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

document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let balEl = document.getElementById('balance');
        if(balEl) balEl.innerText = val ? val : '10000';
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
    const settingsDrawer = document.getElementById('settings-content');
    if (settingsDrawer) {
        if (settingsDrawer.style.display === 'none' || settingsDrawer.style.display === '') {
            settingsDrawer.style.display = 'block'; 
        } else {
            settingsDrawer.style.display = 'none';
        }
    }
}

function closeResultModal() {
    console.log("Tugma bosildi!"); // Bu konsolda chiqishi kerak
    
    const modal = document.getElementById('roulette-modal');
    const result = document.getElementById('result-display');
    
    if (modal) {
        modal.style.display = 'none';
        console.log("Modal yopildi");
    } else {
        console.error("XATOLIK: 'roulette-modal' ID si topilmadi!");
    }
    
    if (result) {
        result.style.display = 'none';
        console.log("Natija oynasi yopildi");
    } else {
        console.error("XATOLIK: 'result-display' ID si topilmadi!");
    }
}

// Inventarga saqlash uchun yordamchi funksiya
function addToInventory(skin) {
    const tg = window.Telegram.WebApp;
    
    // 1. Avval bor inventarni olamiz
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inventory = val ? JSON.parse(val) : []; // Agar bo'sh bo'lsa, massiv yaratadi
        
        // 2. Yangi skinni qo'shamiz
        inventory.push({
            name: skin.name.uz || skin.name, 
            price: skin.price,
            img: skin.img
        });
        
        // 3. String formatida saqlaymiz (JSON.stringify shart!)
        tg.CloudStorage.setItem('inventory', JSON.stringify(inventory), (err) => {
            if (err) {
                alert("Xatolik: Saqlanmadi!");
            } else {
                alert("Inventarga muvaffaqiyatli saqlandi!");
                renderInventory(); // Saqlangandan keyin inventar sahifasini yangilaydi
            }
        });
    });
}

// Yana aylantirish va saqlash
function spinAgainAndSave() {
    if (currentWinningSkin) {
        addToInventory(currentWinningSkin); // Avval inventarga qo'shadi
    }
    closeResultModal();    // Oynani yopadi
    startBudgetRoulette(); // Keyin yangi spin boshlaydi
}

// Chiqish va saqlash
function exitAndSave() {
    if (currentWinningSkin) {
        addToInventory(currentWinningSkin); // Avval inventarga qo'shadi
    }
    closeResultModal(); // Oynani yopadi
}
