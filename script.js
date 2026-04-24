// --- 1. CONFIGURATION & DATA ---
const cases = [
    { name: "Budget", price: "500", img: "case1.png" },
    { name: "Starter", price: "1500", img: "case2.webp" },
    { name: "Basic", price: "2500", img: "case3.webp" },
    { name: "Silver", price: "3500", img: "case4.webp" },
    { name: "Gold", price: "4500", img: "case5.png" },
    { name: "Elite", price: "5500", img: "case6.webp" },
    { name: "Master", price: "6500", img: "case7.webp" },
    { name: "Pro", price: "7500", img: "case8.png" },
    { name: "Legend", price: "8500", img: "case9.png" },
    { name: "God", price: "10000", img: "case10.png" }
];

const translations = {
    uz: { topup: "To'ldirish", cases_title: "CASES", bonus_title: "BONUS", inventory_title: "INVENTORY", profile_title: "PROFILE", bonus_card: "Kunlik bonusni qabul qiling!", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Tilni tanlang:", trade_link_title: "Steam Trade Link:", save_btn: "Saqlash" },
    ru: { topup: "Пополнить", cases_title: "КЕЙСЫ", bonus_title: "БОНУС", inventory_title: "ИНВЕНТАРЬ", profile_title: "ПРОФИЛЬ", bonus_card: "Получите ежедневный бонус!", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", select_lang: "Выберите язык:", trade_link_title: "Steam Trade Link:", save_btn: "Сохранить" },
    en: { topup: "Top Up", cases_title: "CASES", bonus_title: "BONUS", inventory_title: "INVENTORY", profile_title: "PROFILE", bonus_card: "Claim your daily bonus!", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Select Language:", trade_link_title: "Steam Trade Link:", save_btn: "Save" }
};

// --- 2. BALANS VA STORAGE LOGIKASI ---
function getBalance(callback) {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
        window.Telegram.WebApp.CloudStorage.getItem('userBalance', (err, val) => {
            callback(val ? parseInt(val) : 10000);
        });
    } else {
        callback(parseInt(localStorage.getItem('userBalance') || 10000));
    }
}

function updateBalance(amount) {
    getBalance((currentBal) => {
        let newBal = currentBal + amount;
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
            window.Telegram.WebApp.CloudStorage.setItem('userBalance', newBal.toString());
        }
        localStorage.setItem('userBalance', newBal.toString());
        
        // Barcha balans ko'rsatkichlarini yangilash
        const els = ['balance', 'balance-large', 'display-balance'];
        els.forEach(id => {
            let el = document.getElementById(id);
            if(el) el.innerText = newBal;
        });
    });
}

// --- 3. SAHIFA VA NAVIGATSIYA ---
function showPage(pageId, element) {
    // Sahifalarni almashtirish
    document.querySelectorAll('.view, .page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageId);
    if(targetPage) targetPage.classList.add('active');

    // Navigatsiya tugmalarini faollashtirish
    document.querySelectorAll('.nav-btn, .nav-item').forEach(n => n.classList.remove('active'));
    if(element) {
        element.classList.add('active');
    } else {
        // Agar tugma bosilmasdan chaqirilsa (masalan JS orqali)
        const activeNav = document.querySelector(`[onclick*="showPage('${pageId}'"]`) || document.querySelector(`[onclick*="setPage('${pageId}'"]`);
        if(activeNav) activeNav.classList.add('active');
    }
    
    if(pageId === 'inventory') renderInventory();
}

// --- 4. RENDER (CHIZISH) FUNKSIYALARI ---
function renderCases() {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = "";
    cases.forEach(c => {
        let clickAction = (c.name === "Budget") ? 'onclick="startBudgetRoulette()"' : 'onclick="alert(\'Tez orada...\')"';
        grid.innerHTML += `
            <div class="case-card card-box">
                <img src="img/${c.img}" alt="${c.name}" style="width:100%; border-radius:10px;">
                <p style="margin:10px 0; font-weight:bold;">${c.name}</p>
                <button class="btn-glow" ${clickAction} style="width:100%;">${c.price} Coin</button>
            </div>`;
    });
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid') || document.getElementById('inv-grid');
    if (!grid) return;
    let inv = JSON.parse(localStorage.getItem('userInventory') || '[]');
    grid.innerHTML = inv.length === 0 ? '<p style="text-align:center; padding:20px; color:#777;">Inventar bo\'sh</p>' : "";
    inv.forEach((item) => {
        grid.innerHTML += `
            <div class="inventory-card card-box">
                <img src="${item.img}" class="skin-thumb" style="width:100px;">
                <p>${item.name}</p>
            </div>`;
    });
}

// --- 5. BONUS VA VAZIFALAR ---
function claimDailyBonus() {
    updateBalance(500);
    playSound('win');
    alert("500 COIN hisobingizga qo'shildi!");
    const btn = document.getElementById('bonus-btn');
    if(btn) {
        btn.disabled = true;
        btn.innerText = "OLINDI";
        btn.style.opacity = "0.5";
    }
}

function handleSocialTask(type) {
    let url = type === 'tg' ? "https://t.me/XanzoSkins" : "https://instagram.com/XanzoSkins";
    window.open(url, "_blank");
    setTimeout(() => {
        updateBalance(150);
        playSound('win');
        alert("+150 COIN vazifa uchun qo'shildi!");
    }, 2000);
}

// --- 6. INITIALIZATION (BOSHLAISH) ---
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    if(tg) {
        tg.expand();
        tg.ready();
    }
    
    // Balansni yuklash va chiqarish
    getBalance((val) => {
        const els = ['balance', 'balance-large', 'display-balance'];
        els.forEach(id => {
            let el = document.getElementById(id);
            if(el) el.innerText = val;
        });
    });

    renderCases();
    
    // Tilni sozlash
    const lang = localStorage.getItem('lang') || 'uz';
    setLanguage(lang);

    // Trade linkni yuklash
    const savedTradeLink = localStorage.getItem('tradeLink');
    const tradeInput = document.getElementById('tradeLinkInput');
    if (savedTradeLink && tradeInput) tradeInput.value = savedTradeLink;
});

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
    });
}

function saveTradeLink() {
    const link = document.getElementById('tradeLinkInput').value;
    if (link) {
        localStorage.setItem('tradeLink', link);
        alert("Trade Link saqlandi!");
    }
}

// --- AUDIO ---
const sounds = {
    spin: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7306282998.mp3'),
    win: new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3')
};

function playSound(type) {
    if(sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(e => console.log("Audio yoqish uchun foydalanuvchi harakati kerak."));
    }
}

// Eskicha nomlangan funksiyalar uchun ko'prik (compatibility)
const app = {
    claimDaily: claimDailyBonus,
    socialTask: handleSocialTask,
    setPage: showPage,
    init: () => { /* Allaqachon DOMContentLoaded ichida ishlaydi */ }
};
