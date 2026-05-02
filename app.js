console.log("XANZO SKINS: INTEGRATED SCRIPT YUKLANDI!");

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

if (typeof window.appData === 'undefined') {
    window.appData = {
        currentWinningSkin: null,
        currentCaseId: null
    };
}

const p = (usd) => Math.round(usd * 19500);

// Keyslar ro'yxati
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

// Skinlar bazasi
const skinsDatabase = [
    { name: "AK-47 | Olive Polycam (FT)", price: 3000, file: "AK-47 _ Olive Polycam (Field-Tested).webp" },
    { name: "AK-47 | Olive Polycam (WW)", price: 2500, file: "AK-47 _ Olive Polycam (Well-Worn).webp" },
    { name: "AK-47 | Slate (WW)", price: 55000, file: "AK-47 _ Slate (Well-Worn).webp" },
    { name: "AK-47 | VariCamo Grey (FT)", price: 8000, file: "AK-47 _ VariCamo Grey (Field-Tested).webp" },
    { name: "AWP | Capillary (WW)", price: 10000, file: "AWP _ Capillary (Well-Worn).webp" },
    { name: "AWP | Safari Mesh (WW)", price: 30000, file: "AWP _ Safari Mesh (Well-Worn).webp" },
    { name: "Desert Eagle | Blue Ply (WW)", price: 5000, file: "Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "Desert Eagle | Bronze Deco (FT)", price: 6000, file: "Desert Eagle _ Bronze Deco (Field-Tested).webp" },
    { name: "Desert Eagle | Serpent Strike (FT)", price: 70000, file: "Desert Eagle _ Serpent Strike (Field-Tested).webp" },
    { name: "Desert Eagle | Tilted (FT)", price: 7000, file: "Desert Eagle _ Tilted (Field-Tested).webp" },
    { name: "Glock-18 | Block-18 (BS)", price: 3000, file: "Glock-18 _ Block-18 (Battle-Scarred).webp" },
    { name: "Glock-18 | Moonrise (WW)", price: 8000, file: "Glock-18 _ Moonrise (Well-Worn).webp" },
    { name: "Glock-18 | Oxide Blaze (WW)", price: 5000, file: "Glock-18 _ Oxide Blaze (Well-Worn).webp" },
    { name: "Glock-18 | Shinobu (WW)", price: 9000, file: "Glock-18 _ Shinobu (Well-Worn).webp" },
    { name: "Glock-18 | Umbral Rabbit (FT)", price: 6000, file: "Glock-18 _ Umbral Rabbit (Field-Tested).webp" },
    { name: "Glock-18 | Winterized (FT)", price: 2500, file: "Glock-18 _ Winterized (Field-Tested).webp" },
    { name: "M4A1-S | Boreal Forest (FT)", price: 5000, file: "M4A1-S _ Boreal Forest (Field-Tested).webp" },
    { name: "M4A1-S | Nitro (FT)", price: 25000, file: "M4A1-S _ Nitro (Field-Tested).webp" },
    { name: "M4A1-S | Wash me plz (FT)", price: 8000, file: "M4A1-S _ Wash me plz (Field-Tested).webp" },
    { name: "M4A4 | Choppa (FT)", price: 6000, file: "M4A4 _ Choppa (Field-Tested).webp" },
    { name: "M4A4 | Etch Lord (BS)", price: 4000, file: "M4A4 _ Etch Lord (Battle-Scarred).webp" },
    { name: "M4A4 | Magnesium (WW)", price: 3000, file: "M4A4 _ Magnesium (Well-Worn).webp" },
    { name: "M4A4 | Mainframe (FT)", price: 3500, file: "M4A4 _ Mainframe (Field-Tested).webp" },
    { name: "M4A4 | Naval Shred Camo (WW)", price: 2000, file: "M4A4 _ Naval Shred Camo (Well-Worn).webp" },
    { name: "M4A4 | Poly Mag (BS)", price: 2000, file: "M4A4 _ Poly Mag (Battle-Scarred).webp" },
    { name: "M4A4 | Poly Mag (WW)", price: 2500, file: "M4A4 _ Poly Mag (Well-Worn).webp" },
    { name: "M4A4 | Steel Work (FT)", price: 5000, file: "M4A4 _ Steel Work (Field-Tested).webp" },
    { name: "Austin 2025 Challengers Capsule", price: 40000, file: "Austin 2025 Challengers Sticker Capsule.webp" },
    { name: "Paris 2023 Challengers Capsule", price: 30000, file: "Paris 2023 Challengers Sticker Capsule.webp" },
    { name: "Charm | Baby's AK", price: 12000, file: "Charm _ Baby's AK.webp" },
    { name: "Charm | Backsplash", price: 11000, file: "Charm _ Backsplash.webp" },
    { name: "Charm | Hot Hands", price: 10000, file: "Charm _ Hot Hands.webp" },
    { name: "Charm | Pocket AWP", price: 14000, file: "Charm _ Pocket AWP.webp" },
    { name: "Charm | Stitch-Loaded", price: 13000, file: "Charm _ Stitch-Loaded.webp" },
    { name: "Sticker | Aim And Fire", price: 10000, file: "Sticker _ Aim And Fire.webp" },
    { name: "Sticker | Angry T", price: 7000, file: "Sticker _ Angry T.webp" },
    { name: "Sticker | Hot Rod Heat", price: 8000, file: "Sticker _ Hot Rod Heat.webp" },
    { name: "Galil AR | Acid Dart (MW)", price: 2000, file: "Galil AR _ Acid Dart (Minimal Wear).webp" },
    { name: "Galil AR | Connexion (BS)", price: 3000, file: "Galil AR _ Connexion (Battle-Scarred).webp" },
    { name: "Galil AR | Control (FT)", price: 2500, file: "Galil AR _ Control (Field-Tested).webp" },
    { name: "Galil AR | Green Apple (MW)", price: 4000, file: "Galil AR _ Green Apple (Minimal Wear).webp" },
    { name: "Galil AR | O-Ranger (MW)", price: 5000, file: "Galil AR _ O-Ranger (Minimal Wear).webp" },
    { name: "Galil AR | Robin's Egg (FT)", price: 3500, file: "Galil AR _ Robin's Egg (Field-Tested).webp" },
    { name: "Galil AR | Rocket Pop (FT)", price: 2000, file: "Galil AR _ Rocket Pop (Field-Tested).webp" },
    { name: "Galil AR | Sage Spray (FT)", price: 1000, file: "Galil AR _ Sage Spray (Field-Tested).webp" },
    { name: "FAMAS | Cyanospatter (FT)", price: 2500, file: "FAMAS _ Cyanospatter (Field-Tested).webp" },
    { name: "FAMAS | Meow 36 (WW)", price: 5000, file: "FAMAS _ Meow 36 (Well-Worn).webp" },
    { name: "AUG | Storm (FT)", price: 1500, file: "AUG _ Storm (Field-Tested).webp" },
    { name: "Five-SeveN | Flame Test (FT)", price: 3500, file: "Five-SeveN _ Flame Test (Field-Tested).webp" },
    { name: "Five-SeveN | Forest Night (FT)", price: 1500, file: "Five-SeveN _ Forest Night (Field-Tested).webp" },
    { name: "Five-SeveN | Scrawl (WW)", price: 5000, file: "Five-SeveN _ Scrawl (Well-Worn).webp" },
    { name: "Five-SeveN | Sky Blue (FT)", price: 6000, file: "Five-SeveN _ Sky Blue (Field-Tested).webp" },
    { name: "MAC-10 | Allure (BS)", price: 3500, file: "MAC-10 _ Allure (Battle-Scarred).webp" },
    { name: "MAC-10 | Candy Apple (MW)", price: 5500, file: "MAC-10 _ Candy Apple (Minimal Wear).webp" },
    { name: "MAC-10 | Carnivore (WW)", price: 2000, file: "MAC-10 _ Carnivore (Well-Worn).webp" },
    { name: "MAC-10 | Light Box (FT)", price: 3000, file: "MAC-10 _ Light Box (Field-Tested).webp" },
    { name: "MAC-10 | Pipsqueak (BS)", price: 2500, file: "MAC-10 _ Pipsqueak (Battle-Scarred).webp" },
    { name: "MAG-7 | Wildwood (FT)", price: 4000, file: "MAG-7 _ Wildwood (Field-Tested).webp" },
    { name: "MP5-SD | Liquidation (WW)", price: 6000, file: "MP5-SD _ Liquidation (Well-Worn).webp" },
    { name: "MP5-SD | Necro Jr. (WW)", price: 3000, file: "MP5-SD _ Necro Jr. (Well-Worn).webp" },
    { name: "MP5-SD | Neon Squeezer (FT)", price: 4000, file: "MP5-SD _ Neon Squeezer (Field-Tested).webp" },
    { name: "MP9 | Featherweight (WW)", price: 2000, file: "MP9 _ Featherweight (Well-Worn).webp" },
    { name: "MP9 | Orange Peel (MW)", price: 3500, file: "MP9 _ Orange Peel (Minimal Wear).webp" },
    { name: "Negev | Bulkhead (BS)", price: 1500, file: "Negev _ Bulkhead (Battle-Scarred).webp" },
    { name: "Negev | Ultralight (FT)", price: 1000, file: "Negev _ Ultralight (Field-Tested).webp" },
    { name: "Nova | Candy Apple (MW)", price: 3500, file: "Nova _ Candy Apple (Minimal Wear).webp" },
    { name: "Nova | Wurst Hölle (WW)", price: 5000, file: "Nova _ Wurst Hölle (Well-Worn).webp" },
    { name: "P2000 | Acid Etched (BS)", price: 6000, file: "P2000 _ Acid Etched (Battle-Scarred).webp" },
    { name: "P250 | Sedimentary (FT)", price: 2000, file: "P250 _ Sedimentary (Field-Tested).webp" },
    { name: "P90 | Neoqueen (BS)", price: 8000, file: "P90 _ Neoqueen (Battle-Scarred).webp" },
    { name: "P90 | Vent Rush (BS)", price: 3000, file: "P90 _ Vent Rush (Battle-Scarred).webp" },
    { name: "PP-Bizon | Facility Sketch (FN)", price: 2000, file: "PP-Bizon _ Facility Sketch (Factory New).webp" },
    { name: "R8 Revolver | Bone Mask (FT)", price: 1000, file: "R8 Revolver _ Bone Mask (Field-Tested).webp" },
    { name: "SCAR-20 | Poultrygeist (FT)", price: 2000, file: "SCAR-20 _ Poultrygeist (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (FT)", price: 1500, file: "SG 553 _ Basket Halftone (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (MW)", price: 2500, file: "SG 553 _ Basket Halftone (Minimal Wear).webp" },
    { name: "SG 553 | Cyberforce (FT)", price: 6000, file: "SG 553 _ Cyberforce (Field-Tested).webp" },
    { name: "SG 553 | Dragon Tech (WW)", price: 4000, file: "SG 553 _ Dragon Tech (Well-Worn).webp" },
    { name: "SSG 08 | Mainframe 001 (BS)", price: 2000, file: "SSG 08 _ Mainframe 001 (Battle-Scarred).webp" },
    { name: "SSG 08 | Mainframe 001 (WW)", price: 2500, file: "SSG 08 _ Mainframe 001 (Well-Worn).webp" },
    { name: "Sawed-Off | Analog Input (MW)", price: 3000, file: "Sawed-Off _ Analog Input (Minimal Wear).webp" },
    { name: "Sawed-Off | Origami (FT)", price: 2000, file: "Sawed-Off _ Origami (Field-Tested).webp" },
    { name: "Souvenir AUG | Spalted Wood (FT)", price: 3000, file: "Souvenir AUG _ Spalted Wood (Field-Tested).webp" },
    { name: "Souv. MAC-10 | Sienna Damask (MW)", price: 4000, file: "Souvenir MAC-10 _ Sienna Damask (Minimal Wear).webp" },
    { name: "Souv. Sawed-Off | Parched (FT)", price: 3000, file: "Souvenir Sawed-Off _ Parched (Field-Tested).webp" },
    { name: "StatTrak™ CZ75-Auto | Tacticat (WW)", price: 8000, file: "StatTrak™ CZ75-Auto _ Tacticat (Well-Worn).webp" },
    { name: "StatTrak™ M249 | Downtown (FT)", price: 3000, file: "StatTrak™ M249 _ Downtown (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Poly Mag (FT)", price: 4000, file: "StatTrak™ M4A4 _ Poly Mag (Field-Tested).webp" },
    { name: "Tec-9 | Garter-9 (FT)", price: 2000, file: "Tec-9 _ Garter-9 (Field-Tested).webp" },
    { name: "Tec-9 | Rebel (WW)", price: 6000, file: "Tec-9 _ Rebel (Well-Worn).webp" },
    { name: "UMP-45 | Moonrise (FT)", price: 3000, file: "UMP-45 _ Moonrise (Field-Tested).webp" },
    { name: "UMP-45 | Roadblock (BS)", price: 2000, file: "UMP-45 _ Roadblock (Battle-Scarred).webp" },
    { name: "Zeus x27 | Electric Blue (FT)", price: 30000, file: "Zeus x27 _ Electric Blue (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (MW)", price: 35000, file: "Zeus x27 _ Electric Blue (Minimal Wear).webp" },
    { name: "Zeus x27 | Tosai (WW)", price: 10000, file: "Zeus x27 _ Tosai (Well-Worn).webp" }
];

// ==========================================
// 2. YORDAMCHI FUNKSIYALAR
// ==========================================
function getSkinImg(skin) {
    return `img/Tactical/${skin.file}`;
}

function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    const header = document.getElementById('main-header');
    if(header) header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');

    if(pageId === 'inventory') renderInventory();
    if(pageId === 'topup-uzs') renderTopup('uzs');
    if(pageId === 'topup-usd') renderTopup('usd');

    updateUIBalance();
}

