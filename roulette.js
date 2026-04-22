// roulette.js

// 1. Skinlar bazasi (Sening fayllaringdagi nomlar bilan)
const budgetSkins = [
    { name: "ak-47", img: "img/ak-47.png", price: 500 },
    { name: "deagle white", img: "img/deagle white.png", price: 700 },
    { name: "five seven", img: "img/five seven.png", price: 300 },
    { name: "glock white", img: "img/glock white.png", price: 200 },
    { name: "m4a1-s paint-", img: "img/m4a1-s paint-.png", price: 900 },
    { name: "m4a1-s", img: "img/m4a1-s.png", price: 850 },
    { name: "mac 10 japon", img: "img/mac 10 japon.png", price: 400 },
    { name: "mp5 army", img: "img/mp5 army.png", price: 350 },
    { name: "usb camo", img: "img/usb camo.png", price: 250 },
    { name: "usp tropic", img: "img/usp tropic.png", price: 1500 }
];

let currentWinningSkin = null;

// 2. Ruletkani ishga tushirish
function startBudgetRoulette() {
    const modal = document.getElementById('roulette-modal');
    const track = document.getElementById('roulette-track');
    const resultDisplay = document.getElementById('result-display');
    const viewport = document.getElementById('roulette-viewport');

    modal.style.display = 'flex';
    resultDisplay.style.display = 'none';
    viewport.style.display = 'block';
    track.innerHTML = "";
    track.style.transition = "none";
    track.style.top = "0px";

    if(typeof playSound === 'function') playSound('spin');

    let numItems = 50; 
    let itemHeight = 110; 

    for (let i = 0; i < numItems; i++) {
        let randomSkin = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
        track.innerHTML += `
            <div class="roulette-item">
                <img src="${randomSkin.img}" alt="${randomSkin.name}">
            </div>`;
        if (i === 40) currentWinningSkin = randomSkin;
    }

    let stopPosition = 40 * itemHeight - (350 / 2) + (itemHeight / 2);

    setTimeout(() => {
        track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
        track.style.top = `-${stopPosition}px`;
    }, 100);

    setTimeout(() => { showResult(); }, 5100);
}

// 3. Natijani ko'rsatish
function showResult() {
    document.getElementById('roulette-viewport').style.display = 'none';
    document.getElementById('result-display').style.display = 'block';
    
    document.getElementById('won-skin-img').src = currentWinningSkin.img;
    document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
    document.getElementById('won-skin-price').innerText = currentWinningSkin.price + " COIN";
    
    if(typeof playSound === 'function') playSound('win');
}

// 4. Tugmalar
function withdrawWonSkin() {
    alert(currentWinningSkin.name + " Steamga yuborish so'rovi qabul qilindi!");
    closeRoulette();
}

function sellWonSkin() {
    let balanceEl = document.getElementById('balance');
    if(balanceEl) {
        let currentBal = parseInt(balanceEl.innerText);
        balanceEl.innerText = currentBal + currentWinningSkin.price;
    }
    alert(currentWinningSkin.name + " sotildi! +" + currentWinningSkin.price + " COIN qo'shildi.");
    closeRoulette();
}

function closeRoulette() {
    document.getElementById('roulette-modal').style.display = 'none';
}
