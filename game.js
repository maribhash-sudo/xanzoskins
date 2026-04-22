// game.js
function openBudgetCase() {
    // 1. Ovozni ishga tushirish
    playSound('spin');

    // 2. Animatsiya (CSS orqali elementni silkitamiz)
    const grid = document.getElementById('cases-grid');
    grid.style.transform = "scale(0.95)";
    
    // 3. 3 soniyadan keyin natijani ko'rsatish
    setTimeout(() => {
        grid.style.transform = "scale(1)";
        playSound('win');
        alert("Budget keys ochildi! Sizga nimadir tushdi.");
    }, 3000);
}
