function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// 2. Keyslar ro'yxati (Siz yuborgan)
const cases = [
    { id: 1, name: "Budget", price: "500", img: "case1.png" },
    { id: 2, name: "Starter", price: "1500", img: "case2.webp" },
    { id: 3, name: "Basic", price: "2500", img: "case3.webp" },
    { id: 4, name: "Silver", price: "3500", img: "case4.webp" },
    { id: 5, name: "Gold", price: "4500", img: "case5.png" },
    { id: 6, name: "Elite", price: "5500", img: "case6.webp" },
    { id: 7, name: "Master", price: "6500", img: "case7.webp" },
    { id: 8, name: "Pro", price: "7500", img: "case8.png" },
    { id: 9, name: "Legend", price: "8500", img: "case9.png" },
    { id: 10, name: "God", price: "10000", img: "case10.png" }
];

// 3. Til lug'ati
const translations = {
    uz: { topup: "To'ldirish", cases_title: "CASES", bonus_title: "BONUS", bonus_desc: "Kundalik bonus!", inv_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", lang_select: "Tilni tanlang:", trade_link: "Trade Link:", save_btn: "Saqlash", claimed: "Done", claim: "Claim", daily_task: "Kunlik sovg'a", insta_task: "Insta-ga obuna", steam_task: "Steam Trade Linkni kiritish", done_title: "COMPLETED", bonus_active: "TASKS" },
    ru: { topup: "Пополнить", cases_title: "КЕЙСЫ", bonus_title: "БОНУС", bonus_desc: "Ежедневный бонус!", inv_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инв.", nav_profile: "Профиль", lang_select: "Выберите язык:", trade_link: "Trade Link:", save_btn: "Сохранить", claimed: "Готово", claim: "Забрать", daily_task: "Ежедневный бонус", insta_task: "Подписка на Insta", steam_task: "Ввод Steam Trade Link", done_title: "ВЫПОЛНЕНО", bonus_active: "ЗАДАЧИ" },
    en: { topup: "Top Up", cases_title: "CASES", bonus_title: "BONUS", bonus_desc: "Daily bonus!", inv_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inv", nav_profile: "Profile", lang_select: "Select Language:", trade_link: "Trade Link:", save_btn: "Save", claimed: "Done", claim: "Claim", daily_task: "Daily bonus", insta_task: "Subscribe Insta", steam_task: "Enter Steam Trade Link", done_title: "COMPLETED", bonus_active: "ACTIVE TASKS" }
};

// 4. Vazifalar logikasi (id va reward bilan)
const initialTasks = [
    { id: 'tg', name: "Daily Bonus", reward: 100, done: false },
    { id: 'insta', name: "Subscribe Insta", reward: 250, done: false },
    { id: 'steam', name: "Steam Link", reward: 500, done: false }
];

// 5. Asosiy sahifa logikasi
document.addEventListener("DOMContentLoaded", () => {
    // Keyslarni Render qilish
    const grid = document.getElementById('cases-grid');
    if (grid) cases.forEach(c => grid.innerHTML += `<div class="case-card"><img src="img/${c.img}"><p>${c.name}</p><button onclick="startSpin()">${c.price} Coin</button></div>`);

    // Telegram User
    const tg = window.Telegram.WebApp;
    tg.expand();
    if (tg.initDataUnsafe?.user) {
        document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
        if(tg.initDataUnsafe.user.photo_url) document.getElementById('user-avatar').innerHTML = `<img src="${tg.initDataUnsafe.user.photo_url}" style="width:100%; border-radius:50%">`;
    }

    // Saqlangan til, balans va trade linkni yuklash
    setLanguage(localStorage.getItem('lang') || 'uz');
    
    // Balans va Vazifalar holatini saqlash/yuklash
    let storedBal = parseInt(localStorage.getItem('balance')) || 10000;
    document.getElementById('balance').innerText = storedBal;
    
    tasks = JSON.parse(localStorage.getItem('tasks')) || initialTasks;
    renderTasks();
});

// 6. Bonus Funksiyalari (Rasmdagidek)
function renderTasks() {
    const activeList = document.getElementById('active-tasks-list');
    const doneList = document.getElementById('done-tasks-list');
    const currentLang = localStorage.getItem('lang') || 'uz';

    if(!activeList || !doneList) return;

    activeList.innerHTML = "";
    doneList.innerHTML = "";

    tasks.forEach(t => {
        // Lug'atdan vazifa nomini olish
        let taskNameKey = t.id === 'tg' ? 'daily_task' : t.id === 'insta' ? 'insta_task' : 'steam_task';
        let taskTitle = translations[currentLang][taskNameKey];

        const card = `
            <div class="task-card ${t.done ? 'done-task' : ''}">
                <div class="task-info">
                    <span>${taskTitle}</span>
                    <small>+${t.reward} Coin</small>
                </div>
                <button class="btn-task ${t.done ? 'done-btn' : ''}" onclick="claimBonus('${t.id}')">
                    ${t.done ? translations[currentLang]['claimed'] : translations[currentLang]['claim']}
                </button>
            </div>`;
        t.done ? doneList.innerHTML += card : activeList.innerHTML += card;
    });
}

function claimBonus(taskId) {
    const t = tasks.find(x => x.id === taskId);
    if (!t.done) {
        t.done = true;
        let bal = parseInt(document.getElementById('balance').innerText);
        let newBal = bal + t.reward;
        
        // Balans va Vazifalarni saqlash
        document.getElementById('balance').innerText = newBal;
        localStorage.setItem('balance', newBal);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        renderTasks();
    }
}

// 7. Profil va Randomizer Funksiyalari
function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    renderTasks(); // Vazifalarni ham qayta render qilamiz (matnlar o'zgarishi uchun)
}

function startSpin() {
    const modal = document.getElementById('case-modal');
    const track = document.getElementById('roulette-track');
    modal.style.display = 'flex';
    track.innerHTML = "";
    for(let i=0; i<50; i++) track.innerHTML += `<div class="item"><img src="img/case1.png"><small>Skin</small></div>`;
    
    setTimeout(() => {
        track.style.transition = "transform 5s cubic-bezier(0.15, 0, 0.15, 1)";
        track.style.transform = `translateX(-4000px)`;
    }, 50);

    setTimeout(() => { document.getElementById('win-display').innerText = "Knife | Fade!"; document.getElementById('close-modal-btn').style.display = "block"; }, 5500);
}

function closeModal() { document.getElementById('case-modal').style.display = 'none'; document.getElementById('roulette-track').style.transition = "none"; document.getElementById('roulette-track').style.transform = "translateX(0)"; document.getElementById('win-display').innerText = ""; document.getElementById('close-modal-btn').style.display = "none"; }
function saveTradeLink() { localStorage.setItem('tradeLink', document.getElementById('tradeLinkInput').value); alert("Saqlandi!"); }
