const budgetSkins = [
    { name: "AK-47", img: "img/AK47.png", price: 500 },
    { name: "Deagle White", img: "img/DEAGLEWHITE.png", price: 700 },
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 300 },
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 200 },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAINT.png", price: 900 },
    { name: "M4A1-S Red", img: "img/M4A1-SRED.png", price: 850 },
    { name: "Mac 10", img: "img/MAC10.png", price: 400 },
    { name: "MP5", img: "img/MP5.png", price: 350 },
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 250 },
    { name: "USP Tropic", img: "img/USP-TOPIC.png", price: 1500 }
];

let currentWinningSkin = null;

// Inventarga qo'shish uchun yordamchi funksiya
function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}

function startBudgetRoulette() {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        
        if (bal < 500) { alert("Balans yetarli emas!"); return; }
        
        // Balansdan 500 ayiramiz (updateBalance funksiyasi script.js da bor)
        updateBalance(-500); 
        
        // Ovoz effekti
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        if (!modal || !track || !viewport || !resultDisplay) return;

        // Animatsiyani boshlash (Keys rasmi titrashi)
        const caseImg = document.querySelector('.case-img');
        if(caseImg) caseImg.classList.add('case-shake');

        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        // Ruletka elementlari
        for (let i = 0; i < 50; i++) {
            let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
            track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
            if (i === 40) currentWinningSkin = s;
        }

        // Animatsiya hisob-kitobi (Item height = 200px)
        setTimeout(() => {
            if(caseImg) caseImg.classList.remove('case-shake');
            
            const WINNER_INDEX = 40;
            const ITEM_HEIGHT = 200; 
            const VIEWPORT_HEIGHT = 200;
            
            // Aniqlik uchun formula: yutgan item o'rtaga tushishi uchun
            let offset = (WINNER_INDEX * ITEM_HEIGHT) - (VIEWPORT_HEIGHT / 2) + (ITEM_HEIGHT / 2);
            
            track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
            track.style.top = `-${offset}px`; 
        }, 500);

        setTimeout(() => {
            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            document.getElementById('won-skin-img').src = currentWinningSkin.img;
            document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
            document.getElementById('won-skin-price').innerHTML = 
                `<img src="img/nav_diamond.png" style="width:16px; vertical-align:middle;"> ${currentWinningSkin.price} COIN`;
            
            // Inventarga CloudStorage orqali qo'shish
            addToInventory(currentWinningSkin);
            
            if(typeof playSound === 'function') playSound('win');
        }, 5700); // Spin tugagach natija
    });
}

function sellWonSkin() {
    if (!currentWinningSkin) return;
    
    // Balansni qaytarib qo'shish
    updateBalance(currentWinningSkin.price);
    
    // Inventardan o'chirish (CloudStorage)
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.pop(); // Oxirgi qo'shilgan yutuqni o'chiradi
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
    
    document.getElementById('roulette-modal').style.display = 'none';
}

function withdrawWonSkin() {
    alert("Steam profilingizga yuborildi!");
    document.getElementById('roulette-modal').style.display = 'none';
}
