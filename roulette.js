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

// Inventarga qo'shish uchun yordamchi funksiya
function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        inv.push(item);
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
    });
}

function startRoulette(caseId) {
    const tg = window.Telegram.WebApp;
    
    // 1. Keys ma'lumotlarini bazadan topamiz
    const caseData = casesConfig.find(c => c.id === caseId);
    const skins = casesDatabase[caseId];

    if (!caseData || !skins || skins.length === 0) {
        alert("Xatolik: Bu keys bazasi topilmadi!");
        return;
    }

    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        
        // 2. Balansni tekshirish
        if (bal < caseData.price) { 
            alert("Balans yetarli emas!"); 
            return; 
        }
        
        // Balansni ayirish
        updateBalance(-caseData.price); 
        
        // 3. Ovoz effekti (agar mavjud bo'lsa)
        if(typeof playSound === 'function') playSound('spin');

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        if (!modal || !track || !viewport || !resultDisplay) {
            console.error("Modal elementlari topilmadi!");
            return;
        }

        // Animatsiya boshlanishi
        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        
        track.innerHTML = "";
        track.style.transition = "none";
        track.style.top = "0px";

        // 4. Tasodifiy skinlarni tanlash
        for (let i = 0; i < 50; i++) {
            let s = skins[Math.floor(Math.random() * skins.length)];
            track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
            if (i === 40) currentWinningSkin = s; // 40-o'rindagi skin yutgan hisoblanadi
        }

        // 5. Animatsiya vaqti
        setTimeout(() => {
            track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
            track.style.top = `-${40 * 160 - 80}px`; 
        }, 50);

        // 6. Natija chiqishi
        setTimeout(() => {
            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            
            // Yutilgan skinni ko'rsatish
            document.getElementById('won-skin-img').src = currentWinningSkin.img;
            document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
            document.getElementById('won-skin-price').innerHTML = 
                `<img src="img/nav_diamond.png" style="width:16px; vertical-align:middle;"> ${currentWinningSkin.price} COIN`;
            
            // Inventarga saqlash
            addToInventory(currentWinningSkin);
            
            if(typeof playSound === 'function') playSound('win');
        }, 5700); 
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
