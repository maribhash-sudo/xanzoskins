// CS2 stilidagi rarity va quality qo'shildi
const budgetSkins = [
    // Cover (qizil)
    { name: "AK-47", img: "img/AK47.png", price: 5000, rarity: "cover", quality: "FN" },
    // Classified (pushti)
    { name: "Deagle White", img: "img/DEAGLEWHITE.png", price: 3500, rarity: "classified", quality: "MW" },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAINT.png", price: 4200, rarity: "classified", quality: "FN" },
    // Restricted (siyohrang)
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 1500, rarity: "restricted", quality: "FT" },
    { name: "Mac 10", img: "img/MAC10.png", price: 1200, rarity: "restricted", quality: "MW" },
    // Mil-spec (ko'k)
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 800, rarity: "milspec", quality: "FT" },
    { name: "MP5", img: "img/MP5.png", price: 950, rarity: "milspec", quality: "WW" },
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 600, rarity: "milspec", quality: "BS" },
    { name: "M4A1-S Red", img: "img/M4A1-SRED.png", price: 750, rarity: "milspec", quality: "FT" },
    { name: "USP Tropic", img: "img/USP-TOPIC.png", price: 1100, rarity: "milspec", quality: "MW" }
];

let currentWinningSkin = null;

// Inventarga qo'shish (CloudStorage) - O'zgarmadi
function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv), () => {
            // Inventar UI'ni yangilash
            if(document.getElementById('inventory-list').parentElement.classList.contains('active')) {
                renderInventoryCloud();
            }
        });
    });
}

function startBudgetRoulette() {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 100000; // Demo uchun ko'proq balans
        
        if (bal < 5000) { alert("Balans yetarli emas!"); return; }
        
        // updateBalance funksiyasi script.js da bo'lishi kerak
        updateBalance(-5000); 
        
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        if (!modal || !track || !viewport || !resultDisplay) return;

        // "Case Shake" animatsiyasi (Keys rasmini titratish)
        const caseBlock = document.querySelector(`[onclick="startBudgetRoulette()"]`);
        if(caseBlock) caseBlock.classList.add('case-shake');

        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        // Ruletka elementlarini rarity rangi bilan generatsiya qilish
        for (let i = 0; i < 60; i++) {
            let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
            track.innerHTML += `
                <div class="roulette-item rarity-${s.rarity}">
                    <img src="${s.img}">
                </div>`;
            // 50-indexni g'olib qilamiz (5 daqiqadan ko'proq aylanish uchun)
            if (i === 50) currentWinningSkin = s;
        }

        // Aylanish matematikasi (Item height = 200px)
        setTimeout(() => {
            if(caseBlock) caseBlock.classList.remove('case-shake');
            
            const WINNER_INDEX = 50;
            const ITEM_HEIGHT = 200; 
            const VIEWPORT_HEIGHT = 200;
            let offset = (WINNER_INDEX * ITEM_HEIGHT) - (VIEWPORT_HEIGHT / 2) + (ITEM_HEIGHT / 2);
            
            track.style.transition = "top 6s cubic-bezier(0.1, 0, 0.1, 1)"; // Sekinroq to'xtash
            track.style.top = `-${offset}px`; 
        }, 300);

        // Natijani ko'rsatish
        setTimeout(() => {
            showWinnerCard(currentWinningSkin);
        }, 6500); 
    });
}

// G'olib kartochkasini videodagidek ko'rsatish funksiyasi
function showWinnerCard(winningSkin) {
    const viewport = document.getElementById('roulette-viewport');
    const resultDisplay = document.getElementById('result-display');
    
    viewport.style.display = 'none';
    
    // Rarity bo'yicha fon nurini o'zgartirish
    resultDisplay.className = `result-display rarity-${winningSkin.rarity}`;
    
    document.getElementById('won-skin-img').src = winningSkin.img;
    document.getElementById('won-skin-name').innerText = winningSkin.name;
    document.getElementById('won-skin-quality').innerText = `Sifat: ${winningSkin.quality}`;
    
    // Narx va Diamond rasm
    document.getElementById('won-skin-price').innerHTML = `
        <img src="img/nav_diamond.png" class="coin-icon"> ${winningSkin.price} COIN
    `;
    
    // Sotish tugmasini narx bilan yangilash
    document.getElementById('sell-btn-text').innerText = `Sotish [ ${winningSkin.price} ]`;
    
    resultDisplay.style.display = 'block';
    addToInventory(winningSkin);
    
    if(typeof playSound === 'function') playSound('win');
}

// Sotish funksiyasini yangilash
function sellWonSkin() {
    if (!currentWinningSkin) return;
    updateBalance(currentWinningSkin.price);
    
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.pop(); // Oxirgisini o'chirish
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
    
    document.getElementById('roulette-modal').style.display = 'none';
}

function withdrawWonSkin() {
    alert("Steam profilingizga yuborildi!");
    document.getElementById('roulette-modal').style.display = 'none';
}

// INVENTAR (MARKET) UCHUN RENDER FUNKSIYASI (RASMDEGIDEK)
function renderInventoryCloud() {
    const grid = document.getElementById('inventory-list'); // HTMLdagi inventar list ID'si
    grid.innerHTML = '<div class="loading-text">Yuklanmoqda...</div>';
    
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        grid.innerHTML = "";
        let inv = val ? JSON.parse(val) : [];
        
        if(inv.length === 0) {
            grid.innerHTML = '<div class="empty-text">Inventar bo\'sh</div>';
            return;
        }
        
        // Rasmdegidek kartochkalar generatsiyasi
        inv.forEach((item, index) => {
            grid.innerHTML += `
                <div class="inventory-card rarity-${item.rarity}" onclick="withdrawItem(${index})">
                    <div class="card-header">
                        <span class="quality-badge">${item.quality}</span>
                        <span class="rarity-icon">♥</span>
                    </div>
                    <img src="${item.img}" class="skin-thumb">
                    <div class="card-footer">
                        <p class="skin-name">${item.name}</p>
                        <p class="skin-price">
                            <img src="img/nav_diamond.png" class="coin-icon">
                            ${item.price}
                        </p>
                    </div>
                </div>
            `;
        });
    });
}
