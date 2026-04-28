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

// --- 1. GLOBAL O'ZGARUVCHILAR (Eng tepada) ---
let currentWonSkin = null; 
let currentCaseId = null;

// 1. Keyslar
const cases = [
    { id: "tactical", name: {uz: "Tactical", ru: "Тактический", en: "Tactical"}, price: 4000, img: "case1.png" },
    { id: "spectrum", name: {uz: "Spectrum", ru: "Спектр", en: "Spectrum"}, price: 5000, img: "case2.webp" },
    { id: "clutch", name: {uz: "Clutch", ru: "Clutch", en: "Clutch"}, price: 6000, img: "case3.webp" },
    { id: "urban", name: {uz: "Urban", ru: "Городской", en: "Urban"}, price: 8000, img: "case4.webp" },
    { id: "all_in", name: {uz: "All In", ru: "Все или ничего", en: "All In"}, price: 15000, img: "case5.png" },
    { id: "military", name: {uz: "Military", ru: "Военный", en: "Military"}, price: 17000, img: "case6.webp" },
    { id: "smg", name: {uz: "SMG", ru: "SMG", en: "SMG"}, price: 20000, img: "case7.webp" },
    { id: "carbon_fiber", name: {uz: "Carbon Fiber", ru: "Карбон", en: "Carbon Fiber"}, price: 25000, img: "case8.png" },
    { id: "armory", name: {uz: "Armory", ru: "Арсенал", en: "Armory"}, price: 30000, img: "case9.png" },
    { id: "stattrack", name: {uz: "StatTrak", ru: "StatTrak", en: "StatTrak"}, price: 50000, img: "case10.png" }
];