function updateUIBalance() {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? val : "10000";
        if(document.getElementById('balance')) document.getElementById('balance').innerText = bal;
        if(document.getElementById('balance-large')) document.getElementById('balance-large').innerText = bal;
    });
}

function updateBalance(amount) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        let newBal = bal + amount;
        tg.CloudStorage.setItem('userBalance', newBal.toString());
        updateUIBalance();
    });
}

function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
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
// ==========================================
// 3. ASOSIY RULETKA FUNKSIYASI (Integrated)
// ==========================================
function startRoulette(caseId) {
    if (!window.appData) {
        window.appData = { currentWinningSkin: null, currentCaseId: null };
    }
    
    window.appData.currentCaseId = caseId;
    const selectedCase = cases.find(c => c.id === caseId);
    
    if (!selectedCase) {
        console.error("Keys topilmadi!");
        return;
    }

    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        
        if (bal < selectedCase.price) { 
            alert("Balans yetarli emas!"); 
            return; 
        }
        
        updateBalance(-selectedCase.price);
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        if (!modal || !track || !viewport || !resultDisplay) return;

        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        for (let i = 0; i < 50; i++) {
            let s = skinsDatabase[Math.floor(Math.random() * skinsDatabase.length)];
            const imgSrc = getSkinImg(s);
            
            track.innerHTML += `
                <div class="roulette-item">
                    <img src="${imgSrc}" onerror="this.src='img/nav_diamond.png'">
                </div>`;
            
            if (i === 40) window.appData.currentWinningSkin = s;
        }

        setTimeout(() => {
            track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
            track.style.top = `-${40 * 160 - 80}px`; 
        }, 500);

        setTimeout(() => {
            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            
            const winningSkin = window.appData.currentWinningSkin;
            document.getElementById('won-skin-img').src = getSkinImg(winningSkin);
            document.getElementById('won-skin-name').innerText = winningSkin.name;
            
            const priceEl = document.getElementById('won-skin-price');
            if (priceEl) {
                priceEl.innerHTML = `<img src="img/nav_diamond.png" style="width:16px; vertical-align:middle;"> ${winningSkin.price} COIN`;
            }
            
            addToInventory(winningSkin);
            if(typeof playSound === 'function') playSound('win');
        }, 5700);
    });
}

