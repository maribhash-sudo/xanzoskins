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

function startBudgetRoulette() {
    let balEl = document.getElementById('balance');
    if (!balEl) return;

    let bal = parseInt(balEl.innerText);
    if (bal < 500) { alert("Balans yetarli emas!"); return; }
    
    // Balansdan 500 ayiramiz
    balEl.innerText = bal - 500;
    if(typeof updateUIBalance === 'function') updateUIBalance();
    
    if(typeof playSound === 'function') playSound('spin');

    const modal = document.getElementById('roulette-modal');
    const track = document.getElementById('roulette-track');
    const viewport = document.getElementById('roulette-viewport');
    const resultDisplay = document.getElementById('result-display');
    
    if (!modal || !track || !viewport || !resultDisplay) return;

    modal.style.display = 'flex';
    viewport.style.display = 'block';
    resultDisplay.style.display = 'none';
    
    track.innerHTML = "";
    track.style.transition = "none";
    track.style.top = "0px";

    // Roulette elementlarini yaratish
    for (let i = 0; i < 50; i++) {
        let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
        track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
        if (i === 40) currentWinningSkin = s;
    }

    // Aylanish effekti
    setTimeout(() => {
        track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
        track.style.top = `-${40 * 160 - 80}px`; 
    }, 100);

    // Natijani ko'rsatish
    setTimeout(() => {
        viewport.style.display = 'none';
        resultDisplay.style.display = 'block';
        
        document.getElementById('won-skin-img').src = currentWinningSkin.img;
        document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
        document.getElementById('won-skin-price').innerHTML = 
            `<img src="img/nav_diamond.png" style="width:16px; vertical-align:middle;"> ${currentWinningSkin.price} COIN`;
        
        // Inventarga qo'shish
        let inv = JSON.parse(localStorage.getItem('inventory') || '[]');
        inv.push(currentWinningSkin);
        localStorage.setItem('inventory', JSON.stringify(inv));
        
        if(typeof playSound === 'function') playSound('win');
    }, 5200);
}

function sellWonSkin() {
    if (!currentWinningSkin) return;
    
    let balEl = document.getElementById('balance');
    balEl.innerText = parseInt(balEl.innerText) + currentWinningSkin.price;
    
    if(typeof updateUIBalance === 'function') updateUIBalance();

    // Inventardan o'chirish
    let inv = JSON.parse(localStorage.getItem('inventory') || '[]');
    inv.pop(); // Oxirgi qo'shilgan yutuqni o'chiradi
    localStorage.setItem('inventory', JSON.stringify(inv));
    
    document.getElementById('roulette-modal').style.display = 'none';
}

function withdrawWonSkin() {
    alert("Steam profilingizga yuborildi!");
    document.getElementById('roulette-modal').style.display = 'none';
}
