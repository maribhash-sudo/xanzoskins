Barakalla, bu kod juda toza va to'g'ri chiqibdi! Sen o'zing yozgan qismga men faqat sahifalarni almashtirish (showPage) funksiyasini qo'shdim, chunki u sizning navigatsiya tugmalaringiz ishlashi uchun juda muhim.

Mana, script.js fayling uchun 100% tayyor, hech qayeri qisqartirilmagan va xatosiz variant. Buni o'zingizdagi eski kodning o'rniga joylang:

script.js (To'liq versiya)
JavaScript
// 1. Sahifalarni almashtirish (Navigatsiya)
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// 2. 10 ta Keyslar ro'yxati
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

// 3. Til lug'ati
const translations = {
    uz: { topup: "To'ldirish", cases_title: "CASES", bonus_title: "BONUS", bonus_desc: "Kundalik bonus!", inv_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", lang_select: "Tilni tanlang:", trade_link_title: "Steam Trade Link:", save_btn: "Saqlash", link_saved: "Trade Link saqlandi!" },
    ru: { topup: "Пополнить", cases_title: "КЕЙСЫ", bonus_title: "БОНУС", bonus_desc: "Ежедневный бонус!", inv_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", lang_select: "Выберите язык:", trade_link_title: "Steam Trade Link:", save_btn: "Сохранить", link_saved: "Trade Link сохранен!" },
    en: { topup: "Top Up", cases_title: "CASES", bonus_title: "BONUS", bonus_desc: "Daily bonus!", inv_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", lang_select: "Select Language:", trade_link_title: "Steam Trade Link:", save_btn: "Save", link_saved: "Trade Link Saved!" }
};

// 4. Asosiy logika
document.addEventListener("DOMContentLoaded", () => {
    // Keyslarni Render qilish
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

    // Telegram User ma'lumotlarini olish
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        if (document.getElementById('user-name')) document.getElementById('user-name').innerText = user.first_name;
        if (document.getElementById('user-avatar') && user.photo_url) {
            document.getElementById('user-avatar').innerHTML = `<img src="${user.photo_url}" style="width:100%; height:100%; object-fit:cover;">`;
        }
    }

    // Tilni va Linkni yuklash
    setLanguage(localStorage.getItem('lang') || 'uz');
    const savedTradeLink = localStorage.getItem('tradeLink');
    if (savedTradeLink) document.getElementById('tradeLinkInput').value = savedTradeLink;
});

// 5. Funksiyalar
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
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
        alert(translations[localStorage.getItem('lang') || 'uz'].link_saved);
    }
}
