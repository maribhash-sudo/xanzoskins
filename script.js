// A. Sahifalarni almashtirish
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// B. 10 ta Keyslar ro'yxati (Siz yuborgan)
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

// C. Til lug'ati (Uzbek, Russian, English)
const translations = {
    uz: {
        topup: "To'ldirish",
        cases_title: "CASES",
        bonus_title: "BONUS",
        inventory_title: "INVENTORY",
        profile_title: "PROFILE",
        bonus_card: "Kundalik bonusni qabul qiling!",
        nav_bonus: "Bonus",
        nav_cases: "Cases",
        nav_inv: "Inv",
        nav_profile: "Profile",
        select_lang: "Tilni tanlang:",
        trade_link_title: "Steam Trade Link:",
        save_btn: "Saqlash",
        link_saved: "Trade Link saqlandi!",
    },
    ru: {
        topup: "Пополнить",
        cases_title: "КЕЙСЫ",
        bonus_title: "БОНУС",
        inventory_title: "ИНВЕНТАРЬ",
        profile_title: "ПРОФИЛЬ",
        bonus_card: "Получите ежедневный бонус!",
        nav_bonus: "Бонус",
        nav_cases: "Кейсы",
        nav_inv: "Инв.",
        nav_profile: "Профиль",
        select_lang: "Выберите язык:",
        trade_link_title: "Steam Trade Link:",
        save_btn: "Сохранить",
        link_saved: "Trade Link сохранен!",
    },
    en: {
        topup: "Top Up",
        cases_title: "CASES",
        bonus_title: "BONUS",
        inventory_title: "INVENTORY",
        profile_title: "PROFILE",
        bonus_card: "Claim your daily bonus!",
        nav_bonus: "Bonus",
        nav_cases: "Cases",
        nav_inv: "Inv",
        nav_profile: "Profile",
        select_lang: "Select Language:",
        trade_link_title: "Steam Trade Link:",
        save_btn: "Save",
        link_saved: "Trade Link Saved!",
    }
};

// D. Sahifa yuklanganda bajariladigan ishlar
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Keyslarni Render qilish
    const grid = document.getElementById('cases-grid');
    if (grid) {
        grid.innerHTML = ""; 
        cases.forEach(c => {
            grid.innerHTML += `
                <div class="case-card">
                    <img src="img/${c.img}" alt="${c.name}">
                    <p>${c.name}</p>
                    <button onclick="alert('Keys ochildi!')">${c.price} Coin</button>
                </div>`;
        });
    }

    // 2. Telegram User ma'lumotlarini olish (Ism va Avatar)
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const nameEl = document.getElementById('user-name');
        const avatarEl = document.getElementById('user-avatar');
        
        if (nameEl) nameEl.innerText = user.first_name;
        if (avatarEl && user.photo_url) {
            avatarEl.innerHTML = `<img src="${user.photo_url}" style="width:100%; height:100%; object-fit:cover;">`;
        }
    }

    // 3. Saqlangan ma'lumotlarni yuklash (Til va Trade Link)
    const currentLang = localStorage.getItem('lang') || 'uz';
    setLanguage(currentLang);
    
    const savedTradeLink = localStorage.getItem('tradeLink');
    if (savedTradeLink) document.getElementById('tradeLinkInput').value = savedTradeLink;
});

// E. Profil Funksiyalari
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

function saveTradeLink() {
    const link = document.getElementById('tradeLinkInput').value;
    if (link) {
        localStorage.setItem('tradeLink', link);
        const currentLang = localStorage.getItem('lang') || 'uz';
        alert(translations[currentLang].link_saved);
    }
}