const skinsDatabase = [
    // --- AK-47 & AWP ---
    { name: "AK-47 | Olive Polycam (FT)", img: "img/AK-47 _ Olive Polycam (Field-Tested).webp", price: 3000 },
    { name: "AK-47 | Olive Polycam (WW)", img: "img/AK-47 _ Olive Polycam (Well-Worn).webp", price: 2500 },
    { name: "AK-47 | Slate (WW)", img: "img/AK-47 _ Slate (Well-Worn).webp", price: 55000 },
    { name: "AK-47 | VariCamo Grey (FT)", img: "img/AK-47 _ VariCamo Grey (Field-Tested).webp", price: 8000 },
    { name: "AWP | Capillary (WW)", img: "img/AWP _ Capillary (Well-Worn).webp", price: 10000 },
    { name: "AWP | Safari Mesh (WW)", img: "img/AWP _ Safari Mesh (Well-Worn).webp", price: 30000 },

    // --- Desert Eagle & Glock ---
    { name: "Desert Eagle | Blue Ply (WW)", img: "img/Desert Eagle _ Blue Ply (Well-Worn).webp", price: 5000 },
    { name: "Desert Eagle | Bronze Deco (FT)", img: "img/Desert Eagle _ Bronze Deco (Field-Tested).webp", price: 6000 },
    { name: "Desert Eagle | Serpent Strike (FT)", img: "img/Desert Eagle _ Serpent Strike (Field-Tested).webp", price: 70000 },
    { name: "Desert Eagle | Tilted (FT)", img: "img/Desert Eagle _ Tilted (Field-Tested).webp", price: 7000 },
    { name: "Glock-18 | Block-18 (BS)", img: "img/Glock-18 _ Block-18 (Battle-Scarred).webp", price: 3000 },
    { name: "Glock-18 | Moonrise (WW)", img: "img/Glock-18 _ Moonrise (Well-Worn).webp", price: 8000 },
    { name: "Glock-18 | Oxide Blaze (WW)", img: "img/Glock-18 _ Oxide Blaze (Well-Worn).webp", price: 5000 },
    { name: "Glock-18 | Shinobu (WW)", img: "img/Glock-18 _ Shinobu (Well-Worn).webp", price: 9000 },
    { name: "Glock-18 | Umbral Rabbit (FT)", img: "img/Glock-18 _ Umbral Rabbit (Field-Tested).webp", price: 6000 },
    { name: "Glock-18 | Winterized (FT)", img: "img/Glock-18 _ Winterized (Field-Tested).webp", price: 2500 },

    // --- M4A1-S & M4A4 ---
    { name: "M4A1-S | Boreal Forest (FT)", img: "img/M4A1-S _ Boreal Forest (Field-Tested).webp", price: 5000 },
    { name: "M4A1-S | Nitro (FT)", img: "img/M4A1-S _ Nitro (Field-Tested).webp", price: 25000 },
    { name: "M4A1-S | Wash me plz (FT)", img: "img/M4A1-S _ Wash me plz (Field-Tested).webp", price: 8000 },
    { name: "M4A4 | Choppa (FT)", img: "img/M4A4 _ Choppa (Field-Tested).webp", price: 6000 },
    { name: "M4A4 | Etch Lord (BS)", img: "img/M4A4 _ Etch Lord (Battle-Scarred).webp", price: 4000 },
    { name: "M4A4 | Magnesium (WW)", img: "img/M4A4 _ Magnesium (Well-Worn).webp", price: 3000 },
    { name: "M4A4 | Mainframe (FT)", img: "img/M4A4 _ Mainframe (Field-Tested).webp", price: 3500 },
    { name: "M4A4 | Naval Shred Camo (WW)", img: "img/M4A4 _ Naval Shred Camo (Well-Worn).webp", price: 2000 },
    { name: "M4A4 | Poly Mag (BS)", img: "img/M4A4 _ Poly Mag (Battle-Scarred).webp", price: 2000 },
    { name: "M4A4 | Poly Mag (WW)", img: "img/M4A4 _ Poly Mag (Well-Worn).webp", price: 2500 },
    { name: "M4A4 | Steel Work (FT)", img: "img/M4A4 _ Steel Work (Field-Tested).webp", price: 5000 },

    // --- Stickers, Caps, Charms ---
    { name: "Austin 2025 Challengers Capsule", img: "img/Austin 2025 Challengers Sticker Capsule.webp", price: 40000 },
    { name: "Paris 2023 Challengers Capsule", img: "img/Paris 2023 Challengers Sticker Capsule.webp", price: 30000 },
    { name: "Charm | Baby's AK", img: "img/Charm _ Baby's AK.webp", price: 12000 },
    { name: "Charm | Backsplash", img: "img/Charm _ Backsplash.webp", price: 11000 },
    { name: "Charm | Hot Hands", img: "img/Charm _ Hot Hands.webp", price: 10000 },
    { name: "Charm | Pocket AWP", img: "img/Charm _ Pocket AWP.webp", price: 14000 },
    { name: "Charm | Stitch-Loaded", img: "img/Charm _ Stitch-Loaded.webp", price: 13000 },
    { name: "Sticker | Aim And Fire", img: "img/Sticker _ Aim And Fire.webp", price: 10000 },
    { name: "Sticker | Angry T", img: "img/Sticker _ Angry T.webp", price: 7000 },
    { name: "Sticker | Hot Rod Heat", img: "img/Sticker _ Hot Rod Heat.webp", price: 8000 },

    // --- Galil & FAMAS ---
    { name: "Galil AR | Acid Dart (MW)", img: "img/Galil AR _ Acid Dart (Minimal Wear).webp", price: 2000 },
    { name: "Galil AR | Connexion (BS)", img: "img/Galil AR _ Connexion (Battle-Scarred).webp", price: 3000 },
    { name: "Galil AR | Control (FT)", img: "img/Galil AR _ Control (Field-Tested).webp", price: 2500 },
    { name: "Galil AR | Green Apple (MW)", img: "img/Galil AR _ Green Apple (Minimal Wear).webp", price: 4000 },
    { name: "Galil AR | O-Ranger (MW)", img: "img/Galil AR _ O-Ranger (Minimal Wear).webp", price: 5000 },
    { name: "Galil AR | Robin's Egg (FT)", img: "img/Galil AR _ Robin's Egg (Field-Tested).webp", price: 3500 },
    { name: "Galil AR | Rocket Pop (FT)", img: "img/Galil AR _ Rocket Pop (Field-Tested).webp", price: 2000 },
    { name: "Galil AR | Sage Spray (FT)", img: "img/Galil AR _ Sage Spray (Field-Tested).webp", price: 1000 },
    { name: "FAMAS | Cyanospatter (FT)", img: "img/FAMAS _ Cyanospatter (Field-Tested).webp", price: 2500 },
    { name: "FAMAS | Meow 36 (WW)", img: "img/FAMAS _ Meow 36 (Well-Worn).webp", price: 5000 },

    // --- Boshqalar (Pistol, Shotgun, SMG) ---
    { name: "AUG | Storm (FT)", img: "img/AUG _ Storm (Field-Tested).webp", price: 1500 },
    { name: "Five-SeveN | Flame Test (FT)", img: "img/Five-SeveN _ Flame Test (Field-Tested).webp", price: 3500 },
    { name: "Five-SeveN | Forest Night (FT)", img: "img/Five-SeveN _ Forest Night (Field-Tested).webp", price: 1500 },
    { name: "Five-SeveN | Scrawl (WW)", img: "img/Five-SeveN _ Scrawl (Well-Worn).webp", price: 5000 },
    { name: "Five-SeveN | Sky Blue (FT)", img: "img/Five-SeveN _ Sky Blue (Field-Tested).webp", price: 6000 },
    { name: "MAC-10 | Allure (BS)", img: "img/MAC-10 _ Allure (Battle-Scarred).webp", price: 3500 },
    { name: "MAC-10 | Candy Apple (MW)", img: "img/MAC-10 _ Candy Apple (Minimal Wear).webp", price: 5500 },
    { name: "MAC-10 | Carnivore (WW)", img: "img/MAC-10 _ Carnivore (Well-Worn).webp", price: 2000 },
    { name: "MAC-10 | Light Box (FT)", img: "img/MAC-10 _ Light Box (Field-Tested).webp", price: 3000 },
    { name: "MAC-10 | Pipsqueak (BS)", img: "img/MAC-10 _ Pipsqueak (Battle-Scarred).webp", price: 2500 },
    { name: "MAG-7 | Wildwood (FT)", img: "img/MAG-7 _ Wildwood (Field-Tested).webp", price: 4000 },
    { name: "MP5-SD | Liquidation (WW)", img: "img/MP5-SD _ Liquidation (Well-Worn).webp", price: 6000 },
    { name: "MP5-SD | Necro Jr. (WW)", img: "img/MP5-SD _ Necro Jr. (Well-Worn).webp", price: 3000 },
    { name: "MP5-SD | Neon Squeezer (FT)", img: "img/MP5-SD _ Neon Squeezer (Field-Tested).webp", price: 4000 },
    { name: "MP9 | Featherweight (WW)", img: "img/MP9 _ Featherweight (Well-Worn).webp", price: 2000 },
    { name: "MP9 | Orange Peel (MW)", img: "img/MP9 _ Orange Peel (Minimal Wear).webp", price: 3500 },
    { name: "Negev | Bulkhead (BS)", img: "img/Negev _ Bulkhead (Battle-Scarred).webp", price: 1500 },
    { name: "Negev | Ultralight (FT)", img: "img/Negev _ Ultralight (Field-Tested).webp", price: 1000 },
    { name: "Nova | Candy Apple (MW)", img: "img/Nova _ Candy Apple (Minimal Wear).webp", price: 3500 },
    { name: "Nova | Wurst Hölle (WW)", img: "img/Nova _ Wurst Hölle (Well-Worn).webp", price: 5000 },
    { name: "P2000 | Acid Etched (BS)", img: "img/P2000 _ Acid Etched (Battle-Scarred).webp", price: 6000 },
    { name: "P250 | Sedimentary (FT)", img: "img/P250 _ Sedimentary (Field-Tested).webp", price: 2000 },
    { name: "P90 | Neoqueen (BS)", img: "img/P90 _ Neoqueen (Battle-Scarred).webp", price: 8000 },
    { name: "P90 | Vent Rush (BS)", img: "img/P90 _ Vent Rush (Battle-Scarred).webp", price: 3000 },
    { name: "PP-Bizon | Facility Sketch (FN)", img: "img/PP-Bizon _ Facility Sketch (Factory New).webp", price: 2000 },
    { name: "R8 Revolver | Bone Mask (FT)", img: "img/R8 Revolver _ Bone Mask (Field-Tested).webp", price: 1000 },
    { name: "SCAR-20 | Poultrygeist (FT)", img: "img/SCAR-20 _ Poultrygeist (Field-Tested).webp", price: 2000 },
    { name: "SG 553 | Basket Halftone (FT)", img: "img/SG 553 _ Basket Halftone (Field-Tested).webp", price: 1500 },
    { name: "SG 553 | Basket Halftone (MW)", img: "img/SG 553 _ Basket Halftone (Minimal Wear).webp", price: 2500 },
    { name: "SG 553 | Cyberforce (FT)", img: "img/SG 553 _ Cyberforce (Field-Tested).webp", price: 6000 },
    { name: "SG 553 | Dragon Tech (WW)", img: "img/SG 553 _ Dragon Tech (Well-Worn).webp", price: 4000 },
    { name: "SSG 08 | Mainframe 001 (BS)", img: "img/SSG 08 _ Mainframe 001 (Battle-Scarred).webp", price: 2000 },
    { name: "SSG 08 | Mainframe 001 (WW)", img: "img/SSG 08 _ Mainframe 001 (Well-Worn).webp", price: 2500 },
    { name: "Sawed-Off | Analog Input (MW)", img: "img/Sawed-Off _ Analog Input (Minimal Wear).webp", price: 3000 },
    { name: "Sawed-Off | Origami (FT)", img: "img/Sawed-Off _ Origami (Field-Tested).webp", price: 2000 },
    { name: "Souvenir AUG | Spalted Wood (FT)", img: "img/Souvenir AUG _ Spalted Wood (Field-Tested).webp", price: 3000 },
    { name: "Souv. MAC-10 | Sienna Damask (MW)", img: "img/Souvenir MAC-10 _ Sienna Damask (Minimal Wear).webp", price: 4000 },
    { name: "Souv. Sawed-Off | Parched (FT)", img: "img/Souvenir Sawed-Off _ Parched (Field-Tested).webp", price: 3000 },
    { name: "StatTrak™ CZ75-Auto | Tacticat (WW)", img: "img/StatTrak™ CZ75-Auto _ Tacticat (Well-Worn).webp", price: 8000 },
    { name: "StatTrak™ M249 | Downtown (FT)", img: "img/StatTrak™ M249 _ Downtown (Field-Tested).webp", price: 3000 },
    { name: "StatTrak™ M4A4 | Poly Mag (FT)", img: "img/StatTrak™ M4A4 _ Poly Mag (Field-Tested).webp", price: 4000 },
    { name: "Tec-9 | Garter-9 (FT)", img: "img/Tec-9 _ Garter-9 (Field-Tested).webp", price: 2000 },
    { name: "Tec-9 | Rebel (WW)", img: "img/Tec-9 _ Rebel (Well-Worn).webp", price: 6000 },
    { name: "UMP-45 | Moonrise (FT)", img: "img/UMP-45 _ Moonrise (Field-Tested).webp", price: 3000 },
    { name: "UMP-45 | Roadblock (BS)", img: "img/UMP-45 _ Roadblock (Battle-Scarred).webp", price: 2000 },
    { name: "Zeus x27 | Electric Blue (FT)", img: "img/Zeus x27 _ Electric Blue (Field-Tested).webp", price: 30000 },
    { name: "Zeus x27 | Electric Blue (MW)", img: "img/Zeus x27 _ Electric Blue (Minimal Wear).webp", price: 35000 },
    { name: "Zeus x27 | Tosai (WW)", img: "img/Zeus x27 _ Tosai (Well-Worn).webp", price: 10000 }
];

