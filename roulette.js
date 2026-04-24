const budgetSkins = [
    { name: "AK-47", img: "img/AK47.png", price: 500, rarity: "cover", quality: "FN" },
    { name: "Deagle White", img: "img/DEAGLEWHITE.png", price: 700, rarity: "classified", quality: "MW" },
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 300, rarity: "restricted", quality: "FT" },
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 200, rarity: "milspec", quality: "WW" },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAINT.png", price: 900, rarity: "classified", quality: "FN" },
    { name: "M4A1-S Red", img: "img/M4A1-SRED.png", price: 850, rarity: "milspec", quality: "FT" },
    { name: "Mac 10", img: "img/MAC10.png", price: 400, rarity: "restricted", quality: "MW" },
    { name: "MP5", img: "img/MP5.png", price: 350, rarity: "milspec", quality: "BS" },
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 250, rarity: "milspec", quality: "FT" },
    { name: "USP Tropic", img: "img/USP-TOPIC.png", price: 1500, rarity: "restricted", quality: "MW" }
];

let currentWinningSkin = null;
let skipFlag = false;

function startBudgetRoulette() {
    console.log("Ruletka funksiyasi chaqirildi!");
    const tg = window.Telegram.WebApp;
    
    // 1. Balansni tekshirish
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        
        if (bal < 500) { alert("Balans yetarli emas!"); return; }
        
        // 2. Balansni ayirish (Faqat bir marta)
        updateBalance(-500); 
        
        // 3. UI Tayyorlash
        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        skipFlag = false;
        
        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        // 4. Elementlarni yaratish
        for (let i = 0; i < 60; i++) {
            let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
            track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
            if (i === 50) currentWinningSkin = s;
        }

        // 5. Animatsiya
        setTimeout(() => {
            if(!skipFlag) {
                const ITEM_HEIGHT = 200;
                let offset = (50 * ITEM_HEIGHT) - 100;
                track.style.transition = "top 5s cubic-bezier(0.1, 0, 0.1, 1)";
                track.style.top = `-${offset}px`;
            }
        }, 100);

        // 6. Natija
        setTimeout(() => {
            if(!skipFlag) showWinner();
        }, 5200);
    });
}

function showWinner() {
    if(!currentWinningSkin) return;
    
    document.getElementById('roulette-viewport').style.display = 'none';
    document.getElementById('result-display').style.display = 'block';
    
    document.getElementById('won-skin-img').src = currentWinningSkin.img;
    document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
    document.getElementById('won-skin-quality').innerText = "Sifat: " + currentWinningSkin.quality;
    document.getElementById('won-skin-price-val').innerText = currentWinningSkin.price;
    
    // Inventarga saqlash
    addToInventory(currentWinningSkin);
}

function skipRoulette() {
    skipFlag = true;
    showWinner();
}

function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}
