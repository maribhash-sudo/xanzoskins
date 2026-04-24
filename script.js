// --- 1. OVOZLAR (AUDIO) ---
const sounds = {
    spin: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7306282998.mp3'),
    win: new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3')
};

function playSound(type) {
    if (sounds[type]) {
        sounds[type].currentTime = 0;
        sounds[type].play().catch(e => console.log("Audio bloklandi: " + e));
    }
}

// --- 2. BALANS VA STORAGE (BULUT VA LOCAL) ---
function getBalance(callback) {
    const tg = window.Telegram.WebApp;
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.getItem('userBalance', (err, val) => {
            callback(val ? parseInt(val) : 10000);
        });
    } else {
        callback(parseInt(localStorage.getItem('userBalance') || 10000));
    }
}

function updateBalance(amount) {
    getBalance((currentBal) => {
        let newBal = currentBal + amount;
        const tg = window.Telegram.WebApp;

        // Saqlash
        if (tg && tg.CloudStorage) {
            tg.CloudStorage.setItem('userBalance', newBal.toString());
        }
        localStorage.setItem('userBalance', newBal.toString());

        // UI ni yangilash
        updateUIBalance(newBal);
    });
}

// --- 3. INVENTAR BILAN ISHLASH ---
function addToInventory(skin) {
    const tg = window.Telegram.WebApp;
    const skinData = { ...skin, date: Date.now() };

    if (tg && tg.CloudStorage) {
        tg.CloudStorage.getItem('inventory', (err, val) => {
            let inv = val ? JSON.parse(val) : [];
            inv.push(skinData);
            tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
        });
    } else {
        let inv = JSON.parse(localStorage.getItem('userInventory') || '[]');
        inv.push(skinData);
        localStorage.setItem('userInventory', JSON.stringify(inv));
    }
}

// --- 4. UI VA NAVIGATSIYA ---
function updateUIBalance(val) {
    // Barcha balans ko'rsatkichlarini bittada yangilaydi
    const ids = ['balance', 'balance-large', 'display-balance', 'user-balance'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerText = val;
    });
}

function showPage(pageId, btnElement) {
    // Sahifalarni almashtirish
    document.querySelectorAll('.view, .page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');

    // Tugma holatini yangilash
    document.querySelectorAll('.nav-btn, .nav-item').forEach(btn => btn.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    
    // Agar inventar ochilsa, uni qayta chizish
    if (pageId === 'inventory' && typeof renderInventory === 'function') {
        renderInventory();
    }
}

// --- 5. INITIALIZATION (BOTNI ISHGA TUSHIRISH) ---
document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    if (tg) {
        tg.expand();
        tg.ready();
    }

    // Boshlang'ich balansni yuklash
    getBalance((val) => {
        updateUIBalance(val);
    });

    // Agar renderCases funksiyasi bo'lsa, uni ishlatish
    if (typeof renderCases === 'function') renderCases();
});
