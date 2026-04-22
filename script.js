function showPage(pageId, element) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(n => n.classList.remove('active'));
    element.classList.add('active');
}

// 2. 10 ta Keyslar ro'yxati
const cases = [
    { name: "Budget", price: "500", img: "case1.png" },
    { name: "Starter", price: "1500", img: "case2.webp" },
    { name: "Basic", price: "2500", img: "case3.webp" },
    { name: "Silver", price: "3500", img: "case4.webp" },
    { name: "Gold", price: "4500", img: "case5.png" },
    { name: "Elite", price: "5500", img: "case6.webp" },
    { name: "Master", price: "6500", img: "case7.webp" },
    { name: "Pro", price: "7500", img: "case8.png" },
    { name: "Legend", price: "8500", img: "case9.png" },
    { name: "God", price: "10000", img: "case10.png" }
];

// 3. Sahifa yuklanganda barcha funksiyalarni ishga tushirish
document.addEventListener("DOMContentLoaded", () => {
    
    // A) Keyslarni yuklash
    const grid = document.getElementById('cases-grid');
    if (grid) {
        grid.innerHTML = ""; 
        cases.forEach(c => {
            grid.innerHTML += `
                <div class="case-card">
                    <img src="img/${c.img}">
                    <p>${c.name}</p>
                    <button onclick="alert('Keys ochildi!')">${c.price} Coin</button>
                </div>`;
        });
    }

    // B) Telegram User ma'lumotlarini olish (Ism va Avatar)
    const tg = window.Telegram.WebApp;
    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        const nameEl = document.getElementById('user-name');
        const avatarEl = document.getElementById('user-avatar');
        
        if (nameEl) nameEl.innerText = user.first_name;
        if (avatarEl && user.photo_url) {
            avatarEl.innerHTML = `<img src="${user.photo_url}" style="width:100%; height:100%; border-radius:50%">`;
        }
    }

    // C) Saqlangan sozlamalarni yuklash
    const savedLang = localStorage.getItem('lang');
    if (savedLang) document.getElementById('lang-val').innerText = savedLang;
});

// 4. Profil funksiyalari
function changeLang() {
    let el = document.getElementById('lang-val');
    let newLang = el.innerText === "RU" ? "UZ" : "RU";
    el.innerText = newLang;
    localStorage.setItem('lang', newLang);
}

function promptTrade() {
    let link = prompt("Steam Trade Linkni kiriting:", localStorage.getItem('tradeLink') || "");
    if(link) {
        localStorage.setItem('tradeLink', link);
        alert("Trade Link saqlandi!");
    }
}