// ==========================================
// 4. BOSHQA FUNKSIYALAR (Bonus, Inventory, etc.)
// ==========================================
function sellWonSkin() {
    const win = window.appData.currentWinningSkin;
    if (!win) return;
    updateBalance(win.price);
    
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.pop(); // Oxirgi qo'shilgan elementni o'chirish
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
    document.getElementById('roulette-modal').style.display = 'none';
}

function spinAgainAndSave() {
    document.getElementById('roulette-modal').style.display = 'none';
    setTimeout(() => {
        startRoulette(window.appData.currentCaseId); 
    }, 500);
}

function exitAndSave() {
    document.getElementById('roulette-modal').style.display = 'none';
    showPage('cases', document.querySelector('[onclick*="cases"]'));
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
                    <img src="${getSkinImg(item)}" style="width:60px">
                    <p style="font-size:10px">${item.name}</p>
                    <button onclick="withdrawItem(${index})" style="font-size:10px;">Steam</button>
                </div>`;
        });
    });
}

function renderCases() {
    const lang = localStorage.getItem('lang') || 'uz';
    const grid = document.getElementById('cases-grid');
    if(!grid) return;
    grid.innerHTML = "";
    cases.forEach(c => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}" class="case-img coin-glow">
                <p class="case-name">${c.name[lang]}</p>
                <button class="case-buy-btn" onclick="startRoulette('${c.id}')">
                    <span>${c.price}</span>
                    <img src="img/nav_diamond.png" style="width:20px;">
                </button>
            </div>`;
    });
}

// Boshlang'ich yuklash
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.expand();
    updateUIBalance();
    renderCases();
});
