function openBudgetCase() {
    let balanceEl = document.getElementById('balance');
    let balance = parseInt(balanceEl.innerText);

    if (balance < 500) {
        alert("Mablag' yetarli emas!");
        return;
    }

    // Balansni ayirish
    balanceEl.innerText = balance - 500;
    
    // Ruletka ovozi
    playSound('spin');

    // Oddiy vizual effekt (ekranni silkitish)
    const grid = document.getElementById('cases-grid');
    grid.style.transition = "0.1s";
    let shakes = 0;
    let interval = setInterval(() => {
        grid.style.transform = shakes % 2 === 0 ? "translateX(5px)" : "translateX(-5px)";
        shakes++;
        if (shakes > 20) {
            clearInterval(interval);
            grid.style.transform = "translateX(0)";
            
            // Yutuq chiqishi
            playSound('win');
            alert("Budget keysidan 650 COIN yutib oldingiz!"); // Test uchun yutuq
            balanceEl.innerText = parseInt(balanceEl.innerText) + 650;
        }
    }, 100);
}
