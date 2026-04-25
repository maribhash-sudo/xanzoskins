// Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand();

// Sahifalarni almashtirish
function showPage(pageId, btn) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    tg.HapticFeedback.impactOccurred('light');
}

// Boshlang'ich funksiyalar
document.addEventListener('DOMContentLoaded', () => {
    console.log("Xanzo Skins ishga tushdi!");
});
