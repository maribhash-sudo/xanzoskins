function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

const cases = [
    { name: "Budget", price: "500", img: "case1.png" },
    { name: "Starter", price: "1500", img: "case2.webp" },
    { name: "Basic", price: "2500", img: "case3.webp" },
    { name: "Silver", price: "3500", img: "case4.webp" },
    { name: "Gold", price: "4500", img: "case5.png" }
];

document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById('cases-grid');
    cases.forEach(c => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}">
                <p>${c.name}</p>
                <button>${c.price} Coin</button>
            </div>`;
    });
});
const sfTranslations = {
    en: {
        change_lang: "Change Language",
        trade_link: "Trade Link",
        community: "Community",
        support: "Contact Support"
    },
    ru: {
        change_lang: "Сменить язык",
        trade_link: "Трейд ссылка",
        community: "Сообщество",
        support: "Поддержка"
    }
};

let sfCurrentLang = 'en';

function toggleLanguage() {
    // Tilni almashtirish
    sfCurrentLang = sfCurrentLang === 'en' ? 'ru' : 'en';
    
    // UI ni yangilash
    document.getElementById('current-lang-display').innerText = sfCurrentLang.toUpperCase();
    
    document.querySelectorAll('#profile-settings-section [data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.innerText = sfTranslations[sfCurrentLang][key];
    });
}

function handleTradeLink() {
    // Trade link uchun oddiy prompt (keyinchalik modal qilishingiz mumkin)
    const link = prompt(sfCurrentLang === 'en' ? "Enter your Trade Link:" : "Введите вашу Трейд ссылку:");
    if (link) {
        console.log("Saved Link:", link);
        alert(sfCurrentLang === 'en' ? "Saved!" : "Сохранено!");
    }
}
