console.log("ROULETTE.JS YUKLANDI!"); 
// Inventarga qo'shish uchun yordamchi funksiya...
function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}

function startRoulette(caseId) {
    currentCaseId = caseId;
    const selectedCase = cases.find(c => c.id === caseId);
    if (!selectedCase) {
        console.error("Keys topilmadi!");
        return;
    }

    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        
        // 2. Dinamik narx bilan tekshiramiz
        if (bal < selectedCase.price) { 
            alert("Balans yetarli emas!"); 
            return; 
        }
        
        // 3. Dinamik narxni ayiramiz
        updateBalance(-selectedCase.price); 
        
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        if (!modal || !track || !viewport || !resultDisplay) return;

        const caseImg = document.querySelector('.case-img');
        if(caseImg) caseImg.classList.add('animate-case');

        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        // 4. Endi "budgetSkins" o'rniga "skinsDatabase" dan foydalanamiz
        for (let i = 0; i < 50; i++) {
            let s = skinsDatabase[Math.floor(Math.random() * skinsDatabase.length)];
            track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
            if (i === 40) currentWinningSkin = s;
        }

        setTimeout(() => {
            if(caseImg) caseImg.classList.remove('animate-case');
            track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
            track.style.top = `-${40 * 160 - 80}px`; 
        }, 500);

        setTimeout(() => {
            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            document.getElementById('won-skin-img').src = currentWinningSkin.img;
            document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
            
            const priceEl = document.getElementById('won-skin-price');
            if (priceEl) {
                priceEl.innerHTML = `<img src="img/nav_diamond.png" style="width:16px; vertical-align:middle;"> ${currentWinningSkin.price} COIN`;
            }
            
            addToInventory(currentWinningSkin);
            if(typeof playSound === 'function') playSound('win');
        }, 5700); 
    }); 
} // <--- MANA SHU QAVS FUNKSIYANI YOPADI (Buni unutma!)

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
