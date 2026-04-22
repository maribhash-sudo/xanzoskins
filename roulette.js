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
    // Balansni tekshirish
    let balEl = document.getElementById('balance');
    let bal = parseInt(balEl.innerText);
    if (bal < 500) { alert("Balans yetarli emas!"); return; }
    
    // Ovozni boshlash (avvalgi playSound funksiyasi ishlashi uchun)
    if(typeof playSound === 'function') playSound('spin');

    const modal = document.getElementById('roulette-modal');
    const track = document.getElementById('roulette-track');
    
    modal.style.display = 'flex';
    document.getElementById('roulette-viewport').style.display = 'block';
    document.getElementById('result-display').style.display = 'none';
    
    track.innerHTML = "";
    track.style.transition = "none";
    track.style.top = "0px";

    // 50 ta element yaratish
    for (let i = 0; i < 50; i++) {
        let s = budgetSkins[Math.floor(Math.random() * budgetSkins.length)];
        track.innerHTML += `<div class="roulette-item"><img src="${s.img}"></div>`;
        if (i === 40) currentWinningSkin = s;
    }

    // Animatsiya
    setTimeout(() => {
        track.style.transition = "top 5s cubic-bezier(0.15, 0, 0.15, 1)";
        track.style.top = "-4400px"; 
    }, 100);

    // Natija
    setTimeout(() => {
        document.getElementById('roulette-viewport').style.display = 'none';
        document.getElementById('result-display').style.display = 'block';
        document.getElementById('won-skin-img').src = currentWinningSkin.img;
        document.getElementById('won-skin-name').innerText = currentWinningSkin.name;
        if(typeof playSound === 'function') playSound('win');
    }, 5200);
}

function sellWonSkin() {
    let balEl = document.getElementById('balance');
    balEl.innerText = parseInt(balEl.innerText) + currentWinningSkin.price;
    document.getElementById('roulette-modal').style.display = 'none';
}
