let casesDatabase = {}; // Bu yerda hammasi saqlanadi

// --- 2. O'RTADA (Funksiya) ---
function initCaseDatabase() {
    casesConfig.forEach(c => {
        casesDatabase[c.id] = [];
    });

    // Tactical uchun
    casesDatabase["tactical"] = tacticalSkins.map(skin => ({
        name: skin.name,
        price: Math.floor(Math.random() * 5000) + 1000,
        img: `img/tactical/${skin.img}`
    }));

    // Boshqalar uchun
    casesConfig.forEach(c => {
        if (c.id !== "tactical") {
            for (let i = 1; i <= c.count; i++) {
                casesDatabase[c.id].push({
                    name: "Skin " + i,
                    price: Math.floor(Math.random() * 3000) + 100,
                    img: `img/${c.folder}/${i}.png`
                });
            }
        }
    });
}

// roulette.js - TO'LIQ YANGILANGAN VARIANT
// DIQQAT: Bu yerda 'let currentWinningSkin' yozuvi yo'q!

// Inventarga qo'shish
function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}

// --- ROULETTE.JS ---

// Global o'zgaruvchilarni to'qnashmasligi uchun bitta obyektga yig'amiz
window.appData = window.appData || {
    currentWinningSkin: null,
    currentCaseId: null
};

function startRoulette(caseId) {
    const selectedCase = cases.find(c => c.id === caseId);
    if (!selectedCase) return;

    window.appData.currentCaseId = caseId; // ID ni saqlab qo'yamiz

    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        if (bal < selectedCase.price) { 
            alert("Balans yetarli emas!"); 
            return; 
        }
        
        updateBalance(-selectedCase.price);
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        // Yutuqni aniqlash
        for (let i = 0; i < 50; i++) {
            let s = skinsDatabase[Math.floor(Math.random() * skinsDatabase.length)];
            track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
            if (i === 40) window.appData.currentWinningSkin = s;
        }

        setTimeout(() => {
            track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
            track.style.top = `-${40 * 160 - 80}px`; 
        }, 500);

        setTimeout(() => {
            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            document.getElementById('won-skin-img').src = window.appData.currentWinningSkin.img;
            document.getElementById('won-skin-name').innerText = window.appData.currentWinningSkin.name;
            
            const priceEl = document.getElementById('won-skin-price');
            if (priceEl) {
                priceEl.innerHTML = `<img src="img/nav_diamond.png" style="width:16px; vertical-align:middle;"> ${window.appData.currentWinningSkin.price} COIN`;
            }
            
            addToInventory(window.appData.currentWinningSkin);
            if(typeof playSound === 'function') playSound('win');
        }, 5700);
    });
}

function spinAgainAndSave() {
    if (window.appData.currentWinningSkin) {
        addToInventory(window.appData.currentWinningSkin);
        document.getElementById('roulette-modal').style.display = 'none';
        
        setTimeout(() => {
            startRoulette(window.appData.currentCaseId); 
        }, 500);
    }
}

function exitAndSave() {
    if (window.appData.currentWinningSkin) {
        addToInventory(window.appData.currentWinningSkin);
    }
    document.getElementById('roulette-modal').style.display = 'none';
    showPage('cases', document.querySelector('[onclick*="cases"]'));
}

function sellWonSkin() {
    if (!window.appData.currentWinningSkin) return;
    updateBalance(window.appData.currentWinningSkin.price);
    
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.pop(); 
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
    document.getElementById('roulette-modal').style.display = 'none';
}

function withdrawWonSkin() {
    alert("Steam profilingizga yuborildi!");
    document.getElementById('roulette-modal').style.display = 'none';
}
