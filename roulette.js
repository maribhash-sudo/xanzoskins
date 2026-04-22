// roulette.js

// 1. Skinlar bazasi (Sening fayllaringdagi nomlar bilan)
const budgetSkins = [
    { name: "USP Camo", img: "img/USP-CAMO.png", price: 250 },
    { name: "AK-47", img: "img/AK47.png", price: 500 },
    { name: "Deagle White", img: "img/DEAGLE WHITE.png", price: 700 },
    { name: "Five Seven", img: "img/FIVESEVEN.png", price: 300 },
    { name: "Glock White", img: "img/GLOCKWHITE.png", price: 200 },
    { name: "M4A1-S Paint", img: "img/M4A1-SPAIN.png", price: 900 },
    { name: "M4A1-S Red", img: "img/M4A1-SRED.png", price: 850 },
    { name: "Mac 10", img: "img/MAC10.png", price: 400 },
    { name: "MP5", img: "img/MP5.png", price: 350 },
    { name: "USP Tropic", img: "img/USP-TOPIC.png", price: 1500 }
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
