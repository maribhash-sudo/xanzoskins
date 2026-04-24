// 1. DATA (Skinlar ma'lumotlari)
const budgetSkins = [
    { name: "AK-47", img: "img/AK47.png", price: 5000, rarity: "cover", quality: "FN" },
    { name: "Deagle White", img: "img/DEAGLEWHITE.png", price: 3500, rarity: "classified", quality: "MW" },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAINT.png", price: 4200, rarity: "classified", quality: "FN" },
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 1500, rarity: "restricted", quality: "FT" },
    { name: "Mac 10", img: "img/MAC10.png", price: 1200, rarity: "restricted", quality: "MW" },
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 800, rarity: "milspec", quality: "FT" },
    { name: "MP5", img: "img/MP5.png", price: 950, rarity: "milspec", quality: "WW" },
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 600, rarity: "milspec", quality: "BS" }
];

let currentWinningSkin = null;
let isSpinning = false;

// 2. RULETKA FUNKSIYASI
function startBudgetRoulette() {
    if (isSpinning) return;
    
    const tg = window.Telegram.WebApp;
    
    // CloudStorage tekshiruvi (xatolik bermasligi uchun)
    const handleSpin = (val) => {
        let bal = val ? parseInt(val) : 100000;
        if (bal < 500) { 
            alert("Balans yetarli emas!"); 
            return; 
        }
        
        if (typeof updateBalance === 'function') updateBalance(-500);
        
        isSpinning = true;

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const result = document.getElementById('result-display');

        // UI-ni tozalash va ko'rsatish
        modal.classList.add('active');
        viewport.style.display = 'block';
        result.style.display = 'none';

        track.className = "roulette-track"; 
        track.style.transition = "none";
        track.style.top = "0px";
        track.innerHTML = "";

        let winnerIndex = 40; 
        currentWinningSkin = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];

        for(let i=0; i<55; i++) {
            let s = (i === winnerIndex) ? currentWinningSkin : budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
            track.innerHTML += `
                <div class="roulette-item rarity-${s.rarity}">
                    <div class="glow-circle"></div>
                    <img src="${s.img}" onerror="this.src='img/default.png'">
                </div>`;
        }

        setTimeout(() => {
            track.classList.add("animate-track");
            const ITEM_HEIGHT = 350; 
            const VIEWPORT_HEIGHT = 350;
            let offset = (winnerIndex * ITEM_HEIGHT) - (VIEWPORT_HEIGHT / 2) + (ITEM_HEIGHT / 2);
            track.style.top = `-${offset}px`; 
        }, 100);

        setTimeout(() => {
            showWinnerCard(currentWinningSkin);
            isSpinning = false;
        }, 6200);
    };

    // Telegram CloudStorage yoki LocalStorage orqali balansni olish
    if (tg.CloudStorage && typeof tg.CloudStorage.getItem === 'function') {
        tg.CloudStorage.getItem('userBalance', (err, val) => handleSpin(val));
    } else {
        let localBal = localStorage.getItem('userBalance');
        handleSpin(localBal);
    }
}

function showWinnerCard(winningSkin) {
    const viewport = document.getElementById('roulette-viewport');
    const resultDisplay = document.getElementById('result-display');
    
    viewport.style.display = 'none';
    resultDisplay.className = `result-display rarity-${winningSkin.rarity}`;
    
    document.getElementById('won-skin-img').src = winningSkin.img;
    document.getElementById('won-skin-name').innerText = winningSkin.name;
    
    // Sifatni chiqarish
    const qualityEl = document.getElementById('won-skin-quality');
    if(qualityEl) qualityEl.innerText = `Sifat: ${winningSkin.quality}`;
    
    document.getElementById('won-skin-price').innerHTML = `
        <img src="img/nav_diamond.png" class="coin-icon-small"> ${winningSkin.price} COIN
    `;
    
    resultDisplay.style.display = 'flex';
    
    if(typeof addToInventory === 'function') addToInventory(winningSkin);
    if(typeof playSound === 'function') playSound('win');
}

function closeRoulette() {
    document.getElementById('roulette-modal').classList.remove('active');
    document.getElementById('result-display').style.display = 'none';
    document.getElementById('roulette-viewport').style.display = 'block';
}

function sellWonSkin() {
    if (!currentWinningSkin) return;
    if (typeof updateBalance === 'function') updateBalance(currentWinningSkin.price);
    closeRoulette();
}
