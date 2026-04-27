const tacticalSkins = [
    { name: "AK-47 | Olive Polycam (Field-Tested)", img: "AK-47 _ Olive Polycam (Field-Tested).webp" },
    { name: "AK-47 | Olive Polycam (Well-Worn)", img: "AK-47 _ Olive Polycam (Well-Worn).webp" },
    { name: "AK-47 | Slate (Well-Worn)", img: "AK-47 _ Slate (Well-Worn).webp" },
    { name: "AK-47 | VariCamo Grey (Field-Tested)", img: "AK-47 _ VariCamo Grey (Field-Tested).webp" },
    { name: "AUG | Storm (Field-Tested)", img: "AUG _ Storm (Field-Tested).webp" },
    { name: "AWP | Capillary (Well-Worn)", img: "AWP _ Capillary (Well-Worn).webp" },
    { name: "Austin 2025 Challengers Sticker Capsule", img: "Austin 2025 Challengers Sticker Capsule.webp" },
    { name: "Charm | Baby's AK", img: "Charm _ Baby's AK.webp" },
    { name: "Charm | Backsplash", img: "Charm _ Backsplash.webp" },
    { name: "Charm | Hot Hands", img: "Charm _ Hot Hands.webp" },
    { name: "Charm | Pocket AWP", img: "Charm _ Pocket AWP.webp" },
    { name: "Charm | Stitch-Loaded", img: "Charm _ Stitch-Loaded.webp" },
    { name: "Desert Eagle | Blue Ply (Well-Worn)", img: "Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "Desert Eagle | Bronze Deco (Field-Tested)", img: "Desert Eagle _ Bronze Deco (Field-Tested).webp" },
    { name: "Desert Eagle | Serpent Strike (Field-Tested)", img: "Desert Eagle _ Serpent Strike (Field-Tested).webp" },
    { name: "Desert Eagle | Tilted (Field-Tested)", img: "Desert Eagle _ Tilted (Field-Tested).webp" },
    { name: "Dual Berettas | Hideout (Field-Tested)", img: "Dual Berettas _ Hideout (Field-Tested).webp" },
    { name: "Dual Berettas | Hydro Strike (Field-Tested)", img: "Dual Berettas _ Hydro Strike (Field-Tested).webp" },
    { name: "FAMAS | Cyanospatter (Field-Tested)", img: "FAMAS _ Cyanospatter (Field-Tested).webp" },
    { name: "FAMAS | Meow 36 (Well-Worn)", img: "FAMAS _ Meow 36 (Well-Worn).webp" },
    { name: "Five-SeveN | Flame Test (Field-Tested)", img: "Five-SeveN _ Flame Test (Field-Tested).webp" },
    { name: "Five-SeveN | Forest Night (Field-Tested)", img: "Five-SeveN _ Forest Night (Field-Tested).webp" },
    { name: "Five-SeveN | Scrawl (Well-Worn)", img: "Five-SeveN _ Scrawl (Well-Worn).webp" },
    { name: "Five-SeveN | Sky Blue (Field-Tested)", img: "Five-SeveN _ Sky Blue (Field-Tested).webp" },
    { name: "Galil AR | Acid Dart (Minimal Wear)", img: "Galil AR _ Acid Dart (Minimal Wear).webp" },
    { name: "Galil AR | Connexion (Battle-Scarred)", img: "Galil AR _ Connexion (Battle-Scarred).webp" },
    { name: "Galil AR | Control (Field-Tested)", img: "Galil AR _ Control (Field-Tested).webp" },
    { name: "Galil AR | Green Apple (Minimal Wear)", img: "Galil AR _ Green Apple (Minimal Wear).webp" },
    { name: "Galil AR | O-Ranger (Minimal Wear)", img: "Galil AR _ O-Ranger (Minimal Wear).webp" },
    { name: "Galil AR | Robin's Egg (Field-Tested)", img: "Galil AR _ Robin's Egg (Field-Tested).webp" },
    { name: "Galil AR | Rocket Pop (Field-Tested)", img: "Galil AR _ Rocket Pop (Field-Tested).webp" },
    { name: "Galil AR | Sage Spray (Field-Tested)", img: "Galil AR _ Sage Spray (Field-Tested).webp" },
    { name: "Glock-18 | Block-18 (Battle-Scarred)", img: "Glock-18 _ Block-18 (Battle-Scarred).webp" },
    { name: "Glock-18 | Moonrise (Well-Worn)", img: "Glock-18 _ Moonrise (Well-Worn).webp" },
    { name: "Glock-18 | Oxide Blaze (Well-Worn)", img: "Glock-18 _ Oxide Blaze (Well-Worn).webp" },
    { name: "Glock-18 | Shinobu (Well-Worn)", img: "Glock-18 _ Shinobu (Well-Worn).webp" },
    { name: "Glock-18 | Umbral Rabbit (Field-Tested)", img: "Glock-18 _ Umbral Rabbit (Field-Tested).webp" },
    { name: "Glock-18 | Winterized (Field-Tested)", img: "Glock-18 _ Winterized (Field-Tested).webp" },
    { name: "M249 | Gator Mesh (Field-Tested)", img: "M249 _ Gator Mesh (Field-Tested).webp" },
    { name: "M4A1-S | Boreal Forest (Field-Tested)", img: "M4A1-S _ Boreal Forest (Field-Tested).webp" },
    { name: "M4A1-S | Nitro (Field-Tested)", img: "M4A1-S _ Nitro (Field-Tested).webp" },
    { name: "M4A1-S | Wash me plz (Field-Tested)", img: "M4A1-S _ Wash me plz (Field-Tested).webp" },
    { name: "M4A4 | Choppa (Field-Tested)", img: "M4A4 _ Choppa (Field-Tested).webp" },
    { name: "M4A4 | Etch Lord (Battle-Scarred)", img: "M4A4 _ Etch Lord (Battle-Scarred).webp" },
    { name: "M4A4 | Magnesium (Well-Worn)", img: "M4A4 _ Magnesium (Well-Worn).webp" },
    { name: "M4A4 | Mainframe (Field-Tested)", img: "M4A4 _ Mainframe (Field-Tested).webp" },
    { name: "M4A4 | Naval Shred Camo (Well-Worn)", img: "M4A4 _ Naval Shred Camo (Well-Worn).webp" },
    { name: "M4A4 | Poly Mag (Battle-Scarred)", img: "M4A4 _ Poly Mag (Battle-Scarred).webp" },
    { name: "M4A4 | Poly Mag (Well-Worn)", img: "M4A4 _ Poly Mag (Well-Worn).webp" },
    { name: "M4A4 | Steel Work (Field-Tested)", img: "M4A4 _ Steel Work (Field-Tested).webp" },
    { name: "MAC-10 | Allure (Battle-Scarred)", img: "MAC-10 _ Allure (Battle-Scarred).webp" },
    { name: "MAC-10 | Candy Apple (Minimal Wear)", img: "MAC-10 _ Candy Apple (Minimal Wear).webp" },
    { name: "MAC-10 | Carnivore (Well-Worn)", img: "MAC-10 _ Carnivore (Well-Worn).webp" },
    { name: "MAC-10 | Light Box (Field-Tested)", img: "MAC-10 _ Light Box (Field-Tested).webp" },
    { name: "MAC-10 | Pipsqueak (Battle-Scarred)", img: "MAC-10 _ Pipsqueak (Battle-Scarred).webp" },
    { name: "MAG-7 | Wildwood (Field-Tested)", img: "MAG-7 _ Wildwood (Field-Tested).webp" },
    { name: "MP5-SD | Liquidation (Well-Worn)", img: "MP5-SD _ Liquidation (Well-Worn).webp" },
    { name: "MP5-SD | Necro Jr. (Well-Worn)", img: "MP5-SD _ Necro Jr. (Well-Worn).webp" },
    { name: "MP5-SD | Neon Squeezer (Field-Tested)", img: "MP5-SD _ Neon Squeezer (Field-Tested).webp" },
    { name: "MP9 | Featherweight (Well-Worn)", img: "MP9 _ Featherweight (Well-Worn).webp" },
    { name: "MP9 | Orange Peel (Minimal Wear)", img: "MP9 _ Orange Peel (Minimal Wear).webp" },
    { name: "Negev | Bulkhead (Battle-Scarred)", img: "Negev _ Bulkhead (Battle-Scarred).webp" },
    { name: "Negev | Ultralight (Field-Tested)", img: "Negev _ Ultralight (Field-Tested).webp" },
    { name: "Nova | Candy Apple (Minimal Wear)", img: "Nova _ Candy Apple (Minimal Wear).webp" },
    { name: "Nova | Wurst Hölle (Well-Worn)", img: "Nova _ Wurst Hölle (Well-Worn).webp" },
    { name: "P2000 | Acid Etched (Battle-Scarred)", img: "P2000 _ Acid Etched (Battle-Scarred).webp" },
    { name: "P250 | Sedimentary (Field-Tested)", img: "P250 _ Sedimentary (Field-Tested).webp" },
    { name: "P90 | Neoqueen (Battle-Scarred)", img: "P90 _ Neoqueen (Battle-Scarred).webp" },
    { name: "P90 | Vent Rush (Battle-Scarred)", img: "P90 _ Vent Rush (Battle-Scarred).webp" },
    { name: "PP-Bizon | Facility Sketch (Factory New)", img: "PP-Bizon _ Facility Sketch (Factory New).webp" },
    { name: "Paris 2023 Challengers Sticker Capsule", img: "Paris 2023 Challengers Sticker Capsule.webp" },
    { name: "R8 Revolver | Bone Mask (Field-Tested)", img: "R8 Revolver _ Bone Mask (Field-Tested).webp" },
    { name: "SCAR-20 | Poultrygeist (Field-Tested)", img: "SCAR-20 _ Poultrygeist (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (Field-Tested)", img: "SG 553 _ Basket Halftone (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (Minimal Wear)", img: "SG 553 _ Basket Halftone (Minimal Wear).webp" },
    { name: "SG 553 | Cyberforce (Field-Tested)", img: "SG 553 _ Cyberforce (Field-Tested).webp" },
    { name: "SG 553 | Dragon Tech (Well-Worn)", img: "SG 553 _ Dragon Tech (Well-Worn).webp" },
    { name: "SSG 08 | Mainframe 001 (Battle-Scarred)", img: "SSG 08 _ Mainframe 001 (Battle-Scarred).webp" },
    { name: "SSG 08 | Mainframe 001 (Well-Worn)", img: "SSG 08 _ Mainframe 001 (Well-Worn).webp" },
    { name: "Sawed-Off | Analog Input (Minimal Wear)", img: "Sawed-Off _ Analog Input (Minimal Wear).webp" },
    { name: "Sawed-Off | Origami (Field-Tested)", img: "Sawed-Off _ Origami (Field-Tested).webp" },
    { name: "Souvenir AUG | Spalted Wood (Field-Tested)", img: "Souvenir AUG _ Spalted Wood (Field-Tested).webp" },
    { name: "Souvenir MAC-10 | Sienna Damask (Minimal Wear)", img: "Souvenir MAC-10 _ Sienna Damask (Minimal Wear).webp" },
    { name: "Souvenir Sawed-Off | Parched (Field-Tested)", img: "Souvenir Sawed-Off _ Parched (Field-Tested).webp" },
    { name: "StatTrak CZ75-Auto | Tacticat (Well-Worn)", img: "StatTrak™ CZ75-Auto _ Tacticat (Well-Worn).webp" },
    { name: "StatTrak M249 | Downtown (Field-Tested)", img: "StatTrak™ M249 _ Downtown (Field-Tested).webp" },
    { name: "StatTrak M4A4 | Poly Mag (Field-Tested)", img: "StatTrak™ M4A4 _ Poly Mag (Field-Tested).webp" },
    { name: "Sticker | Aim And Fire", img: "Sticker _ Aim And Fire.webp" },
    { name: "Sticker | Angry T", img: "Sticker _ Angry T.webp" },
    { name: "Sticker | Hot Rod Heat", img: "Sticker _ Hot Rod Heat.webp" },
    { name: "Tec-9 | Garter-9 (Field-Tested)", img: "Tec-9 _ Garter-9 (Field-Tested).webp" },
    { name: "Tec-9 | Rebel (Well-Worn)", img: "Tec-9 _ Rebel (Well-Worn).webp" },
    { name: "UMP-45 | Moonrise (Field-Tested)", img: "UMP-45 _ Moonrise (Field-Tested).webp" },
    { name: "UMP-45 | Roadblock (Battle-Scarred)", img: "UMP-45 _ Roadblock (Battle-Scarred).webp" },
    { name: "USP-S | Alpine Camo (Well-Worn)", img: "USP-S _ Alpine Camo (Well-Worn).webp" },
    { name: "USP-S | Torque (Field-Tested)", img: "USP-S _ Torque (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (Field-Tested)", img: "Zeus x27 _ Electric Blue (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (Minimal Wear)", img: "Zeus x27 _ Electric Blue (Minimal Wear).webp" },
    { name: "Zeus x27 | Tosai (Well-Worn)", img: "Zeus x27 _ Tosai (Well-Worn).webp" }
];

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
        img: `img/tatcial/${skin.img}`
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

let currentWinningSkin = null;

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
