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

// 1. 10 ta Keyslar ro'yxati
const cases = [
    { name: "kambagal", price: 500, img: "case1.png" },
    { name: "ishi yurshgan", price: 1500, img: "case2.webp" },
    { name: "sparki bor", price: 2500, img: "case3.webp" },
    { name: "jentrasi bor", price: 3500, img: "case4.webp" },
    { name: "malibusi bor", price: 4500, img: "case5.png" },
    { name: "BMW M5", price: 5500, img: "case6.webp" },
    { name: "BMW M8", price: 6500, img: "case7.webp" },
    { name: "samalyot", price: 7500, img: "case8.png" },
    { name: "yaxta", price: 8500, img: "case9.png" },
    { name: "osmondagi oy", price: 10000, img: "case10.png" }
];

// 2. Bonus vazifalari
let tasks = [
    { id: 'tg', name: "Telegram Obuna", reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: "Instagram Obuna", reward: 250, done: false, link: 'https://instagram.com/' }
];

// 3. Til lug'ati
const translations = {
    uz: { cases_title: "CASES", bonus_title: "ACTIVE TASKS", save_btn: "SAQLASH & +150 COIN", topup: "TO'LDIRISH" },
    ru: { cases_title: "КЕЙСЫ", bonus_title: "ЗАДАНИЯ", save_btn: "СОХРАНИТЬ & +150 COIN", topup: "ПОПОЛНИТЬ" },
    en: { cases_title: "CASES", bonus_title: "TASKS", save_btn: "SAVE & +150 COIN", topup: "TOP UP" }
};

// 4. Sahifani almashtirish funksiyasi
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    // Header faqat Cases sahifasida ko'rinadi
    const header = document.getElementById('main-header');
    if (header) {
        header.style.display = (pageId === 'cases') ? 'flex' : 'none';
    }

    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');
}

// 5. Keyslarni ekranga chiqarish (RENDER)
function renderCases() {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = ""; // Tozalash
    cases.forEach(c => {
        grid.innerHTML += `
            <div class="case-card">
                <img src="img/${c.img}" alt="${c.name}">
                <p style="color: #FF4500; font-weight: 800;">${c.name}</p>
                <button onclick="alert('Keys ochilmoqda...')">${c.price} COIN</button>
            </div>`;
    });
}

// 6. Bonus vazifalarni chiqarish
function renderTasks() {
    const active = document.getElementById('active-tasks-list');
    const done = document.getElementById('done-tasks-list');
    if(!active) return;
    active.innerHTML = ""; done.innerHTML = "";
    tasks.forEach(t => {
        const card = `<div class="task-card">
            <div class="task-info"><span style="color: #FF4500; font-weight: 800;">${t.name}</span><small style="color: #fff;">+${t.reward} COIN</small></div>
            <button class="btn-task ${t.done ? 'done-btn' : ''}" onclick="completeTask('${t.id}')">${t.done ? 'DONE' : 'CLAIM'}</button>
        </div>`;
        t.done ? done.innerHTML += card : active.innerHTML += card;
    });
}

function completeTask(id) {
    const t = tasks.find(x => x.id === id);
    if (t && !t.done) {
        t.done = true;
        updateBalance(t.reward);
        if(t.link) window.open(t.link, '_blank');
        renderTasks();
    }
}

// 7. Steam Link saqlash va Bonus berish
function saveSteamLink() {
    const link = document.getElementById('tradeLinkInput').value;
    if (link.includes('steamcommunity.com')) {
        updateBalance(150);
        localStorage.setItem('tradeLink', link);
        alert("Steam ulangan! +150 COIN.");
    } else { alert("Trade link xato!"); }
}

function updateBalance(amt) {
    let balEl = document.getElementById('balance');
    let currentBal = parseInt(balEl.innerText);
    balEl.innerText = currentBal + amt;
}

// 8. Tilni o'zgartirish
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    // Bu yerda data-lang atributli elementlar matni almashadi
    alert("Til tanlandi: " + lang.toUpperCase());
}

// 9. Dastur ishga tushganda
document.addEventListener("DOMContentLoaded", () => {
    renderCases(); // 10 ta keysni chiqaradi
    renderTasks(); // Vazifalarni chiqaradi
    
    // Telegram ismini olish
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe?.user) {
        document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
    }
});
