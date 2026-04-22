// 1. Sahifalarni almashtirish
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');
}

// 2. Til logikasi
let currentLang = 'en';
const translations = {
    en: { change_lang: "Change Language", trade_link: "Trade Link", community: "Community" },
    ru: { change_lang: "Сменить язык", trade_link: "Трейд ссылка", community: "Сообщество" }
};

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    document.getElementById('current-lang-display').innerText = currentLang.toUpperCase();
    
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        el.innerText = translations[currentLang][key];
    });
}

// 3. Trade Link
function handleTradeLink() {
    const link = prompt(currentLang === 'en' ? "Enter your Trade Link:" : "Введите трейд ссылку:");
    if(link) alert(currentLang === 'en' ? "Saved!" : "Сохранено!");
}
