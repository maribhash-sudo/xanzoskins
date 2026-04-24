// 1. DATA (Skinlar ma'lumotlariga rarity va quality qo'shildi)
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
    isSpinning = true;

    console.log("Budget keysi ochilmoqda (Katta Glow)...");
    const tg = window.Telegram.WebApp;
    
    // Balansni tekshirish
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 100000;
        if (bal < 5000) { alert("Balans yetarli emas!"); isSpinning = false; return; }
        
        // Pulni yechish funksiyasi (script.js dagi)
        if (typeof updateBalance === 'function') updateBalance(-5000);

        // Ovoz effekti
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        // UI reset
        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.className = "roulette-track"; // Animatsiya klassini o'chirib turish
        track.style.transition = "none";
        track.style.top = "0px";
        track.innerHTML = "";

        // 3. Lenta tayyorlash (Skinlar rarity va glow bilan)
        let winnerIndex = 40; // 40-o'rin g'olib bo'ladi

        for(let i=0; i<50; i++) {
            let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
            
            // G'olib skinni belgilash
            if (i === winnerIndex) currentWinningSkin = s;

            // Har bir element HTML'i (Glow nur doirasi bilan)
            track.innerHTML += `
                <div class="roulette-item rarity-${s.rarity}">
                    <div class="glow-circle"></div>
                    <img src="${s.img}" onerror="this.src='img/default.png'">
                </div>`;
        }

        // 4. Animatsiya - Matematik aniqlik bilan
        setTimeout(() => {
            track.classList.add("animate-track"); // Animatsiya klassini qo'shish
            
            // ITEM_HEIGHT CSS'dagi bilan bir xil bo'lishi shart
            const ITEM_HEIGHT = 350; 
            const VIEWPORT_HEIGHT = 350;
            
            // Formula: g'olib item'ni qizil chiziqning qoq o'rtasiga qo'yadi
            let offset = (winnerIndex * ITEM_HEIGHT) - (VIEWPORT_HEIGHT / 2) + (ITEM_HEIGHT / 2);
            track.style.top = `-${offset}px`; 
        }, 100);

        // 5. Natija ko'rsatish
        setTimeout(() => {
            showWinnerCard(currentWinningSkin);
            isSpinning = false;
        }, 6200); 
    });
}

// Yutuq oynasini ko'rsatish funksiyasi
function showWinnerCard(winningSkin) {
    const viewport = document.getElementById('roulette-viewport');
    const resultDisplay = document.getElementById('result-display');
    
    viewport.style.display = 'none';
    
    // Rarity nur effektini o'rnatish
    resultDisplay.className = `result-display rarity-${winningSkin.rarity}`;
    
    document.getElementById('won-skin-img').src = winningSkin.img;
    document.getElementById('won-skin-name').innerText = winningSkin.name;
    document.getElementById('won-skin-quality').innerText = `Sifat: ${winningSkin.quality}`;
    
    // Narx va Diamond
    document.getElementById('won-skin-price').innerHTML = `
        <img src="img/nav_diamond.png" class="coin-icon-small"> ${winningSkin.price} COIN
    `;
    
    resultDisplay.style.display = 'flex';
    
    // Inventarga saqlash
    addToInventory(winningSkin);
    
    if(typeof playSound === 'function') playSound('win');
}
