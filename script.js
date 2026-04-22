// A. Sahifalar va Header nazorati
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    // Header faqat Cases sahifasida ko'rinadi
    const header = document.getElementById('main-header');
    header.style.display = (pageId === 'cases') ? 'flex' : 'none';

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');
}

// B. 10 ta Keyslar
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

// C. Til lug'ati
const translations = {
    uz: { topup: "To'ldirish", cases_title: "CASES", bonus_title: "BONUS", inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Tilni tanlang:", trade_link_title: "Steam Trade Link:", save_btn: "Saqlash", bonus_card: "Kundalik bonusni qabul qiling!" },
    ru: { topup: "Пополнить", cases_title: "КЕЙСЫ", bonus_title: "БОНУС", inventory_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", select_lang: "Выберите язык:", trade_link_title: "Steam Trade Link:", save_btn: "Сохранить", bonus_card: "Получите бонус!" },
    en: { topup: "Top Up", cases_title: "CASES", bonus_title: "BONUS", inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", select_lang: "Select Language:", trade_link_title: "Steam Trade Link:", save_btn: "Save", bonus_card: "Claim daily bonus!" }
};

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
}

function saveTradeLink() {
    const link = document.getElementById('tradeLinkInput').value;
    if (link) {
        localStorage.setItem('tradeLink', link);
        alert("Saved!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Keyslarni yuklash
    const grid = document.getElementById('cases-grid');
    if (grid) {
        grid.innerHTML = "";
        cases.forEach(c => {
            grid.innerHTML += `
                <div class="case-card">
                    <img src="img/${c.img}">
                    <p>${c.name}</p>
                    <button onclick="alert('Keys ochildi!')">${c.price} Coin</button>
                </div>`;
        });
    }

    // Telegram User
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe?.user) {
        document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
        if (tg.initDataUnsafe.user.photo_url) {
            document.getElementById('user-avatar').innerHTML = `<img src="${tg.initDataUnsafe.user.photo_url}" style="width:100%;height:100%;object-fit:cover;">`;
        }
    }

    setLanguage(localStorage.getItem('lang') || 'uz');
});
