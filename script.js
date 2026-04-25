const sounds = {
    spin: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7306282998.mp3'),
    win: new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3')
};
function playSound(type) {
    sounds[type].currentTime = 0;
    sounds[type].play().catch(e => console.log("Audio bloklandi."));
}

// Balansni olish
function getBalance(callback) {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
        window.Telegram.WebApp.CloudStorage.getItem('userBalance', (err, val) => {
            callback(val ? parseInt(val) : 10000);
        });
    } else {
        callback(parseInt(localStorage.getItem('userBalance') || 10000));
    }
}

// Balansni yangilash
function updateBalance(amount) {
    getBalance((currentBal) => {
        let newBal = currentBal + amount;
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.CloudStorage) {
            window.Telegram.WebApp.CloudStorage.setItem('userBalance', newBal.toString());
        } else {
            localStorage.setItem('userBalance', newBal.toString());
        }
        let balEl = document.getElementById('balance');
        if(balEl) balEl.innerText = newBal;
        updateUIBalance();
    });
}

// Inventarga qo'shish
function addToInventory(skin) {
    const tg = window.Telegram.WebApp;
    if (tg && tg.CloudStorage) {
        tg.CloudStorage.getItem('inventory', (err, val) => {
            let inv = val ? JSON.parse(val) : [];
            inv.push({...skin, date: Date.now()});
            tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
        });
    } else {
        let inv = JSON.parse(localStorage.getItem('userInventory') || '[]');
        inv.push({...skin, date: Date.now()});
        localStorage.setItem('userInventory', JSON.stringify(inv));
    }
}

// Qolgan barcha funksiyalar (showPage, renderCases, renderTasks, updateUIBalance, setLanguage va h.k.larni bu yerga yozib qo'y)
// Sening yuborgan kodlaringni shu yerga qo'shishing mumkin.