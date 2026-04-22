// A. Sahifalarni almashtirish
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// B. 10 ta Keyslar ro'yxati (Siz yuborgan)
// 1. 10 ta Keyslar ro'yxati (To'liq)
const cases = [
    { id: 1, name: "Budget", price: 500, img: "case1.png" },
    { id: 2, name: "Starter", price: 1500, img: "case2.webp" },
    { id: 3, name: "Basic", price: 2500, img: "case3.webp" },
    { id: 4, name: "Silver", price: 3500, img: "case4.webp" },
    { id: 5, name: "Gold", price: 4500, img: "case5.png" },
    { id: 6, name: "Elite", price: 5500, img: "case6.webp" },
    { id: 7, name: "Master", price: 6500, img: "case7.webp" },
    { id: 8, name: "Pro", price: 7500, img: "case8.png" },
    { id: 9, name: "Legend", price: 8500, img: "case9.png" },
    { id: 10, name: "God", price: 10000, img: "case10.png" }
];

// 2. Vazifalar
let tasks = [
    { id: 'tg', name: "Telegram Obuna", reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: "Instagram Obuna", reward: 250, done: false, link: 'https://instagram.com/' }
];

// 3. Sahifani almashtirish
function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    if(element) element.classList.add('active');
}

// 4. Bonus tizimi
function renderTasks() {
    const active = document.getElementById('active-tasks-list');
    const done = document.getElementById('done-tasks-list');
    if(!active) return;
    active.innerHTML = ""; done.innerHTML = "";
    tasks.forEach(t => {
        const card = `<div class="task-card">
            <div class="task-info"><span>${t.name}</span><small>+${t.reward} COIN</small></div>
            <button class="btn-task ${t.done ? 'done-btn' : ''}" onclick="completeTask('${t.id}')">${t.done ? 'DONE' : 'CLAIM'}</button>
        </div>`;
        t.done ? done.innerHTML += card : active.innerHTML += card;
    });
}

function completeTask(id) {
    const t = tasks.find(x => x.id === id);
    if (!t.done) {
        t.done = true;
        let bal = parseInt(document.getElementById('balance').innerText);
        document.getElementById('balance').innerText = bal + t.reward;
        if(t.link) window.open(t.link, '_blank');
        renderTasks();
    }
}

// 5. Roulette va Randomizer
function startSpin() {
    const modal = document.getElementById('case-modal');
    const track = document.getElementById('roulette-track');
    modal.style.display = 'flex';
    track.innerHTML = "";
    for(let i=0; i<50; i++) {
        track.innerHTML += `<div class="item"><img src="img/case1.png"><small>SKIN</small></div>`;
    }
    setTimeout(() => {
        track.style.transition = "transform 5s cubic-bezier(0.15, 0, 0.15, 1)";
        track.style.transform = `translateX(-4000px)`;
    }, 50);
    setTimeout(() => { 
        document.getElementById('win-display').innerText = "TABRIKLAYMIZ!"; 
        document.getElementById('close-modal-btn').style.display = "block";
    }, 5500);
}

function closeModal() { 
    document.getElementById('case-modal').style.display = 'none'; 
    document.getElementById('close-modal-btn').style.display = "none";
    document.getElementById('roulette-track').style.transition = "none"; 
    document.getElementById('roulette-track').style.transform = "translateX(0)"; 
}

// 6. Asosiy yuklanish
document.addEventListener("DOMContentLoaded", () => {
    // Keyslarni render qilish (10 ta keys)
    const grid = document.getElementById('cases-grid');
    if(grid) {
        grid.innerHTML = "";
        cases.forEach(c => {
            grid.innerHTML += `
                <div class="case-card">
                    <img src="img/${c.img}">
                    <p>${c.name}</p>
                    <button onclick="startSpin()">${c.price} COIN</button>
                </div>`;
        });
    }
    
    renderTasks();
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe?.user) document.getElementById('user-name').innerText = tg.initDataUnsafe.user.first_name;
});

function saveSteamLink() {
    const link = document.getElementById('tradeLinkInput').value;
    if (link.includes('steamcommunity.com')) {
        let bal = parseInt(document.getElementById('balance').innerText);
        document.getElementById('balance').innerText = bal + 150;
        alert("Steam ulangan! +150 COIN.");
    } else { alert("Link xato!"); }
}
