// 1. DATA (Sening img papkangdagi fayllar bilan to'liq moslashtirildi)
const budgetSkins = [
    { name: "AK-47", img: "img/AK47.png", price: 5000, rarity: "cover", quality: "FN" },
    { name: "Deagle White", img: "img/DEAGLEWHITE.png", price: 3500, rarity: "classified", quality: "MW" },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAINT.png", price: 4200, rarity: "classified", quality: "FN" },
    { name: "M4A1-S Red", img: "img/M4A1-SRED.png", price: 4800, rarity: "classified", quality: "FN" },
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 1500, rarity: "restricted", quality: "FT" },
    { name: "Mac 10", img: "img/MAC10.png", price: 1200, rarity: "restricted", quality: "MW" },
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 800, rarity: "milspec", quality: "FT" },
    { name: "MP5", img: "img/MP5.png", price: 950, rarity: "milspec", quality: "WW" },
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 600, rarity: "milspec", quality: "BS" },
    { name: "USP Topic", img: "img/USP-TOPIC.png", price: 700, rarity: "milspec", quality: "FT" }
];

let currentWinningSkin = null;
let isSpinning = false;

// --- YORDAMCHI FUNKSIYA: Xavfsiz balans olish ---
function getSafeBalance(callback) {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
        window.Telegram.WebApp.CloudStorage.getItem('userBalance', (err, val) => {
            callback(val ? parseInt(val) : 10000);
        });
    } else {
        let val = localStorage.getItem('userBalance');
        callback(val ? parseInt(val) : 10000);
    }
}

// --- YORDAMCHI FUNKSIYA: Xavfsiz balans saqlash ---
function saveSafeBalance(newBal) {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
        window.Telegram.WebApp.CloudStorage.setItem('userBalance', newBal.toString());
    } else {
        localStorage.setItem('userBalance', newBal.toString());
    }
}

// 2. RULETKA FUNKSIYASI
function startBudgetRoulette() {
    if (isSpinning) return;
    
    getSafeBalance((bal) => {
        if (bal < 500) { 
            alert("Balans yetarli emas!"); 
            return; 
        }
        
        // Pulni yechish
        updateBalance(-500);
        
        isSpinning = true;

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const result = document.getElementById('result-display');

        // Modalni ochish
        modal.classList.add('active');
        viewport.style.display = 'block';
        result.style.display = 'none';

        track.className = "roulette-track"; 
        track.style.transition = "none";
        track.style.top = "0px";
        track.innerHTML = "";

        let winnerIndex = 40; 
        currentWinningSkin = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];

        // Skinlarni generatsiya qilish
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
            track.offsetWidth; 
            track.style.top = `-${offset}px`; 
        }, 100);

        setTimeout(() => {
            showWinnerCard(currentWinningSkin);
            isSpinning = false;
        }, 6200);
    });
}

function showWinnerCard(winningSkin) {
    const viewport = document.getElementById('roulette-viewport');
    const resultDisplay = document.getElementById('result-display');
    
    viewport.style.display = 'none';
    resultDisplay.className = `result-display rarity-${winningSkin.rarity}`;
    
    document.getElementById('won-skin-img').src = winningSkin.img;
    document.getElementById('won-skin-name').innerText = winningSkin.name;
    
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
    updateBalance(currentWinningSkin.price);
    closeRoulette();
}

// "Steamga yuborish" uchun bo'sh funksiya (xato chiqmasligi uchun)
function withdrawWonSkin() {
    alert("Buyurtma qabul qilindi!");
    closeRoulette();
}

function updateBalance(amount) {
    getSafeBalance((currentBal) => {
        let newBal = currentBal + amount;
        saveSafeBalance(newBal);
        let balEl = document.getElementById('balance');
        if(balEl) balEl.innerText = newBal;
        if(typeof updateUIBalance === 'function') updateUIBalance();
    });
}

function addToInventory(skin) {
    try {
        // 1. Eski inventarni olish
        let rawData = localStorage.getItem('userInventory');
        let inventory = [];

        // 2. Ma'lumotni tekshirish va massivga aylantirish
        if (rawData) {
            try {
                inventory = JSON.parse(rawData);
                if (!Array.isArray(inventory)) inventory = [];
            } catch (e) {
                console.warn("Inventar ma'lumoti buzilgan, yangisi yaratildi.");
                inventory = [];
            }
        }

        // 3. Yangi skinni qo'shish
        inventory.push({
            name: skin.name,
            img: skin.img,
            price: skin.price,
            rarity: skin.rarity,
            quality: skin.quality,
            date: new Date().getTime()
        });

        // 4. Saqlash
        localStorage.setItem('userInventory', JSON.stringify(inventory));
        console.log("Inventarga muvaffaqiyatli saqlandi!");

    } catch (e) {
        console.error("Inventarga qo'shishda xatolik:", e);
    }
}