// 2. UI YANGILOVCHI FUNKSIYA (Siz so'ragan kod)
function updateUIBalance() {
    let balEl = document.getElementById('balance');
    let bal = balEl ? balEl.innerText : "10000";
    let largeBal = document.getElementById('balance-large');
    if(largeBal) largeBal.innerText = bal;
}

// 3. BALANSNI O'ZGARTIRUVCHI FUNKSIYA (Buni shunday o'zgartiring)
function updateBalance(amount) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        let newBal = bal + amount;
        tg.CloudStorage.setItem('userBalance', newBal.toString());
        
        // Balans o'zgarganda, UI ham avtomatik yangilanadi
        if(document.getElementById('balance')) {
            document.getElementById('balance').innerText = newBal;
        }
        updateUIBalance(); // Mana bu yerda chaqiramiz!
    });
}

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

function addToInventory(skin) {
    window.Telegram.WebApp.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(skin);
        window.Telegram.WebApp.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}

// "YANA AYLANTIRISH" tugmasi uchun
function spinAgainAndSave() {
    if (currentWonSkin) {
        addToInventory(currentWonSkin); // Avto inventarga qo'shish
        
        // Modalni yopish
        document.getElementById('roulette-modal').style.display = 'none';
        
        // Bir zumda yana spinningni boshlash
        setTimeout(() => {
            startRoulette(currentCaseId); 
        }, 500);
    }
}

// "CHIQISH" tugmasi uchun
function exitAndSave() {
    if (currentWonSkin) {
        addToInventory(currentWonSkin); // Avto inventarga qo'shish
    }
    // Modalni yopish
    document.getElementById('roulette-modal').style.display = 'none';
    
    // Asosiy sahifaga qaytish (ixtiyoriy)
    showPage('cases', document.querySelector('[onclick*="cases"]'));
}
