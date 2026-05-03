console.log("XANZO SKINS: TO'LIQ INTEGRATSIYA YUKLANDI!");

// ==========================================
// 1. GLOBAL SOZLAMALAR VA DATA
// ==========================================
if (typeof window.appData === 'undefined') {
    window.appData = {
        currentWinningSkin: null,
        currentCaseId: null
    };
}

const p = (usd) => Math.round(usd * 19500);

// Keyslar ro'yxati
const cases = [
    { id: "Tactical", folder: "Tactical", name: {uz: "Tactical", ru: "Тактический", en: "Tactical"}, price: 4000, img: "img/case1.png" },
    { id: "Spectrum", folder: "Spectrum", name: {uz: "Spectrum", ru: "Спектр", en: "Spectrum"}, price: 5000, img: "img/case2.png" },
    { id: "Clutch", folder: "Clutch", name: {uz: "Clutch", ru: "Clutch", en: "Clutch"}, price: 6000, img: "img/case3.png" },
    { id: "Urban", folder: "Urban", name: {uz: "Urban", ru: "Городской", en: "Urban"}, price: 8000, img: "img/case4.png" },
    { id: "All_in", folder: "All_in", name: {uz: "All In", ru: "Все или ничего", en: "All In"}, price: 15000, img: "img/case5.png" },
    { id: "Military", folder: "Military", name: {uz: "Military", ru: "Военный", en: "Military"}, price: 17000, img: "img/case6.png" },
    { id: "SMG", folder: "SMG", name: {uz: "SMG", ru: "SMG", en: "SMG"}, price: 20000, img: "img/case7.png" },
    { id: "Carbon_fiber", folder: "Carbon_fiber", name: {uz: "Carbon Fiber", ru: "Карбон", en: "Carbon Fiber"}, price: 25000, img: "img/case8.png" },
    { id: "Armory", folder: "Armory", name: {uz: "Armory", ru: "Арсенал", en: "Armory"}, price: 30000, img: "img/case9.png" },
    { id: "StatTrack", folder: "StatTrack", name: {uz: "StatTrak", ru: "StatTrak", en: "StatTrak"}, price: 50000, img: "img/case10.png" }
];

const TacticalSkins = [
    { name: "AK-47 | Olive Polycam (FT)", price: 7650, file: "AK-47 _ Olive Polycam (Field-Tested).webp" },
    { name: "AK-47 | Safari Mesh (FT)", price: 8670, file: "AK-47 _ Safari Mesh (Field-Tested).webp" },
    { name: "AK-47 | Safari Mesh (WW)", price: 8160, file: "AK-47 _ Safari Mesh (Well-Worn).webp" },
    { name: "AK-47 | Slate (WW)", price: 145350, file: "AK-47 _ Slate (Well-Worn).webp" },
    { name: "AK-47 | VariCamo Grey (FT)", price: 7140, file: "AK-47 _ VariCamo Grey (Field-Tested).webp" },
    { name: "AUG | Storm (FT)", price: 2040, file: "AUG _ Storm (Field-Tested).webp" },
    { name: "AWP | Capillary (WW)", price: 7650, file: "AWP _ Capillary (Well-Worn).webp" },
    { name: "AWP | Safari Mesh (WW)", price: 14280, file: "AWP _ Safari Mesh (Well-Worn).webp" },
    { name: "Austin 2025 Challengers Capsule", price: 12750, file: "Austin 2025 Challengers Sticker Capsule.webp" },
    { name: "Charm | Baby's AK", price: 255000, file: "Charm _ Baby's AK.webp" },
    { name: "Charm | Backsplash", price: 153000, file: "Charm _ Backsplash.webp" },
    { name: "Charm | Hot Hands", price: 204000, file: "Charm _ Hot Hands.webp" },
    { name: "Charm | Pocket AWP", price: 306000, file: "Charm _ Pocket AWP.webp" },
    { name: "Charm | Stitch-Loaded", price: 178500, file: "Charm _ Stitch-Loaded.webp" },
    { name: "Desert Eagle | Blue Ply (WW)", price: 9180, file: "Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "Desert Eagle | Serpent Strike (FT)", price: 2142000, file: "Desert Eagle _ Serpent Strike (Field-Tested).webp" },
    { name: "Desert Eagle | Tilted (FT)", price: 5100, file: "Desert Eagle _ Tilted (Field-Tested).webp" },
    { name: "Dual Berettas | Cobalt Quartz (FT)", price: 10200, file: "Dual Berettas _ Cobalt Quartz (Field-Tested).webp" },
    { name: "Dual Berettas | Hydro Strike (FT)", price: 35700, file: "Dual Berettas _ Hydro Strike (Field-Tested).webp" },
    { name: "FAMAS | Cyanospatter (FT)", price: 4080, file: "FAMAS _ Cyanospatter (Field-Tested).webp" },
    { name: "FAMAS | Meow 36 (WW)", price: 5100, file: "FAMAS _ Meow 36 (Well-Worn).webp" },
    { name: "FAMAS | Survivor Z (FT)", price: 7650, file: "FAMAS _ Survivor Z (Field-Tested).webp" },
    { name: "Five-SeveN | Flame Test (FT)", price: 4080, file: "Five-SeveN _ Flame Test (Field-Tested).webp" },
    { name: "Five-SeveN | Orange Peel (FT)", price: 15300, file: "Five-SeveN _ Orange Peel (Field-Tested).webp" },
    { name: "Five-SeveN | Sky Blue (FT)", price: 84150, file: "Five-SeveN _ Sky Blue (Field-Tested).webp" },
    { name: "Galil AR | Connexion (BS)", price: 20400, file: "Galil AR _ Connexion (Battle-Scarred).webp" },
    { name: "Galil AR | Control (FT)", price: 15300, file: "Galil AR _ Control (Field-Tested).webp" },
    { name: "Galil AR | Destroyer (FT)", price: 7650, file: "Galil AR _ Destroyer (Field-Tested).webp" },
    { name: "Galil AR | Green Apple (MW)", price: 9180, file: "Galil AR _ Green Apple (Minimal Wear).webp" },
    { name: "Galil AR | Robin's Egg (FT)", price: 5100, file: "Galil AR _ Robin's Egg (Field-Tested).webp" },
    { name: "Galil AR | Rocket Pop (FT)", price: 15300, file: "Galil AR _ Rocket Pop (Field-Tested).webp" },
    { name: "Glock-18 | Block-18 (BS)", price: 10200, file: "Glock-18 _ Block-18 (Battle-Scarred).webp" },
    { name: "Glock-18 | Clear Polymer (BS)", price: 12750, file: "Glock-18 _ Clear Polymer (Battle-Scarred).webp" },
    { name: "Glock-18 | Moonrise (WW)", price: 17850, file: "Glock-18 _ Moonrise (Well-Worn).webp" },
    { name: "Glock-18 | Oxide Blaze (WW)", price: 3060, file: "Glock-18 _ Oxide Blaze (Well-Worn).webp" },
    { name: "Glock-18 | Shinobu (WW)", price: 25500, file: "Glock-18 _ Shinobu (Well-Worn).webp" },
    { name: "Glock-18 | Umbral Rabbit (FT)", price: 20400, file: "Glock-18 _ Umbral Rabbit (Field-Tested).webp" },
    { name: "Glock-18 | Winterized (FT)", price: 5100, file: "Glock-18 _ Winterized (Field-Tested).webp" },
    { name: "M4A1-S | Boreal Forest (FT)", price: 25500, file: "M4A1-S _ Boreal Forest (Field-Tested).webp" },
    { name: "M4A1-S | Nitro (FT)", price: 127500, file: "M4A1-S _ Nitro (Field-Tested).webp" },
    { name: "M4A1-S | Wash me plz (FT)", price: 30600, file: "M4A1-S _ Wash me plz (Field-Tested).webp" },
    { name: "M4A4 | Choppa (FT)", price: 66300, file: "M4A4 _ Choppa (Field-Tested).webp" },
    { name: "M4A4 | Etch Lord (BS)", price: 51000, file: "M4A4 _ Etch Lord (Battle-Scarred).webp" },
    { name: "M4A4 | Magnesium (WW)", price: 8160, file: "M4A4 _ Magnesium (Well-Worn).webp" },
    { name: "M4A4 | Naval Shred Camo (WW)", price: 6120, file: "M4A4 _ Naval Shred Camo (Well-Worn).webp" },
    { name: "M4A4 | Poly Mag (BS)", price: 7140, file: "M4A4 _ Poly Mag (Battle-Scarred).webp" },
    { name: "M4A4 | Poly Mag (WW)", price: 8160, file: "M4A4 _ Poly Mag (Well-Worn).webp" },
    { name: "MAC-10 | Allure (BS)", price: 15300, file: "MAC-10 _ Allure (Battle-Scarred).webp" },
    { name: "MAC-10 | Carnivore (WW)", price: 3060, file: "MAC-10 _ Carnivore (Well-Worn).webp" },
    { name: "MAG-7 | Wildwood (FT)", price: 5100, file: "MAG-7 _ Wildwood (Field-Tested).webp" },
    { name: "MP5-SD | Liquidation (WW)", price: 7650, file: "MP5-SD _ Liquidation (Well-Worn).webp" },
    { name: "MP5-SD | Necro Jr. (WW)", price: 5100, file: "MP5-SD _ Necro Jr. (Well-Worn).webp" },
    { name: "MP9 | Featherweight (WW)", price: 10200, file: "MP9 _ Featherweight (Well-Worn).webp" },
    { name: "Negev | Bulkhead (BS)", price: 3060, file: "Negev _ Bulkhead (Battle-Scarred).webp" },
    { name: "Negev | Ultralight (FT)", price: 4080, file: "Negev _ Ultralight (Field-Tested).webp" },
    { name: "Nova | Candy Apple (MW)", price: 4080, file: "Nova _ Candy Apple (Minimal Wear).webp" },
    { name: "Nova | Wurst Hölle (WW)", price: 3060, file: "Nova _ Wurst Hölle (Well-Worn).webp" },
    { name: "P2000 | Acid Etched (BS)", price: 25500, file: "P2000 _ Acid Etched (Battle-Scarred).webp" },
    { name: "P90 | Neoqueen (BS)", price: 14280, file: "P90 _ Neoqueen (Battle-Scarred).webp" },
    { name: "P90 | Vent Rush (BS)", price: 15300, file: "P90 _ Vent Rush (Battle-Scarred).webp" },
    { name: "PP-Bizon | Facility Sketch (FN)", price: 1020, file: "PP-Bizon _ Facility Sketch (Factory New).webp" },
    { name: "Paris 2023 Challengers Capsule", price: 15300, file: "Paris 2023 Challengers Sticker Capsule.webp" },
    { name: "R8 Revolver | Bone Mask (FT)", price: 1020, file: "R8 Revolver _ Bone Mask (Field-Tested).webp" },
    { name: "SCAR-20 | Poultrygeist (FT)", price: 2550, file: "SCAR-20 _ Poultrygeist (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (FT)", price: 2040, file: "SG 553 _ Basket Halftone (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (MW)", price: 3060, file: "SG 553 _ Basket Halftone (Minimal Wear).webp" },
    { name: "SG 553 | Cyberforce (FT)", price: 20400, file: "SG 553 _ Cyberforce (Field-Tested).webp" },
    { name: "SG 553 | Dragon Tech (WW)", price: 25500, file: "SG 553 _ Dragon Tech (Well-Worn).webp" },
    { name: "SSG 08 | Mainframe 001 (WW)", price: 12750, file: "SSG 08 _ Mainframe 001 (Well-Worn).webp" },
    { name: "SSG 08 | Memorial (FT)", price: 10200, file: "SSG 08 _ Memorial (Field-Tested).webp" },
    { name: "Sawed-Off | Analog Input (MW)", price: 15300, file: "Sawed-Off _ Analog Input (Minimal Wear).webp" },
    { name: "Sawed-Off | Origami (FT)", price: 4080, file: "Sawed-Off _ Origami (Field-Tested).webp" },
    { name: "Souvenir MAC-10 | Sienna Damask (MW)", price: 20400, file: "Souvenir MAC-10 _ Sienna Damask (Minimal Wear).webp" },
    { name: "StatTrak™ CZ75-Auto | Tacticat (WW)", price: 45900, file: "StatTrak™ CZ75-Auto _ Tacticat (Well-Worn).webp" },
    { name: "StatTrak™ M249 | Downtown (FT)", price: 30600, file: "StatTrak™ M249 _ Downtown (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Poly Mag (FT)", price: 51000, file: "StatTrak™ M4A4 _ Poly Mag (Field-Tested).webp" },
    { name: "Sticker | Aim And Fire", price: 25500, file: "Sticker _ Aim And Fire.webp" },
    { name: "Sticker | Angry T", price: 15300, file: "Sticker _ Angry T.webp" },
    { name: "Sticker | Hot Rod Heat", price: 20400, file: "Sticker _ Hot Rod Heat.webp" },
    { name: "Tec-9 | Bamboozle (BS)", price: 4080, file: "Tec-9 _ Bamboozle (Battle-Scarred).webp" },
    { name: "Tec-9 | Citric Acid (FT)", price: 10200, file: "Tec-9 _ Citric Acid (Field-Tested).webp" },
    { name: "Tec-9 | Garter-9 (FT)", price: 12750, file: "Tec-9 _ Garter-9 (Field-Tested).webp" },
    { name: "Tec-9 | Rebel (FT)", price: 35700, file: "Tec-9 _ Rebel (Field-Tested).webp" },
    { name: "Tec-9 | Rebel (WW)", price: 30600, file: "Tec-9 _ Rebel (Well-Worn).webp" },
    { name: "UMP-45 | Moonrise (FT)", price: 10200, file: "UMP-45 _ Moonrise (Field-Tested).webp" },
    { name: "USP-S | Alpine Camo (WW)", price: 12750, file: "USP-S _ Alpine Camo (Well-Worn).webp" },
    { name: "USP-S | Torque (FT)", price: 51000, file: "USP-S _ Torque (Field-Tested).webp" },
    { name: "XM1014 | Oxide Blaze (FT)", price: 3060, file: "XM1014 _ Oxide Blaze (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (FT)", price: 6460, file: "Zeus x27 _ Electric Blue (Field-Tested).webp" },
    { name: "Zeus x27 | Tosai (WW)", price: 10200, file: "Zeus x27 _ Tosai (Well-Worn).webp" }
];

const SpectrumSkins = [
    { name: "AK-47 | Olive Polycam (MW)", price: 10200, file: "AK-47 _ Olive Polycam (Minimal Wear).webp" },
    { name: "AK-47 | Safari Mesh (MW)", price: 12750, file: "AK-47 _ Safari Mesh (Minimal Wear).webp" },
    { name: "AK-47 | VariCamo Grey (MW)", price: 9180, file: "AK-47 _ VariCamo Grey (Minimal Wear).webp" },
    { name: "AUG | Momentum (WW)", price: 56100, file: "AUG _ Momentum (Well-Worn).webp" },
    { name: "AUG | Trigger Discipline (WW)", price: 25500, file: "AUG _ Trigger Discipline (Well-Worn).webp" },
    { name: "AWP | Safari Mesh (FT)", price: 8670, file: "AWP _ Safari Mesh (Field-Tested).webp" },
    { name: "CZ75-Auto | Eco (WW)", price: 35700, file: "CZ75-Auto _ Eco (Well-Worn).webp" },
    { name: "Desert Eagle | Calligraffiti (WW)", price: 15300, file: "Desert Eagle _ Calligraffiti (Well-Worn).webp" },
    { name: "Desert Eagle | Heat Treated (WW)", price: 459000, file: "Desert Eagle _ Heat Treated (Well-Worn).webp" },
    { name: "Desert Eagle | Mudder (MW)", price: 5100, file: "Desert Eagle _ Mudder (Minimal Wear).webp" },
    { name: "Desert Eagle | Serpent Strike (FT)", price: 2142000, file: "Desert Eagle _ Serpent Strike (Field-Tested).webp" },
    { name: "Dual Berettas | Polished Malachite (FT)", price: 10200, file: "Dual Berettas _ Polished Malachite (Field-Tested).webp" },
    { name: "Dual Berettas | Rose Nacre (FT)", price: 7650, file: "Dual Berettas _ Rose Nacre (Field-Tested).webp" },
    { name: "FAMAS | Cyanospatter (FT)", price: 4080, file: "FAMAS _ Cyanospatter (Field-Tested).webp" },
    { name: "FAMAS | Survivor Z (FT)", price: 7650, file: "FAMAS _ Survivor Z (Field-Tested).webp" },
    { name: "FAMAS | Teardown (FT)", price: 15300, file: "FAMAS _ Teardown (Field-Tested).webp" },
    { name: "Five-SeveN | Coolant (FN)", price: 6120, file: "Five-SeveN _ Coolant (Factory New).webp" },
    { name: "Five-SeveN | Hybrid (WW)", price: 7650, file: "Five-SeveN _ Hybrid (Well-Worn).webp" },
    { name: "Five-SeveN | Silver Quartz (MW)", price: 15300, file: "Five-SeveN _ Silver Quartz (Minimal Wear).webp" },
    { name: "Five-SeveN | Sky Blue (FT)", price: 84150, file: "Five-SeveN _ Sky Blue (Field-Tested).webp" },
    { name: "Galil AR | Acid Dart (FT)", price: 5610, file: "Galil AR _ Acid Dart (Field-Tested).webp" },
    { name: "Galil AR | Acid Dart (MW)", price: 6120, file: "Galil AR _ Acid Dart (Minimal Wear).webp" },
    { name: "Galil AR | Cold Fusion (BS)", price: 4590, file: "Galil AR _ Cold Fusion (Battle-Scarred).webp" },
    { name: "Galil AR | Firefight (FT)", price: 7140, file: "Galil AR _ Firefight (Field-Tested).webp" },
    { name: "Galil AR | Green Apple (MW)", price: 9180, file: "Galil AR _ Green Apple (Minimal Wear).webp" },
    { name: "Galil AR | Grey Smoke (FN)", price: 10200, file: "Galil AR _ Grey Smoke (Factory New).webp" },
    { name: "Galil AR | Robin's Egg (FT)", price: 5100, file: "Galil AR _ Robin's Egg (Field-Tested).webp" },
    { name: "Galil AR | Tuxedo (FT)", price: 12750, file: "Galil AR _ Tuxedo (Field-Tested).webp" },
    { name: "Glock-18 | Clear Polymer (BS)", price: 12750, file: "Glock-18 _ Clear Polymer (Battle-Scarred).webp" },
    { name: "Glock-18 | Ocean Topo (MW)", price: 22950, file: "Glock-18 _ Ocean Topo (Minimal Wear).webp" },
    { name: "Glock-18 | Sacrifice (WW)", price: 5100, file: "Glock-18 _ Sacrifice (Well-Worn).webp" },
    { name: "M249 | Sage Camo (FN)", price: 6120, file: "M249 _ Sage Camo (Factory New).webp" },
    { name: "M4A1-S | Boreal Forest (BS)", price: 24480, file: "M4A1-S _ Boreal Forest (Battle-Scarred).webp" },
    { name: "M4A1-S | Boreal Forest (FT)", price: 25500, file: "M4A1-S _ Boreal Forest (Field-Tested).webp" },
    { name: "M4A1-S | Mud-Spec (FT)", price: 14280, file: "M4A1-S _ Mud-Spec (Field-Tested).webp" },
    { name: "M4A1-S | Night Terror (FT)", price: 66300, file: "M4A1-S _ Night Terror (Field-Tested).webp" },
    { name: "M4A1-S | Wash me plz (BS)", price: 23460, file: "M4A1-S _ Wash me plz (Battle-Scarred).webp" },
    { name: "M4A1-S | Wash me plz (FT)", price: 25500, file: "M4A1-S _ Wash me plz (Field-Tested).webp" },
    { name: "M4A4 | Naval Shred Camo (MW)", price: 7140, file: "M4A4 _ Naval Shred Camo (Minimal Wear).webp" },
    { name: "M4A4 | Steel Work (BS)", price: 48450, file: "M4A4 _ Steel Work (Battle-Scarred).webp" },
    { name: "M4A4 | Steel Work (FT)", price: 51000, file: "M4A4 _ Steel Work (Field-Tested).webp" },
    { name: "M4A4 | Steel Work (MW)", price: 53550, file: "M4A4 _ Steel Work (Minimal Wear).webp" },
    { name: "M4A4 | Urban DDPAT (FT)", price: 4080, file: "M4A4 _ Urban DDPAT (Field-Tested).webp" },
    { name: "MAC-10 | Allure (BS)", price: 15300, file: "MAC-10 _ Allure (Battle-Scarred).webp" },
    { name: "MAC-10 | Calf Skin (FT)", price: 7140, file: "MAC-10 _ Calf Skin (Field-Tested).webp" },
    { name: "MAC-10 | Candy Apple (MW)", price: 4080, file: "MAC-10 _ Candy Apple (Minimal Wear).webp" },
    { name: "MAC-10 | Pipsqueak (BS)", price: 6120, file: "MAC-10 _ Pipsqueak (Battle-Scarred).webp" },
    { name: "MAC-10 | Pipsqueak (FT)", price: 7140, file: "MAC-10 _ Pipsqueak (Field-Tested).webp" },
    { name: "MAC-10 | Sakkaku (FT)", price: 17850, file: "MAC-10 _ Sakkaku (Field-Tested).webp" },
    { name: "MAC-10 | Storm Camo (WW)", price: 3060, file: "MAC-10 _ Storm Camo (Well-Worn).webp" },
    { name: "MAG-7 | Insomnia (MW)", price: 28050, file: "MAG-7 _ Insomnia (Minimal Wear).webp" },
    { name: "MAG-7 | Monster Call (WW)", price: 15300, file: "MAG-7 _ Monster Call (Well-Worn).webp" },
    { name: "MAG-7 | Wildwood (FT)", price: 5100, file: "MAG-7 _ Wildwood (Field-Tested).webp" },
    { name: "MP5-SD | Neon Squeezer (FT)", price: 8160, file: "MP5-SD _ Neon Squeezer (Field-Tested).webp" },
    { name: "MP5-SD | Neon Squeezer (WW)", price: 7650, file: "MP5-SD _ Neon Squeezer (Well-Worn).webp" },
    { name: "MP7 | Motherboard (MW)", price: 5100, file: "MP7 _ Motherboard (Minimal Wear).webp" },
    { name: "MP9 | Bioleak (MW)", price: 4080, file: "MP9 _ Bioleak (Minimal Wear).webp" },
    { name: "Negev | Bulkhead (BS)", price: 3060, file: "Negev _ Bulkhead (Battle-Scarred).webp" },
    { name: "Negev | Sour Grapes (FT)", price: 4080, file: "Negev _ Sour Grapes (Field-Tested).webp" },
    { name: "Nova | Candy Apple (MW)", price: 4080, file: "Nova _ Candy Apple (Minimal Wear).webp" },
    { name: "P250 | Cassette (FT)", price: 3060, file: "P250 _ Cassette (Field-Tested).webp" },
    { name: "P250 | Sedimentary (FT)", price: 5100, file: "P250 _ Sedimentary (Field-Tested).webp" },
    { name: "P90 | Blue Tac (FN)", price: 12750, file: "P90 _ Blue Tac (Factory New).webp" },
    { name: "P90 | Freight (FT)", price: 10200, file: "P90 _ Freight (Field-Tested).webp" },
    { name: "P90 | Mustard Gas (FT)", price: 20400, file: "P90 _ Mustard Gas (Field-Tested).webp" },
    { name: "P90 | Neoqueen (BS)", price: 14280, file: "P90 _ Neoqueen (Battle-Scarred).webp" },
    { name: "P90 | Wash me (FT)", price: 10200, file: "P90 _ Wash me (Field-Tested).webp" },
    { name: "PP-Bizon | Candy Apple (FT)", price: 3570, file: "PP-Bizon _ Candy Apple (Field-Tested).webp" },
    { name: "PP-Bizon | Space Cat (MW)", price: 12750, file: "PP-Bizon _ Space Cat (Minimal Wear).webp" },
    { name: "R8 Revolver | Crazy 8 (WW)", price: 15300, file: "R8 Revolver _ Crazy 8 (Well-Worn).webp" },
    { name: "R8 Revolver | Leafhopper (FT)", price: 3060, file: "R8 Revolver _ Leafhopper (Field-Tested).webp" },
    { name: "SCAR-20 | Poultrygeist (FT)", price: 2550, file: "SCAR-20 _ Poultrygeist (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (FT)", price: 2040, file: "SG 553 _ Basket Halftone (Field-Tested).webp" },
    { name: "SG 553 | Cyberforce (FT)", price: 20400, file: "SG 553 _ Cyberforce (Field-Tested).webp" },
    { name: "SG 553 | Danger Close (FT)", price: 10200, file: "SG 553 _ Danger Close (Field-Tested).webp" },
    { name: "SG 553 | Integrale (WW)", price: 4845000, file: "SG 553 _ Integrale (Well-Worn).webp" },
    { name: "SG 553 | Ol' Rusty (FT)", price: 7140, file: "SG 553 _ Ol' Rusty (Field-Tested).webp" },
    { name: "SSG 08 | Fever Dream (FT)", price: 40800, file: "SSG 08 _ Fever Dream (Field-Tested).webp" },
    { name: "Souvenir M249 | Midnight Palm (FT)", price: 10200, file: "Souvenir M249 _ Midnight Palm (Field-Tested).webp" },
    { name: "Souvenir MAC-10 | Strats (FT)", price: 7140, file: "Souvenir MAC-10 _ Strats (Field-Tested).webp" },
    { name: "Souvenir MAG-7 | Navy Sheen (MW)", price: 12750, file: "Souvenir MAG-7 _ Navy Sheen (Minimal Wear).webp" },
    { name: "Souvenir MP5-SD | Neon Squeezer (BS)", price: 10200, file: "Souvenir MP5-SD _ Neon Squeezer (Battle-Scarred).webp" },
    { name: "Souvenir MP7 | Prey (WW)", price: 5100, file: "Souvenir MP7 _ Prey (Well-Worn).webp" },
    { name: "Souvenir SSG 08 | Prey (FN)", price: 15300, file: "Souvenir SSG 08 _ Prey (Factory New).webp" },
    { name: "StatTrak™ Dual Berettas | Melondrama (BS)", price: 127500, file: "StatTrak™ Dual Berettas _ Melondrama (Battle-Scarred).webp" },
    { name: "StatTrak™ Galil AR | Connexion (FT)", price: 25500, file: "StatTrak™ Galil AR _ Connexion (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Off World (WW)", price: 45900, file: "StatTrak™ Glock-18 _ Off World (Well-Worn).webp" },
    { name: "StatTrak™ Negev | Drop Me (FT)", price: 15300, file: "StatTrak™ Negev _ Drop Me (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Neoqueen (FT)", price: 20400, file: "StatTrak™ P90 _ Neoqueen (Field-Tested).webp" },
    { name: "Tec-9 | Flash Out (FT)", price: 4080, file: "Tec-9 _ Flash Out (Field-Tested).webp" },
    { name: "UMP-45 | Green Swirl (FN)", price: 15300, file: "UMP-45 _ Green Swirl (Factory New).webp" },
    { name: "UMP-45 | Late Night Transit (BS)", price: 7650, file: "UMP-45 _ Late Night Transit (Battle-Scarred).webp" },
    { name: "USP-S | Alpine Camo (FT)", price: 15300, file: "USP-S _ Alpine Camo (Field-Tested).webp" },
    { name: "USP-S | Ticket to Hell (FT)", price: 30600, file: "USP-S _ Ticket to Hell (Field-Tested).webp" },
    { name: "USP-S | Torque (FT)", price: 51000, file: "USP-S _ Torque (Field-Tested).webp" },
    { name: "XM1014 | Blue Steel (BS)", price: 15300, file: "XM1014 _ Blue Steel (Battle-Scarred).webp" },
    { name: "XM1014 | Slipstream (FT)", price: 3060, file: "XM1014 _ Slipstream (Field-Tested).webp" },
    { name: "XM1014 | Ziggy (FT)", price: 7140, file: "XM1014 _ Ziggy (Field-Tested).webp" },
    { name: "Zeus x27 | Electric Blue (FT)", price: 6460, file: "Zeus x27 _ Electric Blue (Field-Tested).webp" },
    { name: "Zeus x27 | Olympus (MW)", price: 229500, file: "Zeus x27 _ Olympus (Minimal Wear).webp" }
];

const ClutchSkins = [
    { name: "AK-47 | Ice Coaled (BS)", price: 204000, file: "AK-47 _ Ice Coaled (Battle-Scarred).webp" },
    { name: "AK-47 | Olive Polycam (WW)", price: 9180, file: "AK-47 _ Olive Polycam (Well-Worn).webp" },
    { name: "AK-47 | Safari Mesh (WW)", price: 8160, file: "AK-47 _ Safari Mesh (Well-Worn).webp" },
    { name: "AUG | Commando Company (FN)", price: 15300, file: "AUG _ Commando Company (Factory New).webp" },
    { name: "AUG | Ricochet (MW)", price: 6120, file: "AUG _ Ricochet (Minimal Wear).webp" },
    { name: "AWP | Atheris (BS)", price: 86700, file: "AWP _ Atheris (Battle-Scarred).webp" },
    { name: "AWP | Pit Viper (MW)", price: 127500, file: "AWP _ Pit Viper (Minimal Wear).webp" },
    { name: "CZ75-Auto | Eco (WW)", price: 35700, file: "CZ75-Auto _ Eco (Well-Worn).webp" },
    { name: "Charm | Backsplash", price: 153000, file: "Charm _ Backsplash.webp" },
    { name: "Charm | Hot Sauce", price: 127500, file: "Charm _ Hot Sauce.webp" },
    { name: "Charm | Lil' Ava", price: 255000, file: "Charm _ Lil' Ava.webp" },
    { name: "Charm | Lil' Curse", price: 204000, file: "Charm _ Lil' Curse.webp" },
    { name: "Charm | Lil' SAS", price: 178500, file: "Charm _ Lil' SAS.webp" },
    { name: "Charm | Lil' Tusk", price: 153000, file: "Charm _ Lil' Tusk.webp" },
    { name: "Charm | Stitch-Loaded", price: 178500, file: "Charm _ Stitch-Loaded.webp" },
    { name: "Desert Eagle | Heat Treated (BS)", price: 408000, file: "Desert Eagle _ Heat Treated (Battle-Scarred).webp" },
    { name: "Desert Eagle | Tilted (FT)", price: 5100, file: "Desert Eagle _ Tilted (Field-Tested).webp" },
    { name: "Dual Berettas | Cobalt Quartz (MW)", price: 12750, file: "Dual Berettas _ Cobalt Quartz (Minimal Wear).webp" },
    { name: "Dual Berettas | Colony (FT)", price: 1020, file: "Dual Berettas _ Colony (Field-Tested).webp" },
    { name: "Dual Berettas | Dualing Dragons (WW)", price: 4080, file: "Dual Berettas _ Dualing Dragons (Well-Worn).webp" },
    { name: "Dual Berettas | Polished Malachite (FT)", price: 10200, file: "Dual Berettas _ Polished Malachite (Field-Tested).webp" },
    { name: "Dual Berettas | Polished Malachite (MW)", price: 12750, file: "Dual Berettas _ Polished Malachite (Minimal Wear).webp" },
    { name: "FAMAS | Meow 36 (WW)", price: 5100, file: "FAMAS _ Meow 36 (Well-Worn).webp" },
    { name: "Five-SeveN | Coolant (FN)", price: 6120, file: "Five-SeveN _ Coolant (Factory New).webp" },
    { name: "Five-SeveN | Flame Test (FT)", price: 4080, file: "Five-SeveN _ Flame Test (Field-Tested).webp" },
    { name: "Five-SeveN | Orange Peel (FT)", price: 15300, file: "Five-SeveN _ Orange Peel (Field-Tested).webp" },
    { name: "G3SG1 | Green Apple (MW)", price: 5100, file: "G3SG1 _ Green Apple (Minimal Wear).webp" },
    { name: "Galil AR | Acid Dart (MW)", price: 6120, file: "Galil AR _ Acid Dart (Minimal Wear).webp" },
    { name: "Galil AR | Cold Fusion (MW)", price: 7650, file: "Galil AR _ Cold Fusion (Minimal Wear).webp" },
    { name: "Galil AR | Robin's Egg (FT)", price: 5100, file: "Galil AR _ Robin's Egg (Field-Tested).webp" },
    { name: "Glock-18 | Bunsen Burner (BS)", price: 10200, file: "Glock-18 _ Bunsen Burner (Battle-Scarred).webp" },
    { name: "Glock-18 | Clear Polymer (FT)", price: 15300, file: "Glock-18 _ Clear Polymer (Field-Tested).webp" },
    { name: "Glock-18 | Green Line (WW)", price: 5100, file: "Glock-18 _ Green Line (Well-Worn).webp" },
    { name: "Glock-18 | Moonrise (BS)", price: 12750, file: "Glock-18 _ Moonrise (Battle-Scarred).webp" },
    { name: "Glock-18 | Nuclear Garden (BS)", price: 153000, file: "Glock-18 _ Nuclear Garden (Battle-Scarred).webp" },
    { name: "Glock-18 | Ocean Topo (FT)", price: 17850, file: "Glock-18 _ Ocean Topo (Field-Tested).webp" },
    { name: "Glock-18 | Off World (BS)", price: 3060, file: "Glock-18 _ Off World (Battle-Scarred).webp" },
    { name: "M4A1-S | Boreal Forest (BS)", price: 24480, file: "M4A1-S _ Boreal Forest (Battle-Scarred).webp" },
    { name: "M4A1-S | Emphorosaur-S (FT)", price: 45900, file: "M4A1-S _ Emphorosaur-S (Field-Tested).webp" },
    { name: "M4A1-S | Liquidation (BS)", price: 20400, file: "M4A1-S _ Liquidation (Battle-Scarred).webp" },
    { name: "M4A1-S | Night Terror (BS)", price: 56100, file: "M4A1-S _ Night Terror (Battle-Scarred).webp" },
    { name: "M4A1-S | Nitro (WW)", price: 112200, file: "M4A1-S _ Nitro (Well-Worn).webp" },
    { name: "M4A1-S | Wash me plz (BS)", price: 23460, file: "M4A1-S _ Wash me plz (Battle-Scarred).webp" },
    { name: "M4A1-S | Wash me plz (MW)", price: 40800, file: "M4A1-S _ Wash me plz (Minimal Wear).webp" },
    { name: "M4A4 | Choppa (WW)", price: 61200, file: "M4A4 _ Choppa (Well-Worn).webp" },
    { name: "M4A4 | Magnesium (WW)", price: 8160, file: "M4A4 _ Magnesium (Well-Worn).webp" },
    { name: "M4A4 | Mainframe (FT)", price: 5100, file: "M4A4 _ Mainframe (Field-Tested).webp" },
    { name: "M4A4 | Poly Mag (FT)", price: 10200, file: "M4A4 _ Poly Mag (Field-Tested).webp" },
    { name: "M4A4 | Steel Work (FT)", price: 51000, file: "M4A4 _ Steel Work (Field-Tested).webp" },
    { name: "M4A4 | Steel Work (MW)", price: 53550, file: "M4A4 _ Steel Work (Minimal Wear).webp" },
    { name: "M4A4 | Urban DDPAT (FT)", price: 4080, file: "M4A4 _ Urban DDPAT (Field-Tested).webp" },
    { name: "MAC-10 | Acid Hex (MW)", price: 3060, file: "MAC-10 _ Acid Hex (Minimal Wear).webp" },
    { name: "MAC-10 | Candy Apple (MW)", price: 4080, file: "MAC-10 _ Candy Apple (Minimal Wear).webp" },
    { name: "MAC-10 | Light Box (MW)", price: 10200, file: "MAC-10 _ Light Box (Minimal Wear).webp" },
    { name: "MAC-10 | Poplar Thicket (FT)", price: 1020, file: "MAC-10 _ Poplar Thicket (Field-Tested).webp" },
    { name: "MAC-10 | Rangeen (FT)", price: 2040, file: "MAC-10 _ Rangeen (Field-Tested).webp" },
    { name: "MAG-7 | Cobalt Core (FT)", price: 4080, file: "MAG-7 _ Cobalt Core (Field-Tested).webp" },
    { name: "MP9 | Bioleak (MW)", price: 4080, file: "MP9 _ Bioleak (Minimal Wear).webp" },
    { name: "MP9 | Buff Blue (FN)", price: 15300, file: "MP9 _ Buff Blue (Factory New).webp" },
    { name: "MP9 | Orange Peel (FT)", price: 5100, file: "MP9 _ Orange Peel (Field-Tested).webp" },
    { name: "MP9 | Pine (FN)", price: 10200, file: "MP9 _ Pine (Factory New).webp" },
    { name: "Negev | Bulkhead (FT)", price: 5100, file: "Negev _ Bulkhead (Field-Tested).webp" },
    { name: "Nova | Candy Apple (MW)", price: 4080, file: "Nova _ Candy Apple (Minimal Wear).webp" },
    { name: "Nova | Wurst Hölle (WW)", price: 3060, file: "Nova _ Wurst Hölle (Well-Worn).webp" },
    { name: "P2000 | Royal Baroque (WW)", price: 25500, file: "P2000 _ Royal Baroque (Well-Worn).webp" },
    { name: "P250 | Sedimentary (FT)", price: 5100, file: "P250 _ Sedimentary (Field-Tested).webp" },
    { name: "P250 | Verdigris (BS)", price: 3060, file: "P250 _ Verdigris (Battle-Scarred).webp" },
    { name: "P250 | Verdigris (FT)", price: 4080, file: "P250 _ Verdigris (Field-Tested).webp" },
    { name: "P250 | X-Ray (MW)", price: 35700, file: "P250 _ X-Ray (Minimal Wear).webp" },
    { name: "P90 | Freight (MW)", price: 12750, file: "P90 _ Freight (Minimal Wear).webp" },
    { name: "P90 | Grim (MW)", price: 5100, file: "P90 _ Grim (Minimal Wear).webp" },
    { name: "P90 | Mustard Gas (FT)", price: 20400, file: "P90 _ Mustard Gas (Field-Tested).webp" },
    { name: "PP-Bizon | Candy Apple (MW)", price: 5100, file: "PP-Bizon _ Candy Apple (Minimal Wear).webp" },
    { name: "R8 Revolver | Leafhopper (FT)", price: 3060, file: "R8 Revolver _ Leafhopper (Field-Tested).webp" },
    { name: "SG 553 | Basket Halftone (FT)", price: 2040, file: "SG 553 _ Basket Halftone (Field-Tested).webp" },
    { name: "SG 553 | Dragon Tech (FT)", price: 30600, file: "SG 553 _ Dragon Tech (Field-Tested).webp" },
    { name: "SSG 08 | Blue Spruce (MW)", price: 5100, file: "SSG 08 _ Blue Spruce (Minimal Wear).webp" },
    { name: "SSG 08 | Memorial (FT)", price: 10200, file: "SSG 08 _ Memorial (Field-Tested).webp" },
    { name: "Sawed-Off | Apocalypto (FT)", price: 15300, file: "Sawed-Off _ Apocalypto (Field-Tested).webp" },
    { name: "Sawed-Off | Limelight (BS)", price: 10200, file: "Sawed-Off _ Limelight (Battle-Scarred).webp" },
    { name: "Sawed-Off | Origami (FT)", price: 4080, file: "Sawed-Off _ Origami (Field-Tested).webp" },
    { name: "Souvenir AUG | Carved Jade (MW)", price: 255000, file: "Souvenir AUG _ Carved Jade (Minimal Wear).webp" },
    { name: "Souvenir MAG-7 | Navy Sheen (MW)", price: 12750, file: "Souvenir MAG-7 _ Navy Sheen (Minimal Wear).webp" },
    { name: "Souvenir MP5-SD | Neon Squeezer (BS)", price: 10200, file: "Souvenir MP5-SD _ Neon Squeezer (Battle-Scarred).webp" },
    { name: "Souvenir P250 | Drought (FN)", price: 51000, file: "Souvenir P250 _ Drought (Factory New).webp" },
    { name: "Souvenir SG 553 | Lush Ruins (FT)", price: 15300, file: "Souvenir SG 553 _ Lush Ruins (Field-Tested).webp" },
    { name: "Souvenir USP-S | Purple DDPAT (FT)", price: 306000, file: "Souvenir USP-S _ Purple DDPAT (Field-Tested).webp" },
    { name: "StatTrak™ Dual Berettas | Flora Carnivora (BS)", price: 153000, file: "StatTrak™ Dual Berettas _ Flora Carnivora (Battle-Scarred).webp" },
    { name: "StatTrak™ M4A4 | Etch Lord (BS)", price: 204000, file: "StatTrak™ M4A4 _ Etch Lord (Battle-Scarred).webp" },
    { name: "StatTrak™ MAC-10 | Oceanic (FT)", price: 15300, file: "StatTrak™ MAC-10 _ Oceanic (Field-Tested).webp" },
    { name: "StatTrak™ UMP-45 | Plastique (FT)", price: 25500, file: "StatTrak™ UMP-45 _ Plastique (Field-Tested).webp" },
    { name: "Tec-9 | Bamboozle (FT)", price: 6120, file: "Tec-9 _ Bamboozle (Field-Tested).webp" },
    { name: "Tec-9 | Citric Acid (FT)", price: 10200, file: "Tec-9 _ Citric Acid (Field-Tested).webp" },
    { name: "Tec-9 | Garter-9 (MW)", price: 15300, file: "Tec-9 _ Garter-9 (Minimal Wear).webp" },
    { name: "Tec-9 | VariCamo (FT)", price: 2040, file: "Tec-9 _ VariCamo (Field-Tested).webp" },
    { name: "USP-S | 27 (WW)", price: 35700, file: "USP-S _ 27 (Well-Worn).webp" },
    { name: "USP-S | Alpine Camo (WW)", price: 12750, file: "USP-S _ Alpine Camo (Well-Worn).webp" },
    { name: "USP-S | PC-GRN (BS)", price: 20400, file: "USP-S _ PC-GRN (Battle-Scarred).webp" },
    { name: "USP-S | Tropical Breeze (FT)", price: 25500, file: "USP-S _ Tropical Breeze (Field-Tested).webp" },
    { name: "XM1014 | Teclu Burner (BS)", price: 15300, file: "XM1014 _ Teclu Burner (Battle-Scarred).webp" }
];

const UrbanSkins = [
    { name: "AK-47 | Elite Build (BS)", price: 45900, file: "AK-47 _ Elite Build (Battle-Scarred).webp" },
    { name: "AK-47 | VariCamo Grey (MW)", price: 9180, file: "AK-47 _ VariCamo Grey (Minimal Wear).webp" },
    { name: "AK-47 | VariCamo Grey (WW)", price: 8160, file: "AK-47 _ VariCamo Grey (Well-Worn).webp" },
    { name: "AUG | Steel Sentinel (MW)", price: 15300, file: "AUG _ Steel Sentinel (Minimal Wear).webp" },
    { name: "CZ75-Auto | Imprint (FT)", price: 3060, file: "CZ75-Auto _ Imprint (Field-Tested).webp" },
    { name: "CZ75-Auto | Imprint (WW)", price: 2550, file: "CZ75-Auto _ Imprint (Well-Worn).webp" },
    { name: "CZ75-Auto | Tuxedo (FT)", price: 10200, file: "CZ75-Auto _ Tuxedo (Field-Tested).webp" },
    { name: "CZ75-Auto | Tuxedo (MW)", price: 12750, file: "CZ75-Auto _ Tuxedo (Minimal Wear).webp" },
    { name: "CZ75-Auto | Tuxedo (WW)", price: 9180, file: "CZ75-Auto _ Tuxedo (Well-Worn).webp" },
    { name: "Charm | Dead Weight", price: 204000, file: "Charm _ Dead Weight.webp" },
    { name: "Desert Eagle | The Daily Deagle (FT)", price: 10200, file: "Desert Eagle _ The Daily Deagle (Field-Tested).webp" },
    { name: "Desert Eagle | The Daily Deagle (MW)", price: 15300, file: "Desert Eagle _ The Daily Deagle (Minimal Wear).webp" },
    { name: "Desert Eagle | Urban Rubble (FN)", price: 20400, file: "Desert Eagle _ Urban Rubble (Factory New).webp" },
    { name: "Desert Eagle | Urban Rubble (FT)", price: 12750, file: "Desert Eagle _ Urban Rubble (Field-Tested).webp" },
    { name: "Desert Eagle | Urban Rubble (MW)", price: 15300, file: "Desert Eagle _ Urban Rubble (Minimal Wear).webp" },
    { name: "Dual Berettas | Elite 1.6 (FT)", price: 5100, file: "Dual Berettas _ Elite 1.6 (Field-Tested).webp" },
    { name: "Dual Berettas | Silver Pour (FN)", price: 10200, file: "Dual Berettas _ Silver Pour (Factory New).webp" },
    { name: "FAMAS | 2A2F (FT)", price: 7650, file: "FAMAS _ 2A2F (Field-Tested).webp" },
    { name: "FAMAS | Grey Ghost (FN)", price: 12750, file: "FAMAS _ Grey Ghost (Factory New).webp" },
    { name: "FAMAS | Grey Ghost (MW)", price: 10200, file: "FAMAS _ Grey Ghost (Minimal Wear).webp" },
    { name: "FAMAS | Vendetta (FT)", price: 15300, file: "FAMAS _ Vendetta (Field-Tested).webp" },
    { name: "Five-SeveN | Scumbria (FT)", price: 3060, file: "Five-SeveN _ Scumbria (Field-Tested).webp" },
    { name: "Five-SeveN | Scumbria (WW)", price: 2550, file: "Five-SeveN _ Scumbria (Well-Worn).webp" },
    { name: "Five-SeveN | Silver Quartz (FT)", price: 12750, file: "Five-SeveN _ Silver Quartz (Field-Tested).webp" },
    { name: "Galil AR | Destroyer (FN)", price: 15300, file: "Galil AR _ Destroyer (Factory New).webp" },
    { name: "Galil AR | Tuxedo (MW)", price: 15300, file: "Galil AR _ Tuxedo (Minimal Wear).webp" },
    { name: "Glock-18 | Clear Polymer (WW)", price: 10200, file: "Glock-18 _ Clear Polymer (Well-Worn).webp" },
    { name: "M249 | O.S.I.P.R. (BS)", price: 4080, file: "M249 _ O.S.I.P.R. (Battle-Scarred).webp" },
    { name: "M4A1-S | Nitro (MW)", price: 178500, file: "M4A1-S _ Nitro (Minimal Wear).webp" },
    { name: "M4A4 | Aeolian Dark (FT)", price: 25500, file: "M4A4 _ Aeolian Dark (Field-Tested).webp" },
    { name: "M4A4 | Aeolian Dark (MW)", price: 30600, file: "M4A4 _ Aeolian Dark (Minimal Wear).webp" },
    { name: "M4A4 | Magnesium (BS)", price: 7140, file: "M4A4 _ Magnesium (Battle-Scarred).webp" },
    { name: "M4A4 | Magnesium (MW)", price: 10200, file: "M4A4 _ Magnesium (Minimal Wear).webp" },
    { name: "M4A4 | Mainframe (FN)", price: 15300, file: "M4A4 _ Mainframe (Factory New).webp" },
    { name: "M4A4 | Mainframe (FT)", price: 5100, file: "M4A4 _ Mainframe (Field-Tested).webp" },
    { name: "M4A4 | Mainframe (MW)", price: 7650, file: "M4A4 _ Mainframe (Minimal Wear).webp" },
    { name: "M4A4 | Urban DDPAT (BS)", price: 3570, file: "M4A4 _ Urban DDPAT (Battle-Scarred).webp" },
    { name: "M4A4 | Urban DDPAT (FT)", price: 4080, file: "M4A4 _ Urban DDPAT (Field-Tested).webp" },
    { name: "M4A4 | Urban DDPAT (WW)", price: 3825, file: "M4A4 _ Urban DDPAT (Well-Worn).webp" },
    { name: "MAC-10 | Light Box (BS)", price: 7650, file: "MAC-10 _ Light Box (Battle-Scarred).webp" },
    { name: "MAC-10 | Light Box (FT)", price: 10200, file: "MAC-10 _ Light Box (Field-Tested).webp" },
    { name: "MAC-10 | Silver (FN)", price: 12750, file: "MAC-10 _ Silver (Factory New).webp" },
    { name: "MAC-10 | Silver (MW)", price: 10200, file: "MAC-10 _ Silver (Minimal Wear).webp" },
    { name: "MAC-10 | Snow Splash (FN)", price: 15300, file: "MAC-10 _ Snow Splash (Factory New).webp" },
    { name: "MAC-10 | Snow Splash (MW)", price: 12750, file: "MAC-10 _ Snow Splash (Minimal Wear).webp" },
    { name: "MAC-10 | Whitefish (WW)", price: 2040, file: "MAC-10 _ Whitefish (Well-Worn).webp" },
    { name: "MAG-7 | SWAG-7 (MW)", price: 10200, file: "MAG-7 _ SWAG-7 (Minimal Wear).webp" },
    { name: "MP5-SD | Snow Splash (FN)", price: 15300, file: "MP5-SD _ Snow Splash (Factory New).webp" },
    { name: "MP5-SD | Snow Splash (FT)", price: 8670, file: "MP5-SD _ Snow Splash (Field-Tested).webp" },
    { name: "MP7 | Armor Core (FN)", price: 5100, file: "MP7 _ Armor Core (Factory New).webp" },
    { name: "MP9 | Broken Record (WW)", price: 15300, file: "MP9 _ Broken Record (Well-Worn).webp" },
    { name: "MP9 | Featherweight (BS)", price: 7140, file: "MP9 _ Featherweight (Battle-Scarred).webp" },
    { name: "MP9 | Featherweight (WW)", price: 10200, file: "MP9 _ Featherweight (Well-Worn).webp" },
    { name: "MP9 | Nexus (WW)", price: 5100, file: "MP9 _ Nexus (Well-Worn).webp" },
    { name: "Negev | Ultralight (FT)", price: 4080, file: "Negev _ Ultralight (Field-Tested).webp" },
    { name: "P2000 | Grip Tape (FT)", price: 5100, file: "P2000 _ Grip Tape (Field-Tested).webp" },
    { name: "P2000 | Sure Grip (FT)", price: 7650, file: "P2000 _ Sure Grip (Field-Tested).webp" },
    { name: "P250 | Metallic DDPAT (MW)", price: 10200, file: "P250 _ Metallic DDPAT (Minimal Wear).webp" },
    { name: "P250 | Re.built (BS)", price: 5100, file: "P250 _ Re.built (Battle-Scarred).webp" },
    { name: "P250 | Re.built (FT)", price: 7650, file: "P250 _ Re.built (Field-Tested).webp" },
    { name: "R8 Revolver | Dark Chamber (FT)", price: 20400, file: "R8 Revolver _ Dark Chamber (Field-Tested).webp" },
    { name: "R8 Revolver | Reboot (WW)", price: 15300, file: "R8 Revolver _ Reboot (Well-Worn).webp" },
    { name: "SCAR-20 | Trail Blazer (FN)", price: 25500, file: "SCAR-20 _ Trail Blazer (Factory New).webp" },
    { name: "SG 553 | Damascus Steel (BS)", price: 10200, file: "SG 553 _ Damascus Steel (Battle-Scarred).webp" },
    { name: "SG 553 | Damascus Steel (FT)", price: 12750, file: "SG 553 _ Damascus Steel (Field-Tested).webp" },
    { name: "SG 553 | Damascus Steel (MW)", price: 15300, file: "SG 553 _ Damascus Steel (Minimal Wear).webp" },
    { name: "SG 553 | Heavy Metal (FT)", price: 15300, file: "SG 553 _ Heavy Metal (Field-Tested).webp" },
    { name: "SG 553 | Heavy Metal (MW)", price: 20400, file: "SG 553 _ Heavy Metal (Minimal Wear).webp" },
    { name: "SSG 08 | Memorial (MW)", price: 12750, file: "SSG 08 _ Memorial (Minimal Wear).webp" },
    { name: "SSG 08 | Rapid Transit (WW)", price: 15300, file: "SSG 08 _ Rapid Transit (Well-Worn).webp" },
    { name: "SSG 08 | Zeno (BS)", price: 10200, file: "SSG 08 _ Zeno (Battle-Scarred).webp" },
    { name: "Souvenir FAMAS | 2A2F (FT)", price: 12750, file: "Souvenir FAMAS _ 2A2F (Field-Tested).webp" },
    { name: "Souvenir FAMAS | Dark Water (FT)", price: 40800, file: "Souvenir FAMAS _ Dark Water (Field-Tested).webp" },
    { name: "Souvenir PP-Bizon | Facility Sketch (MW)", price: 5100, file: "Souvenir PP-Bizon _ Facility Sketch (Minimal Wear).webp" },
    { name: "Souvenir SSG 08 | Carbon Fiber (FN)", price: 30600, file: "Souvenir SSG 08 _ Carbon Fiber (Factory New).webp" },
    { name: "StatTrak™ AUG | Tom Cat (FT)", price: 10200, file: "StatTrak™ AUG _ Tom Cat (Field-Tested).webp" },
    { name: "StatTrak™ CZ75-Auto | Imprint (FT)", price: 15300, file: "StatTrak™ CZ75-Auto _ Imprint (Field-Tested).webp" },
    { name: "StatTrak™ Dual Berettas | Balance (WW)", price: 12750, file: "StatTrak™ Dual Berettas _ Balance (Well-Worn).webp" },
    { name: "StatTrak™ Galil AR | Destroyer (FT)", price: 20400, file: "StatTrak™ Galil AR _ Destroyer (Field-Tested).webp" },
    { name: "StatTrak™ M249 | O.S.I.P.R. (BS)", price: 10200, file: "StatTrak™ M249 _ O.S.I.P.R. (Battle-Scarred).webp" },
    { name: "StatTrak™ MAC-10 | Button Masher (WW)", price: 15300, file: "StatTrak™ MAC-10 _ Button Masher (Well-Worn).webp" },
    { name: "StatTrak™ MAC-10 | Whitefish (BS)", price: 5100, file: "StatTrak™ MAC-10 _ Whitefish (Battle-Scarred).webp" },
    { name: "StatTrak™ MP9 | Dart (FT)", price: 12750, file: "StatTrak™ MP9 _ Dart (Field-Tested).webp" },
    { name: "StatTrak™ MP9 | Featherweight (WW)", price: 20400, file: "StatTrak™ MP9 _ Featherweight (Well-Worn).webp" },
    { name: "StatTrak™ Negev | Prototype (MW)", price: 15300, file: "StatTrak™ Negev _ Prototype (Minimal Wear).webp" },
    { name: "StatTrak™ P250 | Re.built (WW)", price: 15300, file: "StatTrak™ P250 _ Re.built (Well-Worn).webp" },
    { name: "StatTrak™ P90 | Elite Build (FT)", price: 25500, file: "StatTrak™ P90 _ Elite Build (Field-Tested).webp" },
    { name: "StatTrak™ SCAR-20 | Enforcer (BS)", price: 15300, file: "StatTrak™ SCAR-20 _ Enforcer (Battle-Scarred).webp" },
    { name: "StatTrak™ UMP-45 | Labyrinth (FT)", price: 10200, file: "StatTrak™ UMP-45 _ Labyrinth (Field-Tested).webp" },
    { name: "StatTrak™ USP-S | Ticket to Hell (FT)", price: 61200, file: "StatTrak™ USP-S _ Ticket to Hell (Field-Tested).webp" },
    { name: "StatTrak™ XM1014 | Black Tie (FT)", price: 51000, file: "StatTrak™ XM1014 _ Black Tie (Field-Tested).webp" },
    { name: "Tec-9 | Urban DDPAT (MW)", price: 5100, file: "Tec-9 _ Urban DDPAT (Minimal Wear).webp" },
    { name: "UMP-45 | Carbon Fiber (FN)", price: 10200, file: "UMP-45 _ Carbon Fiber (Factory New).webp" },
    { name: "UMP-45 | Labyrinth (WW)", price: 3060, file: "UMP-45 _ Labyrinth (Well-Worn).webp" },
    { name: "UMP-45 | Motorized (FN)", price: 15300, file: "UMP-45 _ Motorized (Factory New).webp" },
    { name: "UMP-45 | Motorized (FT)", price: 10200, file: "UMP-45 _ Motorized (Field-Tested).webp" },
    { name: "USP-S | Ticket to Hell (WW)", price: 25500, file: "USP-S _ Ticket to Hell (Well-Worn).webp" },
    { name: "XM1014 | Blue Steel (BS)", price: 15300, file: "XM1014 _ Blue Steel (Battle-Scarred).webp" },
    { name: "XM1014 | Blue Steel (WW)", price: 17850, file: "XM1014 _ Blue Steel (Well-Worn).webp" }
];

const All_inSkins = [
    { name: "AK-47 | Emerald Pinstripe (MW)", price: 45000, file: "AK-47 _ Emerald Pinstripe (Minimal Wear).webp" },
    { name: "AK-47 | Ice Coaled (FT)", price: 120000, file: "AK-47 _ Ice Coaled (Field-Tested).webp" },
    { name: "AK-47 | Neon Revolution (FT)", price: 280000, file: "AK-47 _ Neon Revolution (Field-Tested).webp" },
    { name: "AK-47 | Phantom Disruptor (FT)", price: 95000, file: "AK-47 _ Phantom Disruptor (Field-Tested).webp" },
    { name: "AUG | Sweeper (FN)", price: 5000, file: "AUG _ Sweeper (Factory New).webp" },
    { name: "AWP | Atheris (FT)", price: 42000, file: "AWP _ Atheris (Field-Tested).webp" },
    { name: "AWP | Printstream (BS)", price: 450000, file: "AWP _ Printstream (Battle-Scarred).webp" },
    { name: "Dual Berettas | BorDeux (MW)", price: 12000, file: "Dual Berettas _ BorDeux (Minimal Wear).webp" },
    { name: "FAMAS | Meow 36 (WW)", price: 8000, file: "FAMAS _ Meow 36 (Well-Worn).webp" },
    { name: "Five-SeveN | Angry Mob (FT)", price: 65000, file: "Five-SeveN _ Angry Mob (Field-Tested).webp" },
    { name: "Five-SeveN | Coolant (MW)", price: 4500, file: "Five-SeveN _ Coolant (Minimal Wear).webp" },
    { name: "Five-SeveN | Orange Peel (FT)", price: 15000, file: "Five-SeveN _ Orange Peel (Field-Tested).webp" },
    { name: "Galil AR | Cold Fusion (FT)", price: 10000, file: "Galil AR _ Cold Fusion (Field-Tested).webp" },
    { name: "Glock-18 | Shinobu (FT)", price: 35000, file: "Glock-18 _ Shinobu (Field-Tested).webp" },
    { name: "Glock-18 | Vogue (MW)", price: 55000, file: "Glock-18 _ Vogue (Minimal Wear).webp" },
    { name: "MAC-10 | Calf Skin (WW)", price: 9000, file: "MAC-10 _ Calf Skin (Well-Worn).webp" },
    { name: "MAC-10 | Palm (FT)", price: 18000, file: "MAC-10 _ Palm (Field-Tested).webp" },
    { name: "MP7 | Motherboard (FT)", price: 7000, file: "MP7 _ Motherboard (Field-Tested).webp" },
    { name: "MP7 | Sunbaked (FT)", price: 6500, file: "MP7 _ Sunbaked (Field-Tested).webp" },
    { name: "MP9 | Buff Blue (FT)", price: 11000, file: "MP9 _ Buff Blue (Field-Tested).webp" },
    { name: "MP9 | Mount Fuji (BS)", price: 25000, file: "MP9 _ Mount Fuji (Battle-Scarred).webp" },
    { name: "MP9 | Multi-Terrain (MW)", price: 4000, file: "MP9 _ Multi-Terrain (Minimal Wear).webp" },
    { name: "MP9 | Pine (FT)", price: 5500, file: "MP9 _ Pine (Field-Tested).webp" },
    { name: "Negev | Bulkhead (FT)", price: 6000, file: "Negev _ Bulkhead (Field-Tested).webp" },
    { name: "Nova | Mandrel (BS)", price: 3000, file: "Nova _ Mandrel (Battle-Scarred).webp" },
    { name: "P250 | Sand Dune (MW)", price: 2500, file: "P250 _ Sand Dune (Minimal Wear).webp" },
    { name: "R8 Revolver | Nitro (FT)", price: 9000, file: "R8 Revolver _ Nitro (Field-Tested).webp" },
    { name: "Sawed-Off | Snake Camo (FT)", price: 15000, file: "Sawed-Off _ Snake Camo (Field-Tested).webp" },
    { name: "Souvenir AUG | Spalted Wood (FT)", price: 22000, file: "Souvenir AUG _ Spalted Wood (Field-Tested).webp" },
    { name: "Souvenir MP7 | Sunbaked (FT)", price: 18000, file: "Souvenir MP7 _ Sunbaked (Field-Tested).webp" },
    { name: "Souvenir SG 553 | Bleached (MW)", price: 14000, file: "Souvenir SG 553 _ Bleached (Minimal Wear).webp" },
    { name: "Souvenir UMP-45 | Scorched (FT)", price: 5000, file: "Souvenir UMP-45 _ Scorched (Field-Tested).webp" },
    { name: "Souvenir XM1014 | Blue Tire (FT)", price: 8500, file: "Souvenir XM1014 _ Blue Tire (Field-Tested).webp" },
    { name: "StatTrak™ SG 553 | Pulse (FT)", price: 65000, file: "StatTrak™ SG 553 _ Pulse (Field-Tested).webp" },
    { name: "Sticker | Aim And Fire", price: 25000, file: "Sticker _ Aim And Fire.webp" },
    { name: "Sticker | Cloud9 | Rio 2022", price: 15000, file: "Sticker _ Cloud9 _ Rio 2022.webp" },
    { name: "Sticker | w0nderful | Rio 2022", price: 12000, file: "Sticker _ w0nderful _ Rio 2022.webp" },
    { name: "Zeus x27 | Olympus (FT)", price: 85000, file: "Zeus x27 _ Olympus (Field-Tested).webp" },
    { name: "Zeus x27 | Swamp DDPAT (FT)", price: 7500, file: "Zeus x27 _ Swamp DDPAT (Field-Tested).webp" }
];

const MilitarySkins = [
    { name: "★ Navaja Knife | Forest DDPAT (FT)", price: 1250000, file: "★ Navaja Knife _ Forest DDPAT (Field-Tested).webp" },
    { name: "★ Driver Gloves | Racing Green (FT)", price: 950000, file: "★ Driver Gloves _ Racing Green (Field-Tested).webp" },
    { name: "AK-47 | Head Shot (WW)", price: 350000, file: "AK-47 _ Head Shot (Well-Worn).webp" },
    { name: "AK-47 | Green Laminate (FN)", price: 155000, file: "AK-47 _ Green Laminate (Factory New).webp" },
    { name: "Paris 2023 Anubis Souvenir Package", price: 120000, file: "Paris 2023 Anubis Souvenir Package.webp" },
    { name: "AK-47 | Baroque Purple (FT)", price: 85000, file: "AK-47 _ Baroque Purple (Field-Tested).webp" },
    { name: "AK-47 | Wintergreen (FT)", price: 75000, file: "AK-47 _ Wintergreen (Field-Tested).webp" },
    { name: "StatTrak™ USP-S | Ticket to Hell (MW)", price: 110000, file: "StatTrak™ USP-S _ Ticket to Hell (Minimal Wear).webp" },
    { name: "Glock-18 | Wasteland Rebel (FT)", price: 85000, file: "Glock-18 _ Wasteland Rebel (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Choppa (MW)", price: 95000, file: "StatTrak™ M4A4 _ Choppa (Minimal Wear).webp" },
    { name: "AK-47 | Slate (WW)", price: 55000, file: "AK-47 _ Slate (Well-Worn).webp" },
    { name: "AWP | Phobos (MW)", price: 42000, file: "AWP _ Phobos (Minimal Wear).webp" },
    { name: "AK-47 | Elite Build (WW)", price: 35000, file: "AK-47 _ Elite Build (Well-Worn).webp" },
    { name: "AK-47 | Emerald Pinstripe (BS)", price: 32000, file: "AK-47 _ Emerald Pinstripe (Battle-Scarred).webp" },
    { name: "AK-47 | Olive Polycam (FT)", price: 8500, file: "AK-47 _ Olive Polycam (Field-Tested).webp" },
    { name: "AK-47 | Safari Mesh (FT)", price: 7000, file: "AK-47 _ Safari Mesh (Field-Tested).webp" },
    { name: "AK-47 | Safari Mesh (MW)", price: 9500, file: "AK-47 _ Safari Mesh (Minimal Wear).webp" },
    { name: "AK-47 | The Outsiders (BS)", price: 62000, file: "AK-47 _ The Outsiders (Battle-Scarred).webp" },
    { name: "AK-47 | Uncharted (FT)", price: 11000, file: "AK-47 _ Uncharted (Field-Tested).webp" },
    { name: "AK-47 | VariCamo Grey (FT)", price: 6500, file: "AK-47 _ VariCamo Grey (Field-Tested).webp" },
    { name: "AUG | Stymphalian (FT)", price: 28000, file: "AUG _ Stymphalian (Field-Tested).webp" },
    { name: "AUG | Surveillance (FT)", price: 15000, file: "AUG _ Surveillance (Field-Tested).webp" },
    { name: "AWP | Exoskeleton (BS)", price: 18000, file: "AWP _ Exoskeleton (Battle-Scarred).webp" },
    { name: "AWP | Pit Viper (FT)", price: 31000, file: "AWP _ Pit Viper (Field-Tested).webp" },
    { name: "AWP | Safari Mesh (FT)", price: 12000, file: "AWP _ Safari Mesh (Field-Tested).webp" },
    { name: "AWP | Worm God (FT)", price: 25000, file: "AWP _ Worm God (Field-Tested).webp" },
    { name: "Antwerp 2022 Inferno Souvenir Package", price: 95000, file: "Antwerp 2022 Inferno Souvenir Package.webp" },
    { name: "Antwerp 2022 Legends Sticker Capsule", price: 45000, file: "Antwerp 2022 Legends Sticker Capsule.webp" },
    { name: "CZ75-Auto | Emerald (FN)", price: 65000, file: "CZ75-Auto _ Emerald (Factory New).webp" },
    { name: "CZ75-Auto | Jungle Dashed (FT)", price: 2500, file: "CZ75-Auto _ Jungle Dashed (Field-Tested).webp" },
    { name: "Charm | Disco MAC", price: 145000, file: "Charm _ Disco MAC.webp" },
    { name: "Charm | Lil' SAS", price: 175000, file: "Charm _ Lil' SAS.webp" },
    { name: "Desert Eagle | Meteorite (FN)", price: 22000, file: "Desert Eagle _ Meteorite (Factory New).webp" },
    { name: "Desert Eagle | Mudder (FT)", price: 4000, file: "Desert Eagle _ Mudder (Field-Tested).webp" },
    { name: "Desert Eagle | Urban Rubble (FN)", price: 18000, file: "Desert Eagle _ Urban Rubble (Factory New).webp" },
    { name: "Dual Berettas | Dualing Dragons (FT)", price: 6000, file: "Dual Berettas _ Dualing Dragons (Field-Tested).webp" },
    { name: "Dual Berettas | Heist (MW)", price: 14000, file: "Dual Berettas _ Heist (Minimal Wear).webp" },
    { name: "FAMAS | Faulty Wiring (FT)", price: 5000, file: "FAMAS _ Faulty Wiring (Field-Tested).webp" },
    { name: "Galil AR | Acid Dart (BS)", price: 3500, file: "Galil AR _ Acid Dart (Battle-Scarred).webp" },
    { name: "Galil AR | Black Sand (WW)", price: 4500, file: "Galil AR _ Black Sand (Well-Worn).webp" },
    { name: "Glock-18 | Nuclear Garden (FT)", price: 55000, file: "Glock-18 _ Nuclear Garden (Field-Tested).webp" },
    { name: "Glock-18 | Nuclear Garden (MW)", price: 72000, file: "Glock-18 _ Nuclear Garden (Minimal Wear).webp" },
    { name: "Glock-18 | Winterized (FT)", price: 8000, file: "Glock-18 _ Winterized (Field-Tested).webp" },
    { name: "M249 | Gator Mesh (FT)", price: 3000, file: "M249 _ Gator Mesh (Field-Tested).webp" },
    { name: "M4A1-S | Boreal Forest (FT)", price: 24000, file: "M4A1-S _ Boreal Forest (Field-Tested).webp" },
    { name: "M4A1-S | Mud-Spec (MW)", price: 18000, file: "M4A1-S _ Mud-Spec (Minimal Wear).webp" },
    { name: "M4A1-S | VariCamo (BS)", price: 15000, file: "M4A1-S _ VariCamo (Battle-Scarred).webp" },
    { name: "M4A4 | Choppa (BS)", price: 35000, file: "M4A4 _ Choppa (Battle-Scarred).webp" },
    { name: "MAC-10 | Acid Hex (BS)", price: 2500, file: "MAC-10 _ Acid Hex (Battle-Scarred).webp" },
    { name: "MAC-10 | Classic Crate (BS)", price: 6000, file: "MAC-10 _ Classic Crate (Battle-Scarred).webp" },
    { name: "MAG-7 | Carbon Fiber (FN)", price: 12000, file: "MAG-7 _ Carbon Fiber (Factory New).webp" },
    { name: "MP7 | Forest DDPAT (FN)", price: 15000, file: "MP7 _ Forest DDPAT (Factory New).webp" },
    { name: "MP7 | Powercore (FT)", price: 9000, file: "MP7 _ Powercore (Field-Tested).webp" },
    { name: "MP9 | Army Sheen (FT)", price: 3000, file: "MP9 _ Army Sheen (Field-Tested).webp" },
    { name: "MP9 | Bioleak (FN)", price: 5500, file: "MP9 _ Bioleak (Factory New).webp" },
    { name: "MP9 | Black Sand (BS)", price: 2500, file: "MP9 _ Black Sand (Battle-Scarred).webp" },
    { name: "MP9 | Deadly Poison (FT)", price: 4000, file: "MP9 _ Deadly Poison (Field-Tested).webp" },
    { name: "Name Tag", price: 25000, file: "Name Tag.webp" },
    { name: "P2000 | Turf (BS)", price: 3500, file: "P2000 _ Turf (Battle-Scarred).webp" },
    { name: "P250 | Franklin (FT)", price: 15000, file: "P250 _ Franklin (Field-Tested).webp" },
    { name: "P250 | Metallic DDPAT (FN)", price: 8000, file: "P250 _ Metallic DDPAT (Factory New).webp" },
    { name: "P90 | Ancient Earth (MW)", price: 11000, file: "P90 _ Ancient Earth (Minimal Wear).webp" },
    { name: "PP-Bizon | Brass (FT)", price: 14000, file: "PP-Bizon _ Brass (Field-Tested).webp" },
    { name: "PP-Bizon | Death Rattle (WW)", price: 3000, file: "PP-Bizon _ Death Rattle (Well-Worn).webp" },
    { name: "PP-Bizon | Jungle Slipstream (BS)", price: 2500, file: "PP-Bizon _ Jungle Slipstream (Battle-Scarred).webp" },
    { name: "SCAR-20 | Contractor (FN)", price: 5000, file: "SCAR-20 _ Contractor (Factory New).webp" },
    { name: "SG 553 | Dragon Tech (BS)", price: 12000, file: "SG 553 _ Dragon Tech (Battle-Scarred).webp" },
    { name: "SSG 08 | Acid Fade (FN)", price: 35000, file: "SSG 08 _ Acid Fade (Factory New).webp" },
    { name: "Sawed-Off | Limelight (FT)", price: 18000, file: "Sawed-Off _ Limelight (Field-Tested).webp" },
    { name: "Sawed-Off | Snake Camo (MW)", price: 22000, file: "Sawed-Off _ Snake Camo (Minimal Wear).webp" },
    { name: "Souvenir Dual Berettas | Colony (FT)", price: 5000, file: "Souvenir Dual Berettas _ Colony (Field-Tested).webp" },
    { name: "Souvenir Glock-18 | Night (FT)", price: 45000, file: "Souvenir Glock-18 _ Night (Field-Tested).webp" },
    { name: "Souvenir P2000 | Panther Camo (FT)", price: 35000, file: "Souvenir P2000 _ Panther Camo (Field-Tested).webp" },
    { name: "Souvenir P250 | Black & Tan (FT)", price: 12000, file: "Souvenir P250 _ Black & Tan (Field-Tested).webp" },
    { name: "Souvenir USP-S | Orange Anolis (FT)", price: 155000, file: "Souvenir USP-S _ Orange Anolis (Field-Tested).webp" },
    { name: "StatTrak™ Desert Eagle | Bronze Deco (FT)", price: 28000, file: "StatTrak™ Desert Eagle _ Bronze Deco (Field-Tested).webp" },
    { name: "StatTrak™ Dual Berettas | Retribution (MW)", price: 45000, file: "StatTrak™ Dual Berettas _ Retribution (Minimal Wear).webp" },
    { name: "StatTrak™ G3SG1 | Dream Glade (BS)", price: 12000, file: "StatTrak™ G3SG1 _ Dream Glade (Battle-Scarred).webp" },
    { name: "StatTrak™ G3SG1 | Dream Glade (MW)", price: 22000, file: "StatTrak™ G3SG1 _ Dream Glade (Minimal Wear).webp" },
    { name: "StatTrak™ Galil AR | Akoben (FT)", price: 15000, file: "StatTrak™ Galil AR _ Akoben (Field-Tested).webp" },
    { name: "StatTrak™ Galil AR | Destroyer (FN)", price: 32000, file: "StatTrak™ Galil AR _ Destroyer (Factory New).webp" },
    { name: "StatTrak™ Galil AR | Vandal (FT)", price: 28000, file: "StatTrak™ Galil AR _ Vandal (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Poly Mag (WW)", price: 42000, file: "StatTrak™ M4A4 _ Poly Mag (Well-Worn).webp" },
    { name: "StatTrak™ MP9 | Bioleak (FT)", price: 18000, file: "StatTrak™ MP9 _ Bioleak (Field-Tested).webp" },
    { name: "StatTrak™ P250 | Iron Clad (FT)", price: 14000, file: "StatTrak™ P250 _ Iron Clad (Field-Tested).webp" },
    { name: "StatTrak™ SSG 08 | Necropos (WW)", price: 25000, file: "StatTrak™ SSG 08 _ Necropos (Well-Worn).webp" },
    { name: "StatTrak™ UMP-45 | Corporal (BS)", price: 11000, file: "StatTrak™ UMP-45 _ Corporal (Battle-Scarred).webp" },
    { name: "StatTrak™ USP-S | 27 (WW)", price: 55000, file: "StatTrak™ USP-S _ 27 (Well-Worn).webp" },
    { name: "StatTrak™ XM1014 | Irezumi (MW)", price: 35000, file: "StatTrak™ XM1014 _ Irezumi (Minimal Wear).webp" },
    { name: "Tec-9 | Bamboozle (BS)", price: 4000, file: "Tec-9 _ Bamboozle (Battle-Scarred).webp" },
    { name: "Tec-9 | Fubar (FT)", price: 5000, file: "Tec-9 _ Fubar (Field-Tested).webp" },
    { name: "Tec-9 | Garter-9 (BS)", price: 8000, file: "Tec-9 _ Garter-9 (Battle-Scarred).webp" },
    { name: "USP-S | Flashback (FT)", price: 18000, file: "USP-S _ Flashback (Field-Tested).webp" },
    { name: "USP-S | Forest Leaves (FT)", price: 12000, file: "USP-S _ Forest Leaves (Field-Tested).webp" },
    { name: "USP-S | Lead Conduit (MW)", price: 24000, file: "USP-S _ Lead Conduit (Minimal Wear).webp" },
    { name: "USP-S | Torque (FT)", price: 45000, file: "USP-S _ Torque (Field-Tested).webp" },
    { name: "USP-S | Tropical Breeze (BS)", price: 38000, file: "USP-S _ Tropical Breeze (Battle-Scarred).webp" },
    { name: "XM1014 | Blue Tire (FT)", price: 6000, file: "XM1014 _ Blue Tire (Field-Tested).webp" },
    { name: "Zeus x27 | Swamp DDPAT (FN)", price: 15000, file: "Zeus x27 _ Swamp DDPAT (Factory New).webp" }
];

const SMGSkins = [
    { name: "MAC-10 | Acid Hex (MW)", price: 3000, file: "MAC-10 _ Acid Hex (Minimal Wear).webp" },
    { name: "MAC-10 | Allure (FT)", price: 8500, file: "MAC-10 _ Allure (Field-Tested).webp" },
    { name: "MAC-10 | Allure (WW)", price: 7000, file: "MAC-10 _ Allure (Well-Worn).webp" },
    { name: "MAC-10 | Calf Skin (FT)", price: 9000, file: "MAC-10 _ Calf Skin (Field-Tested).webp" },
    { name: "MAC-10 | Candy Apple (FN)", price: 12000, file: "MAC-10 _ Candy Apple (Factory New).webp" },
    { name: "MAC-10 | Candy Apple (MW)", price: 10000, file: "MAC-10 _ Candy Apple (Minimal Wear).webp" },
    { name: "MAC-10 | Carnivore (BS)", price: 4000, file: "MAC-10 _ Carnivore (Battle-Scarred).webp" },
    { name: "MAC-10 | Derailment (BS)", price: 15000, file: "MAC-10 _ Derailment (Battle-Scarred).webp" },
    { name: "MAC-10 | Disco Tech (BS)", price: 45000, file: "MAC-10 _ Disco Tech (Battle-Scarred).webp" },
    { name: "MAC-10 | Echoing Sands (FT)", price: 18000, file: "MAC-10 _ Echoing Sands (Field-Tested).webp" },
    { name: "MAC-10 | Ensnared (FT)", price: 6000, file: "MAC-10 _ Ensnared (Field-Tested).webp" },
    { name: "MAC-10 | Light Box (FT)", price: 11000, file: "MAC-10 _ Light Box (Field-Tested).webp" },
    { name: "MAC-10 | Pipe Down (FT)", price: 22000, file: "MAC-10 _ Pipe Down (Field-Tested).webp" },
    { name: "MAC-10 | Pipsqueak (FT)", price: 8000, file: "MAC-10 _ Pipsqueak (Field-Tested).webp" },
    { name: "MAC-10 | Pipsqueak (MW)", price: 12000, file: "MAC-10 _ Pipsqueak (Minimal Wear).webp" },
    { name: "MAC-10 | Poplar Thicket (FT)", price: 3500, file: "MAC-10 _ Poplar Thicket (Field-Tested).webp" },
    { name: "MAC-10 | Poplar Thicket (MW)", price: 5000, file: "MAC-10 _ Poplar Thicket (Minimal Wear).webp" },
    { name: "MAC-10 | Rangeen (FT)", price: 4500, file: "MAC-10 _ Rangeen (Field-Tested).webp" },
    { name: "MAC-10 | Saibā Oni (BS)", price: 25000, file: "MAC-10 _ Saibā Oni (Battle-Scarred).webp" },
    { name: "MAC-10 | Saibā Oni (FT)", price: 35000, file: "MAC-10 _ Saibā Oni (Field-Tested).webp" },
    { name: "MAC-10 | Sakkaku (BS)", price: 14000, file: "MAC-10 _ Sakkaku (Battle-Scarred).webp" },
    { name: "MAC-10 | Sakkaku (FT)", price: 19000, file: "MAC-10 _ Sakkaku (Field-Tested).webp" },
    { name: "MP5-SD | Condition Zero (FT)", price: 15000, file: "MP5-SD _ Condition Zero (Field-Tested).webp" },
    { name: "MP5-SD | Kitbash (FT)", price: 17000, file: "MP5-SD _ Kitbash (Field-Tested).webp" },
    { name: "MP5-SD | Kitbash (WW)", price: 14000, file: "MP5-SD _ Kitbash (Well-Worn).webp" },
    { name: "MP5-SD | Liquidation (FT)", price: 8000, file: "MP5-SD _ Liquidation (Field-Tested).webp" },
    { name: "MP5-SD | Liquidation (WW)", price: 7000, file: "MP5-SD _ Liquidation (Well-Worn).webp" },
    { name: "MP5-SD | Necro Jr. (WW)", price: 6500, file: "MP5-SD _ Necro Jr. (Well-Worn).webp" },
    { name: "MP5-SD | Neon Squeezer (FT)", price: 12000, file: "MP5-SD _ Neon Squeezer (Field-Tested).webp" },
    { name: "MP5-SD | Phosphor (FT)", price: 55000, file: "MP5-SD _ Phosphor (Field-Tested).webp" },
    { name: "MP7 | Cirrus (FT)", price: 7000, file: "MP7 _ Cirrus (Field-Tested).webp" },
    { name: "MP7 | Just Smile (WW)", price: 18000, file: "MP7 _ Just Smile (Well-Worn).webp" },
    { name: "MP7 | Smoking Kills (BS)", price: 22000, file: "MP7 _ Smoking Kills (Battle-Scarred).webp" },
    { name: "MP9 | Bioleak (FN)", price: 6000, file: "MP9 _ Bioleak (Factory New).webp" },
    { name: "MP9 | Buff Blue (FN)", price: 13000, file: "MP9 _ Buff Blue (Factory New).webp" },
    { name: "MP9 | Deadly Poison (WW)", price: 4000, file: "MP9 _ Deadly Poison (Well-Worn).webp" },
    { name: "MP9 | Featherweight (FT)", price: 9000, file: "MP9 _ Featherweight (Field-Tested).webp" },
    { name: "MP9 | Food Chain (FT)", price: 65000, file: "MP9 _ Food Chain (Field-Tested).webp" },
    { name: "MP9 | Food Chain (WW)", price: 52000, file: "MP9 _ Food Chain (Well-Worn).webp" },
    { name: "MP9 | Goo (FT)", price: 11000, file: "MP9 _ Goo (Field-Tested).webp" },
    { name: "MP9 | Mount Fuji (FT)", price: 28000, file: "MP9 _ Mount Fuji (Field-Tested).webp" },
    { name: "MP9 | Nexus (MW)", price: 5500, file: "MP9 _ Nexus (Minimal Wear).webp" },
    { name: "MP9 | Orange Peel (MW)", price: 6000, file: "MP9 _ Orange Peel (Minimal Wear).webp" },
    { name: "MP9 | Ruby Poison Dart (MW)", price: 24000, file: "MP9 _ Ruby Poison Dart (Minimal Wear).webp" },
    { name: "MP9 | Shredded (MW)", price: 8500, file: "MP9 _ Shredded (Minimal Wear).webp" },
    { name: "P90 | Chopper (FT)", price: 14000, file: "P90 _ Chopper (Field-Tested).webp" },
    { name: "P90 | Freight (BS)", price: 6000, file: "P90 _ Freight (Battle-Scarred).webp" },
    { name: "P90 | Grim (MW)", price: 9500, file: "P90 _ Grim (Minimal Wear).webp" },
    { name: "P90 | Module (FT)", price: 5000, file: "P90 _ Module (Field-Tested).webp" },
    { name: "P90 | Mustard Gas (MW)", price: 32000, file: "P90 _ Mustard Gas (Minimal Wear).webp" },
    { name: "P90 | Neoqueen (BS)", price: 18000, file: "P90 _ Neoqueen (Battle-Scarred).webp" },
    { name: "P90 | Neoqueen (FT)", price: 22000, file: "P90 _ Neoqueen (Field-Tested).webp" },
    { name: "P90 | Neoqueen (MW)", price: 28000, file: "P90 _ Neoqueen (Minimal Wear).webp" },
    { name: "P90 | Nostalgia (FT)", price: 85000, file: "P90 _ Nostalgia (Field-Tested).webp" },
    { name: "P90 | Off World (BS)", price: 3500, file: "P90 _ Off World (Battle-Scarred).webp" },
    { name: "P90 | Randy Rush (FT)", price: 42000, file: "P90 _ Randy Rush (Field-Tested).webp" },
    { name: "P90 | Reef Grief (FT)", price: 7500, file: "P90 _ Reef Grief (Field-Tested).webp" },
    { name: "P90 | Vent Rush (FT)", price: 14000, file: "P90 _ Vent Rush (Field-Tested).webp" },
    { name: "P90 | Vent Rush (WW)", price: 12000, file: "P90 _ Vent Rush (Well-Worn).webp" },
    { name: "P90 | Wash me (FN)", price: 16000, file: "P90 _ Wash me (Factory New).webp" },
    { name: "PP-Bizon | Brass (BS)", price: 11000, file: "PP-Bizon _ Brass (Battle-Scarred).webp" },
    { name: "PP-Bizon | Brass (MW)", price: 18000, file: "PP-Bizon _ Brass (Minimal Wear).webp" },
    { name: "PP-Bizon | Candy Apple (FN)", price: 9500, file: "PP-Bizon _ Candy Apple (Factory New).webp" },
    { name: "PP-Bizon | Candy Apple (FT)", price: 6000, file: "PP-Bizon _ Candy Apple (Field-Tested).webp" },
    { name: "PP-Bizon | High Roller (MW)", price: 75000, file: "PP-Bizon _ High Roller (Minimal Wear).webp" },
    { name: "PP-Bizon | Space Cat (FT)", price: 14000, file: "PP-Bizon _ Space Cat (Field-Tested).webp" },
    { name: "PP-Bizon | Space Cat (MW)", price: 18000, file: "PP-Bizon _ Space Cat (Minimal Wear).webp" },
    { name: "Souvenir MP9 | Latte Rush (WW)", price: 48000, file: "Souvenir MP9 _ Latte Rush (Well-Worn).webp" },
    { name: "StatTrak™ MAC-10 | Allure (BS)", price: 22000, file: "StatTrak™ MAC-10 _ Allure (Battle-Scarred).webp" },
    { name: "StatTrak™ MAC-10 | Allure (FT)", price: 32000, file: "StatTrak™ MAC-10 _ Allure (Field-Tested).webp" },
    { name: "StatTrak™ MAC-10 | Ensnared (MW)", price: 16000, file: "StatTrak™ MAC-10 _ Ensnared (Minimal Wear).webp" },
    { name: "StatTrak™ MAC-10 | Ensnared (WW)", price: 12000, file: "StatTrak™ MAC-10 _ Ensnared (Well-Worn).webp" },
    { name: "StatTrak™ MAC-10 | Heat (BS)", price: 38000, file: "StatTrak™ MAC-10 _ Heat (Battle-Scarred).webp" },
    { name: "StatTrak™ MAC-10 | Monkeyflage (MW)", price: 21000, file: "StatTrak™ MAC-10 _ Monkeyflage (Minimal Wear).webp" },
    { name: "StatTrak™ MAC-10 | Sakkaku (FT)", price: 55000, file: "StatTrak™ MAC-10 _ Sakkaku (Field-Tested).webp" },
    { name: "StatTrak™ MAC-10 | Toybox (WW)", price: 95000, file: "StatTrak™ MAC-10 _ Toybox (Well-Worn).webp" },
    { name: "StatTrak™ MP7 | Abyssal Apparition (FT)", price: 45000, file: "StatTrak™ MP7 _ Abyssal Apparition (Field-Tested).webp" },
    { name: "StatTrak™ MP7 | Bloodsport (FT)", price: 110000, file: "StatTrak™ MP7 _ Bloodsport (Field-Tested).webp" },
    { name: "StatTrak™ MP9 | Featherweight (MW)", price: 24000, file: "StatTrak™ MP9 _ Featherweight (Minimal Wear).webp" },
    { name: "StatTrak™ MP9 | Modest Threat (FT)", price: 8000, file: "StatTrak™ MP9 _ Modest Threat (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Freight (FT)", price: 25000, file: "StatTrak™ P90 _ Freight (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Neoqueen (FT)", price: 58000, file: "StatTrak™ P90 _ Neoqueen (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Neoqueen (MW)", price: 72000, file: "StatTrak™ P90 _ Neoqueen (Minimal Wear).webp" },
    { name: "StatTrak™ PP-Bizon | Space Cat (WW)", price: 35000, file: "StatTrak™ PP-Bizon _ Space Cat (Well-Worn).webp" },
    { name: "StatTrak™ UMP-45 | Arctic Wolf (WW)", price: 42000, file: "StatTrak™ UMP-45 _ Arctic Wolf (Well-Worn).webp" },
    { name: "StatTrak™ UMP-45 | Exposure (FT)", price: 31000, file: "StatTrak™ UMP-45 _ Exposure (Field-Tested).webp" },
    { name: "StatTrak™ UMP-45 | Motorized (FT)", price: 22000, file: "StatTrak™ UMP-45 _ Motorized (Field-Tested).webp" },
    { name: "StatTrak™ UMP-45 | Motorized (MW)", price: 28000, file: "StatTrak™ UMP-45 _ Motorized (Minimal Wear).webp" },
    { name: "StatTrak™ UMP-45 | Neo-Noir (FT)", price: 145000, file: "StatTrak™ UMP-45 _ Neo-Noir (Field-Tested).webp" },
    { name: "UMP-45 | Arctic Wolf (FT)", price: 18000, file: "UMP-45 _ Arctic Wolf (Field-Tested).webp" },
    { name: "UMP-45 | Grand Prix (FT)", price: 12000, file: "UMP-45 _ Grand Prix (Field-Tested).webp" },
    { name: "UMP-45 | K.O. Factory (BS)", price: 9000, file: "UMP-45 _ K.O. Factory (Battle-Scarred).webp" },
    { name: "UMP-45 | Late Night Transit (BS)", price: 15000, file: "UMP-45 _ Late Night Transit (Battle-Scarred).webp" },
    { name: "UMP-45 | Momentum (FT)", price: 42000, file: "UMP-45 _ Momentum (Field-Tested).webp" },
    { name: "UMP-45 | Moonrise (FT)", price: 9000, file: "UMP-45 _ Moonrise (Field-Tested).webp" },
    { name: "UMP-45 | Moonrise (MW)", price: 13000, file: "UMP-45 _ Moonrise (Minimal Wear).webp" },
    { name: "UMP-45 | Scaffold (WW)", price: 34000, file: "UMP-45 _ Scaffold (Well-Worn).webp" },
    { name: "UMP-45 | Wild Child (FN)", price: 195000, file: "UMP-45 _ Wild Child (Factory New).webp" },
    { name: "UMP-45 | Wild Child (WW)", price: 125000, file: "UMP-45 _ Wild Child (Well-Worn).webp" }
];

const Carbon_fiberSkins = [
    { name: "AK-47 | Ice Coaled (FT)", price: 125000, file: "AK-47 _ Ice Coaled (Field-Tested).webp" },
    { name: "Desert Eagle | Heat Treated (FT)", price: 450000, file: "Desert Eagle _ Heat Treated (Field-Tested).webp" },
    { name: "StatTrak™ P250 | Visions (FT)", price: 115000, file: "StatTrak™ P250 _ Visions (Field-Tested).webp" },
    { name: "AK-47 | Blue Laminate (FT)", price: 145000, file: "AK-47 _ Blue Laminate (Field-Tested).webp" },
    { name: "AK-47 | Slate (MW)", price: 65000, file: "AK-47 _ Slate (Minimal Wear).webp" },
    { name: "USP-S | Cyrex (MW)", price: 55000, file: "USP-S _ Cyrex (Minimal Wear).webp" },
    { name: "M4A1-S | Basilisk (FT)", price: 42000, file: "M4A1-S _ Basilisk (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Grinder (FN)", price: 85000, file: "StatTrak™ Glock-18 _ Grinder (Factory New).webp" },
    { name: "AK-47 | Steel Delta (FT)", price: 35000, file: "AK-47 _ Steel Delta (Field-Tested).webp" },
    { name: "M4A4 | Evil Daimyo (MW)", price: 38000, file: "M4A4 _ Evil Daimyo (Minimal Wear).webp" },
    { name: "AWP | Phobos (FT)", price: 32000, file: "AWP _ Phobos (Field-Tested).webp" },
    { name: "Desert Eagle | Light Rail (FT)", price: 25000, file: "Desert Eagle _ Light Rail (Field-Tested).webp" },
    { name: "AK-47 | Elite Build (MW)", price: 28000, file: "AK-47 _ Elite Build (Minimal Wear).webp" },
    { name: "AK-47 | Elite Build (FT)", price: 18000, file: "AK-47 _ Elite Build (Field-Tested).webp" },
    { name: "USP-S | Black Lotus (BS)", price: 15000, file: "USP-S _ Black Lotus (Battle-Scarred).webp" },
    { name: "AK-47 | Emerald Pinstripe (WW)", price: 24000, file: "AK-47 _ Emerald Pinstripe (Well-Worn).webp" },
    { name: "AK-47 | Uncharted (FT)", price: 9000, file: "AK-47 _ Uncharted (Field-Tested).webp" },
    { name: "AUG | Luxe Trim (FT)", price: 7000, file: "AUG _ Luxe Trim (Field-Tested).webp" },
    { name: "AUG | Tom Cat (MW)", price: 5500, file: "AUG _ Tom Cat (Minimal Wear).webp" },
    { name: "AWP | Black Nile (FT)", price: 45000, file: "AWP _ Black Nile (Field-Tested).webp" },
    { name: "AWP | Elite Build (WW)", price: 95000, file: "AWP _ Elite Build (Well-Worn).webp" },
    { name: "AWP | Exoskeleton (MW)", price: 28000, file: "AWP _ Exoskeleton (Minimal Wear).webp" },
    { name: "AWP | Exoskeleton (FT)", price: 22000, file: "AWP _ Exoskeleton (Field-Tested).webp" },
    { name: "CZ75-Auto | Imprint (WW)", price: 3000, file: "CZ75-Auto _ Imprint (Well-Worn).webp" },
    { name: "Desert Eagle | Blue Ply (WW)", price: 4500, file: "Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "Desert Eagle | Calligraffiti (WW)", price: 12000, file: "Desert Eagle _ Calligraffiti (Well-Worn).webp" },
    { name: "Desert Eagle | Directive (FT)", price: 18000, file: "Desert Eagle _ Directive (Field-Tested).webp" },
    { name: "Desert Eagle | Directive (BS)", price: 14000, file: "Desert Eagle _ Directive (Battle-Scarred).webp" },
    { name: "Desert Eagle | Heat Treated (WW)", price: 380000, file: "Desert Eagle _ Heat Treated (Well-Worn).webp" },
    { name: "Desert Eagle | Meteorite (MW)", price: 16000, file: "Desert Eagle _ Meteorite (Minimal Wear).webp" },
    { name: "Desert Eagle | Urban Rubble (MW)", price: 9000, file: "Desert Eagle _ Urban Rubble (Minimal Wear).webp" },
    { name: "Dual Berettas | Balance (WW)", price: 3500, file: "Dual Berettas _ Balance (Well-Worn).webp" },
    { name: "FAMAS | 2A2F (FT)", price: 6000, file: "FAMAS _ 2A2F (Field-Tested).webp" },
    { name: "FAMAS | ZX Spectron (WW)", price: 15000, file: "FAMAS _ ZX Spectron (Well-Worn).webp" },
    { name: "Five-SeveN | Flame Test (FT)", price: 3000, file: "Five-SeveN _ Flame Test (Field-Tested).webp" },
    { name: "Glock-18 | Bunsen Burner (WW)", price: 5000, file: "Glock-18 _ Bunsen Burner (Well-Worn).webp" },
    { name: "Glock-18 | Catacombs (MW)", price: 4000, file: "Glock-18 _ Catacombs (Minimal Wear).webp" },
    { name: "Glock-18 | Clear Polymer (WW)", price: 6500, file: "Glock-18 _ Clear Polymer (Well-Worn).webp" },
    { name: "Glock-18 | Moonrise (MW)", price: 11000, file: "Glock-18 _ Moonrise (Minimal Wear).webp" },
    { name: "Glock-18 | Shinobu (WW)", price: 24000, file: "Glock-18 _ Shinobu (Well-Worn).webp" },
    { name: "M249 | O.S.I.P.R. (BS)", price: 2500, file: "M249 _ O.S.I.P.R. (Battle-Scarred).webp" },
    { name: "M4A1-S | Mud-Spec (FT)", price: 15000, file: "M4A1-S _ Mud-Spec (Field-Tested).webp" },
    { name: "M4A1-S | Nitro (MW)", price: 145000, file: "M4A1-S _ Nitro (Minimal Wear).webp" },
    { name: "M4A4 | Etch Lord (FT)", price: 48000, file: "M4A4 _ Etch Lord (Field-Tested).webp" },
    { name: "M4A4 | Magnesium (FT)", price: 6000, file: "M4A4 _ Magnesium (Field-Tested).webp" },
    { name: "M4A4 | Magnesium (BS)", price: 4500, file: "M4A4 _ Magnesium (Battle-Scarred).webp" },
    { name: "MAC-10 | Saibā Oni (BS)", price: 22000, file: "MAC-10 _ Saibā Oni (Battle-Scarred).webp" },
    { name: "MAC-10 | Whitefish (MW)", price: 5000, file: "MAC-10 _ Whitefish (Minimal Wear).webp" },
    { name: "MAC-10 | Whitefish (WW)", price: 3500, file: "MAC-10 _ Whitefish (Well-Worn).webp" },
    { name: "MAG-7 | SWAG-7 (BS)", price: 8000, file: "MAG-7 _ SWAG-7 (Battle-Scarred).webp" },
    { name: "MP5-SD | Liquidation (BS)", price: 5500, file: "MP5-SD _ Liquidation (Battle-Scarred).webp" },
    { name: "Nova | Caged Steel (MW)", price: 4000, file: "Nova _ Caged Steel (Minimal Wear).webp" },
    { name: "P250 | Cartel (MW)", price: 85000, file: "P250 _ Cartel (Minimal Wear).webp" },
    { name: "P250 | Metallic DDPAT (FN)", price: 7000, file: "P250 _ Metallic DDPAT (Factory New).webp" },
    { name: "P90 | Chopper (BS)", price: 9000, file: "P90 _ Chopper (Battle-Scarred).webp" },
    { name: "P90 | Vent Rush (BS)", price: 11000, file: "P90 _ Vent Rush (Battle-Scarred).webp" },
    { name: "R8 Revolver | Crazy 8 (BS)", price: 14000, file: "R8 Revolver _ Crazy 8 (Battle-Scarred).webp" },
    { name: "R8 Revolver | Grip (BS)", price: 3000, file: "R8 Revolver _ Grip (Battle-Scarred).webp" },
    { name: "SSG 08 | Dark Water (FT)", price: 18000, file: "SSG 08 _ Dark Water (Field-Tested).webp" },
    { name: "SSG 08 | Ghost Crusader (BS)", price: 12000, file: "SSG 08 _ Ghost Crusader (Battle-Scarred).webp" },
    { name: "Sawed-Off | Analog Input (BS)", price: 15000, file: "Sawed-Off _ Analog Input (Battle-Scarred).webp" },
    { name: "Souvenir Glock-18 | High Beam (MW)", price: 25000, file: "Souvenir Glock-18 _ High Beam (Minimal Wear).webp" },
    { name: "Souvenir M4A4 | Mainframe (FT)", price: 35000, file: "Souvenir M4A4 _ Mainframe (Field-Tested).webp" },
    { name: "StatTrak™ FAMAS | Decommissioned (WW)", price: 14000, file: "StatTrak™ FAMAS _ Decommissioned (Well-Worn).webp" },
    { name: "StatTrak™ Five-SeveN | Scumbria (WW)", price: 9000, file: "StatTrak™ Five-SeveN _ Scumbria (Well-Worn).webp" },
    { name: "StatTrak™ Galil AR | Destroyer (FT)", price: 22000, file: "StatTrak™ Galil AR _ Destroyer (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Winterized (FT)", price: 32000, file: "StatTrak™ Glock-18 _ Winterized (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Magnesium (BS)", price: 35000, file: "StatTrak™ M4A4 _ Magnesium (Battle-Scarred).webp" },
    { name: "StatTrak™ MAC-10 | Ensnared (FT)", price: 12000, file: "StatTrak™ MAC-10 _ Ensnared (Field-Tested).webp" },
    { name: "StatTrak™ MAC-10 | Light Box (WW)", price: 24000, file: "StatTrak™ MAC-10 _ Light Box (Well-Worn).webp" },
    { name: "StatTrak™ MP9 | Featherweight (WW)", price: 28000, file: "StatTrak™ MP9 _ Featherweight (Well-Worn).webp" },
    { name: "StatTrak™ P250 | Valence (FT)", price: 11000, file: "StatTrak™ P250 _ Valence (Field-Tested).webp" },
    { name: "StatTrak™ SSG 08 | Slashed (FT)", price: 16000, file: "StatTrak™ SSG 08 _ Slashed (Field-Tested).webp" },
    { name: "UMP-45 | Carbon Fiber (FN)", price: 8000, file: "UMP-45 _ Carbon Fiber (Factory New).webp" },
    { name: "USP-S | Desert Tactical (WW)", price: 12000, file: "USP-S _ Desert Tactical (Well-Worn).webp" },
    { name: "USP-S | PC-GRN (WW)", price: 18000, file: "USP-S _ PC-GRN (Well-Worn).webp" },
    { name: "USP-S | Ticket to Hell (FT)", price: 25000, file: "USP-S _ Ticket to Hell (Field-Tested).webp" },
    { name: "USP-S | Torque (FT)", price: 38000, file: "USP-S _ Torque (Field-Tested).webp" },
    { name: "XM1014 | Black Tie (FT)", price: 35000, file: "XM1014 _ Black Tie (Field-Tested).webp" },
    { name: "Zeus x27 | Tosai (WW)", price: 10000, file: "Zeus x27 _ Tosai (Well-Worn).webp" }
];
const ArmorySkins = [
    { name: "Souvenir USP-S | Purple DDPAT (FN)", price: 295000, file: "Souvenir USP-S _ Purple DDPAT (Factory New).webp" },
    { name: "StatTrak™ AK-47 | Elite Build (WW)", price: 115000, file: "StatTrak™ AK-47 _ Elite Build (Well-Worn).webp" },
    { name: "M4A1-S | Blood Tiger (FN)", price: 120000, file: "M4A1-S _ Blood Tiger (Factory New).webp" },
    { name: "M4A1-S | Blood Tiger (MW)", price: 105000, file: "M4A1-S _ Blood Tiger (Minimal Wear).webp" },
    { name: "StatTrak™ USP-S | Black Lotus (BS)", price: 48000, file: "StatTrak™ USP-S _ Black Lotus (Battle-Scarred).webp" },
    { name: "Souvenir AK-47 | Steel Delta (MW)", price: 145000, file: "Souvenir AK-47 _ Steel Delta (Minimal Wear).webp" },
    { name: "AK-47 | Green Laminate (FT)", price: 135000, file: "AK-47 _ Green Laminate (Field-Tested).webp" },
    { name: "AK-47 | Wintergreen (MW)", price: 85000, file: "AK-47 _ Wintergreen (Minimal Wear).webp" },
    { name: "AWP | Black Nile (FT)", price: 42000, file: "AWP _ Black Nile (Field-Tested).webp" },
    { name: "Souvenir AWP | Black Nile (FT)", price: 98000, file: "Souvenir AWP _ Black Nile (Field-Tested).webp" },
    { name: "Souvenir AWP | Black Nile (BS)", price: 85000, file: "Souvenir AWP _ Black Nile (Battle-Scarred).webp" },
    { name: "Souvenir AWP | Acheron (FT)", price: 35000, file: "Souvenir AWP _ Acheron (Field-Tested).webp" },
    { name: "Souvenir SSG 08 | Detour (FT)", price: 65000, file: "Souvenir SSG 08 _ Detour (Field-Tested).webp" },
    { name: "Souvenir Sawed-Off | Amber Fade (MW)", price: 55000, file: "Souvenir Sawed-Off _ Amber Fade (Minimal Wear).webp" },
    { name: "StatTrak™ Desert Eagle | Blue Ply (FT)", price: 28000, file: "StatTrak™ Desert Eagle _ Blue Ply (Field-Tested).webp" },
    { name: "StatTrak™ Desert Eagle | Blue Ply (MW)", price: 32000, file: "StatTrak™ Desert Eagle _ Blue Ply (Minimal Wear).webp" },
    { name: "StatTrak™ Desert Eagle | Blue Ply (BS)", price: 22000, file: "StatTrak™ Desert Eagle _ Blue Ply (Battle-Scarred).webp" },
    { name: "StatTrak™ Desert Eagle | Blue Ply (WW)", price: 25000, file: "StatTrak™ Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "StatTrak™ Glock-18 | Oxide Blaze (FT)", price: 18000, file: "StatTrak™ Glock-18 _ Oxide Blaze (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Catacombs (FT)", price: 15000, file: "StatTrak™ Glock-18 _ Catacombs (Field-Tested).webp" },
    { name: "StatTrak™ M4A1-S | Briefing (FT)", price: 45000, file: "StatTrak™ M4A1-S _ Briefing (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Magnesium (WW)", price: 38000, file: "StatTrak™ M4A4 _ Magnesium (Well-Worn).webp" },
    { name: "StatTrak™ AK-47 | Uncharted (FT)", price: 35000, file: "StatTrak™ AK-47 _ Uncharted (Field-Tested).webp" },
    { name: "StatTrak™ AWP | Capillary (FT)", price: 25000, file: "StatTrak™ AWP _ Capillary (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Grim (MW)", price: 22000, file: "StatTrak™ P90 _ Grim (Minimal Wear).webp" },
    { name: "StatTrak™ P90 | Grim (FT)", price: 18000, file: "StatTrak™ P90 _ Grim (Field-Tested).webp" },
    { name: "StatTrak™ R8 Revolver | Crimson Web (FT)", price: 32000, file: "StatTrak™ R8 Revolver _ Crimson Web (Field-Tested).webp" },
    { name: "StatTrak™ SSG 08 | Mainframe 001 (FT)", price: 12000, file: "StatTrak™ SSG 08 _ Mainframe 001 (Field-Tested).webp" },
    { name: "StatTrak™ USP-S | PC-GRN (MW)", price: 55000, file: "StatTrak™ USP-S _ PC-GRN (Minimal Wear).webp" },
    { name: "StatTrak™ Desert Eagle | Oxide Blaze (WW)", price: 15000, file: "StatTrak™ Desert Eagle _ Oxide Blaze (Well-Worn).webp" },
    { name: "StatTrak™ MP9 | Bioleak (FT)", price: 9000, file: "StatTrak™ MP9 _ Bioleak (Field-Tested).webp" },
    { name: "AK-47 | Elite Build (FT)", price: 18000, file: "AK-47 _ Elite Build (Field-Tested).webp" },
    { name: "AK-47 | Elite Build (BS)", price: 14000, file: "AK-47 _ Elite Build (Battle-Scarred).webp" },
    { name: "AK-47 | Elite Build (WW)", price: 16000, file: "AK-47 _ Elite Build (Well-Worn).webp" },
    { name: "AK-47 | Steel Delta (FT)", price: 24000, file: "AK-47 _ Steel Delta (Field-Tested).webp" },
    { name: "AK-47 | Uncharted (FT)", price: 8000, file: "AK-47 _ Uncharted (Field-Tested).webp" },
    { name: "AK-47 | Uncharted (MW)", price: 11000, file: "AK-47 _ Uncharted (Minimal Wear).webp" },
    { name: "AWP | Acheron (FT)", price: 18000, file: "AWP _ Acheron (Field-Tested).webp" },
    { name: "AWP | Acheron (BS)", price: 14000, file: "AWP _ Acheron (Battle-Scarred).webp" },
    { name: "AWP | Acheron (WW)", price: 16000, file: "AWP _ Acheron (Well-Worn).webp" },
    { name: "AWP | Capillary (FT)", price: 9000, file: "AWP _ Capillary (Field-Tested).webp" },
    { name: "AWP | Capillary (MW)", price: 13000, file: "AWP _ Capillary (Minimal Wear).webp" },
    { name: "CZ75-Auto | Circaetus (MW)", price: 8500, file: "CZ75-Auto _ Circaetus (Minimal Wear).webp" },
    { name: "Desert Eagle | Blue Ply (FT)", price: 4500, file: "Desert Eagle _ Blue Ply (Field-Tested).webp" },
    { name: "Desert Eagle | Blue Ply (MW)", price: 6000, file: "Desert Eagle _ Blue Ply (Minimal Wear).webp" },
    { name: "Desert Eagle | Blue Ply (WW)", price: 5000, file: "Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "Desert Eagle | Calligraffiti (WW)", price: 14000, file: "Desert Eagle _ Calligraffiti (Well-Worn).webp" },
    { name: "Desert Eagle | Mint Fan (BS)", price: 11000, file: "Desert Eagle _ Mint Fan (Battle-Scarred).webp" },
    { name: "FAMAS | 2A2F (FT)", price: 6500, file: "FAMAS _ 2A2F (Field-Tested).webp" },
    { name: "FAMAS | Survivor Z (FT)", price: 7500, file: "FAMAS _ Survivor Z (Field-Tested).webp" },
    { name: "Galil AR | Rocket Pop (FT)", price: 12000, file: "Galil AR _ Rocket Pop (Field-Tested).webp" },
    { name: "Galil AR | Rocket Pop (BS)", price: 8000, file: "Galil AR _ Rocket Pop (Battle-Scarred).webp" },
    { name: "Galil AR | Rocket Pop (WW)", price: 10000, file: "Galil AR _ Rocket Pop (Well-Worn).webp" },
    { name: "Glock-18 | Bunsen Burner (FT)", price: 4500, file: "Glock-18 _ Bunsen Burner (Field-Tested).webp" },
    { name: "Glock-18 | Candy Apple (FT)", price: 9000, file: "Glock-18 _ Candy Apple (Field-Tested).webp" },
    { name: "Glock-18 | Candy Apple (MW)", price: 12000, file: "Glock-18 _ Candy Apple (Minimal Wear).webp" },
    { name: "Glock-18 | Coral Bloom (FT)", price: 7000, file: "Glock-18 _ Coral Bloom (Field-Tested).webp" },
    { name: "Glock-18 | Reactor (WW)", price: 45000, file: "Glock-18 _ Reactor (Well-Worn).webp" },
    { name: "M4A1-S | Briefing (BS)", price: 15000, file: "M4A1-S _ Briefing (Battle-Scarred).webp" },
    { name: "M4A1-S | VariCamo (FT)", price: 14000, file: "M4A1-S _ VariCamo (Field-Tested).webp" },
    { name: "M4A1-S | VariCamo (MW)", price: 18000, file: "M4A1-S _ VariCamo (Minimal Wear).webp" },
    { name: "M4A4 | Choppa (MW)", price: 34000, file: "M4A4 _ Choppa (Minimal Wear).webp" },
    { name: "M4A4 | Converter (MW)", price: 21000, file: "M4A4 _ Converter (Minimal Wear).webp" },
    { name: "M4A4 | Magnesium (BS)", price: 4000, file: "M4A4 _ Magnesium (Battle-Scarred).webp" },
    { name: "M4A4 | Magnesium (MW)", price: 7500, file: "M4A4 _ Magnesium (Minimal Wear).webp" },
    { name: "MAC-10 | Ultraviolet (FT)", price: 6000, file: "MAC-10 _ Ultraviolet (Field-Tested).webp" },
    { name: "MP9 | Bioleak (FT)", price: 3500, file: "MP9 _ Bioleak (Field-Tested).webp" },
    { name: "MP9 | Bioleak (MW)", price: 5000, file: "MP9 _ Bioleak (Minimal Wear).webp" },
    { name: "MP9 | Bioleak (WW)", price: 4000, file: "MP9 _ Bioleak (Well-Worn).webp" },
    { name: "R8 Revolver | Blaze (MW)", price: 68000, file: "R8 Revolver _ Blaze (Minimal Wear).webp" },
    { name: "R8 Revolver | Crimson Web (FT)", price: 22000, file: "R8 Revolver _ Crimson Web (Field-Tested).webp" },
    { name: "SG 553 | Anodized Navy (FN)", price: 145000, file: "SG 553 _ Anodized Navy (Factory New).webp" },
    { name: "SSG 08 | Abyss (BS)", price: 4500, file: "SSG 08 _ Abyss (Battle-Scarred).webp" },
    { name: "SSG 08 | Abyss (FT)", price: 6500, file: "SSG 08 _ Abyss (Field-Tested).webp" },
    { name: "SSG 08 | Abyss (WW)", price: 5500, file: "SSG 08 _ Abyss (Well-Worn).webp" },
    { name: "SSG 08 | Acid Fade (FN)", price: 35000, file: "SSG 08 _ Acid Fade (Factory New).webp" },
    { name: "Tec-9 | Isaac (BS)", price: 12000, file: "Tec-9 _ Isaac (Battle-Scarred).webp" },
    { name: "USP-S | Alpine Camo (BS)", price: 10000, file: "USP-S _ Alpine Camo (Battle-Scarred).webp" },
    { name: "USP-S | Alpine Camo (FT)", price: 15000, file: "USP-S _ Alpine Camo (Field-Tested).webp" },
    { name: "USP-S | Alpine Camo (MW)", price: 19000, file: "USP-S _ Alpine Camo (Minimal Wear).webp" },
    { name: "USP-S | Blueprint (WW)", price: 52000, file: "USP-S _ Blueprint (Well-Worn).webp" },
    { name: "USP-S | Stainless (BS)", price: 35000, file: "USP-S _ Stainless (Battle-Scarred).webp" },
    { name: "USP-S | Tropical Breeze (MW)", price: 42000, file: "USP-S _ Tropical Breeze (Minimal Wear).webp" }
];

const StatTrakSkins = [
    { name: "StatTrak™ Zeus x27 | Olympus (FT)", price: 215000, file: "StatTrak™ Zeus x27 _ Olympus (Field-Tested).webp" },
    { name: "StatTrak™ AWP | Duality (FT)", price: 185000, file: "StatTrak™ AWP _ Duality (Field-Tested).webp" },
    { name: "StatTrak™ M4A1-S | Night Terror (FT)", price: 125000, file: "StatTrak™ M4A1-S _ Night Terror (Field-Tested).webp" },
    { name: "StatTrak™ P250 | Visions (FT)", price: 115000, file: "StatTrak™ P250 _ Visions (Field-Tested).webp" },
    { name: "StatTrak™ M4A4 | Tooth Fairy (FT)", price: 95000, file: "StatTrak™ M4A4 _ Tooth Fairy (Field-Tested).webp" },
    { name: "StatTrak™ FAMAS | Rapid Eye Movement (MW)", price: 85000, file: "StatTrak™ FAMAS _ Rapid Eye Movement (Minimal Wear).webp" },
    { name: "StatTrak™ AWP | Phobos (FT)", price: 75000, file: "StatTrak™ AWP _ Phobos (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Umbral Rabbit (FT)", price: 65000, file: "StatTrak™ Glock-18 _ Umbral Rabbit (Field-Tested).webp" },
    { name: "StatTrak™ M4A1-S | Flashback (FT)", price: 55000, file: "StatTrak™ M4A1-S _ Flashback (Field-Tested).webp" },
    { name: "StatTrak™ AUG | Stymphalian (FT)", price: 48000, file: "StatTrak™ AUG _ Stymphalian (Field-Tested).webp" },
    { name: "StatTrak™ AWP | Worm God (FT)", price: 42000, file: "StatTrak™ AWP _ Worm God (Field-Tested).webp" },
    { name: "StatTrak™ CZ75-Auto | Circaetus (MW)", price: 38000, file: "StatTrak™ CZ75-Auto _ Circaetus (Minimal Wear).webp" },
    { name: "StatTrak™ Glock-18 | Shinobu (BS)", price: 35000, file: "StatTrak™ Glock-18 _ Shinobu (Battle-Scarred).webp" },
    { name: "StatTrak™ P250 | X-Ray (FT)", price: 32000, file: "StatTrak™ P250 _ X-Ray (Field-Tested).webp" },
    { name: "StatTrak™ SG 553 | Dragon Tech (FT)", price: 28000, file: "StatTrak™ SG 553 _ Dragon Tech (Field-Tested).webp" },
    { name: "StatTrak™ Desert Eagle | Bronze Deco (FT)", price: 25000, file: "StatTrak™ Desert Eagle _ Bronze Deco (Field-Tested).webp" },
    { name: "StatTrak™ MAC-10 | Saibā Oni (FT)", price: 22000, file: "StatTrak™ MAC-10 _ Saibā Oni (Field-Tested).webp" },
    { name: "StatTrak™ MP9 | Goo (FT)", price: 18000, file: "StatTrak™ MP9 _ Goo (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Oxide Blaze (FT)", price: 15000, file: "StatTrak™ Glock-18 _ Oxide Blaze (Field-Tested).webp" },
    { name: "StatTrak™ P250 | Cyber Shell (FT)", price: 12000, file: "StatTrak™ P250 _ Cyber Shell (Field-Tested).webp" },
    { name: "StatTrak™ AUG | Tom Cat (FN)", price: 10000, file: "StatTrak™ AUG _ Tom Cat (Factory New).webp" },
    { name: "StatTrak™ Galil AR | Control (FT)", price: 45000, file: "StatTrak™ Galil AR _ Control (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Warhawk (MW)", price: 14000, file: "StatTrak™ Glock-18 _ Warhawk (Minimal Wear).webp" },
    { name: "StatTrak™ MAG-7 | Insomnia (MW)", price: 52000, file: "StatTrak™ MAG-7 _ Insomnia (Minimal Wear).webp" },
    { name: "StatTrak™ SSG 08 | Dezastre (MW)", price: 35000, file: "StatTrak™ SSG 08 _ Dezastre (Minimal Wear).webp" },
    { name: "StatTrak™ USP-S | Blood Tiger (FT)", price: 42000, file: "StatTrak™ USP-S _ Blood Tiger (Field-Tested).webp" },
    { name: "StatTrak™ AUG | Trigger Discipline (MW)", price: 15000, file: "StatTrak™ AUG _ Trigger Discipline (Minimal Wear).webp" },
    { name: "StatTrak™ AWP | Capillary (MW)", price: 28000, file: "StatTrak™ AWP _ Capillary (Minimal Wear).webp" },
    { name: "StatTrak™ CZ75-Auto | Crimson Web (FT)", price: 12000, file: "StatTrak™ CZ75-Auto _ Crimson Web (Field-Tested).webp" },
    { name: "StatTrak™ CZ75-Auto | Pole Position (FT)", price: 9000, file: "StatTrak™ CZ75-Auto _ Pole Position (Field-Tested).webp" },
    { name: "StatTrak™ Desert Eagle | Blue Ply (WW)", price: 11000, file: "StatTrak™ Desert Eagle _ Blue Ply (Well-Worn).webp" },
    { name: "StatTrak™ Dual Berettas | Dualing Dragons (WW)", price: 7500, file: "StatTrak™ Dual Berettas _ Dualing Dragons (Well-Worn).webp" },
    { name: "StatTrak™ FAMAS | Meow 36 (MW)", price: 13000, file: "StatTrak™ FAMAS _ Meow 36 (Minimal Wear).webp" },
    { name: "StatTrak™ Five-SeveN | Flame Test (BS)", price: 4000, file: "StatTrak™ Five-SeveN _ Flame Test (Battle-Scarred).webp" },
    { name: "StatTrak™ Galil AR | Akoben (FT)", price: 8500, file: "StatTrak™ Galil AR _ Akoben (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Bunsen Burner (MW)", price: 18000, file: "StatTrak™ Glock-18 _ Bunsen Burner (Minimal Wear).webp" },
    { name: "StatTrak™ Glock-18 | Warhawk (FT)", price: 6000, file: "StatTrak™ Glock-18 _ Warhawk (Field-Tested).webp" },
    { name: "StatTrak™ Glock-18 | Winterized (MW)", price: 11000, file: "StatTrak™ Glock-18 _ Winterized (Minimal Wear).webp" },
    { name: "StatTrak™ M4A1-S | Liquidation (FT)", price: 45000, file: "StatTrak™ M4A1-S _ Liquidation (Field-Tested).webp" },
    { name: "StatTrak™ MAC-10 | Allure (WW)", price: 14000, file: "StatTrak™ MAC-10 _ Allure (Well-Worn).webp" },
    { name: "StatTrak™ MAC-10 | Carnivore (FT)", price: 5000, file: "StatTrak™ MAC-10 _ Carnivore (Field-Tested).webp" },
    { name: "StatTrak™ MAG-7 | Hard Water (MW)", price: 9000, file: "StatTrak™ MAG-7 _ Hard Water (Minimal Wear).webp" },
    { name: "StatTrak™ MP9 | Bioleak (FT)", price: 7000, file: "StatTrak™ MP9 _ Bioleak (Field-Tested).webp" },
    { name: "StatTrak™ MP9 | Sand Scale (FT)", price: 4500, file: "StatTrak™ MP9 _ Sand Scale (Field-Tested).webp" },
    { name: "StatTrak™ Negev | Dazzle (FT)", price: 3500, file: "StatTrak™ Negev _ Dazzle (Field-Tested).webp" },
    { name: "StatTrak™ Nova | Rising Sun (BS)", price: 16000, file: "StatTrak™ Nova _ Rising Sun (Battle-Scarred).webp" },
    { name: "StatTrak™ P250 | Cassette (FN)", price: 12000, file: "StatTrak™ P250 _ Cassette (Factory New).webp" },
    { name: "StatTrak™ P250 | Epicenter (FT)", price: 19000, file: "StatTrak™ P250 _ Epicenter (Field-Tested).webp" },
    { name: "StatTrak™ P250 | Valence (FT)", price: 5500, file: "StatTrak™ P250 _ Valence (Field-Tested).webp" },
    { name: "StatTrak™ P250 | Valence (BS)", price: 4000, file: "StatTrak™ P250 _ Valence (Battle-Scarred).webp" },
    { name: "StatTrak™ P250 | Wingshot (FT)", price: 21000, file: "StatTrak™ P250 _ Wingshot (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Cocoa Rampage (MW)", price: 8000, file: "StatTrak™ P90 _ Cocoa Rampage (Minimal Wear).webp" },
    { name: "StatTrak™ P90 | Cocoa Rampage (FT)", price: 6000, file: "StatTrak™ P90 _ Cocoa Rampage (Field-Tested).webp" },
    { name: "StatTrak™ P90 | Neoqueen (FT)", price: 32000, file: "StatTrak™ P90 _ Neoqueen (Field-Tested).webp" },
    { name: "StatTrak™ SG 553 | Aloha (MW)", price: 5000, file: "StatTrak™ SG 553 _ Aloha (Minimal Wear).webp" },
    { name: "StatTrak™ SG 553 | Cyberforce (MW)", price: 28000, file: "StatTrak™ SG 553 _ Cyberforce (Minimal Wear).webp" },
    { name: "StatTrak™ SG 553 | Darkwing (FT)", price: 14000, file: "StatTrak™ SG 553 _ Darkwing (Field-Tested).webp" },
    { name: "StatTrak™ SG 553 | Dragon Tech (WW)", price: 17000, file: "StatTrak™ SG 553 _ Dragon Tech (Well-Worn).webp" },
    { name: "StatTrak™ SSG 08 | Abyss (WW)", price: 11000, file: "StatTrak™ SSG 08 _ Abyss (Well-Worn).webp" },
    { name: "StatTrak™ SSG 08 | Memorial (MW)", price: 9000, file: "StatTrak™ SSG 08 _ Memorial (Minimal Wear).webp" },
    { name: "StatTrak™ Tec-9 | Fubar (FT)", price: 5500, file: "StatTrak™ Tec-9 _ Fubar (Field-Tested).webp" },
    { name: "StatTrak™ Tec-9 | Snek-9 (MW)", price: 15000, file: "StatTrak™ Tec-9 _ Snek-9 (Minimal Wear).webp" },
    { name: "StatTrak™ UMP-45 | Arctic Wolf (FT)", price: 22000, file: "StatTrak™ UMP-45 _ Arctic Wolf (Field-Tested).webp" },
    { name: "StatTrak™ UMP-45 | Riot (FT)", price: 4000, file: "StatTrak™ UMP-45 _ Riot (Field-Tested).webp" },
    { name: "StatTrak™ XM1014 | Scumbria (MW)", price: 8000, file: "StatTrak™ XM1014 _ Scumbria (Minimal Wear).webp" },
    { name: "StatTrak™ XM1014 | Zombie Offensive (MW)", price: 18000, file: "StatTrak™ XM1014 _ Zombie Offensive (Minimal Wear).webp" },
    { name: "StatTrak™ Zeus x27 | Tosai (BS)", price: 7000, file: "StatTrak™ Zeus x27 _ Tosai (Battle-Scarred).webp" }
];
const caseInventory = {
    "Tactical": TacticalSkins,
    "Spectrum": SpectrumSkins,
    "Clutch": ClutchSkins,
    "Urban": UrbanSkins,
    "All_in": All_inSkins,
    "Military": MilitarySkins,
    "SMG": SMGSkins,
    "Carbon_fiber": Carbon_fiberSkins,
    "Armory": ArmorySkins,
    "StatTrack": StatTrakSkins
};

const topupPackages = {
    uzs: [
        { amount: 25000, price: "22 500 UZS" },
        { amount: 62500, price: "56 250 UZS", badge: "Хит 🔥" },
        { amount: 125000, price: "112 500 UZS" },
        { amount: 312500, price: "281 250 UZS" },
        { amount: 625000, price: "562 500 UZS" },
        { amount: 1250000, price: "1 125 000 UZS" },
        { amount: 2000000, price: "1 800 000 UZS" },
        { amount: 4375000, price: "3 937 500 UZS" },
        { amount: 6250000, price: "5 625 000 UZS" },
        { amount: 12500000, price: "11 250 000 UZS" },
        { amount: 15000000, price: "13 500 000 UZS" }
    ],
    usd: [
        { amount: 25000, price: "1.8 $" },
        { amount: 62500, price: "4.05 $", badge: "Хит 🔥" },
        { amount: 125000, price: "7.8 $" },
        { amount: 312500, price: "18.75 $" },
        { amount: 625000, price: "37.5 $" },
        { amount: 1250000, price: "75 $" },
        { amount: 4375000, price: "262.5 $" },
        { amount: 12500000, price: "750 $" }
    ]
};
// Siz bergan to'liq tarjimalar
const translations = {
    uz: { 
        topup: "TO'LDIRISH", cases_title: "KEYS", active_tasks: "FAOL VAZIFALAR", completed: "BAJARILGAN", 
        inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Keyslar", nav_inv: "Invertar", 
        nav_profile: "Profile", select_lang: "Tilni tanlang:", trade_link: "Steam Trade Link:", 
        save_btn: "SAQLASH", claim_btn: "OLISH", done_btn: "BAJARILDI", balance_desc: "Sizning balansingiz", 
        bonus_title: "DOIMIY BONUSLAR", daily_reward: "Kunlik mukofot", daily_desc: "+50 dan 5000 COINgacha", 
        referral_title: "Do'stlarni taklif qilish", referral_desc: "Har bir do'st uchun +500 COIN", 
        nick_title: "Nikga bot nomini qo'shish", nick_desc: "Har 24 soatda +50 COIN", link_btn: "LINK", check_btn: "TEKSHIRISH" 
    },
    ru: { 
        topup: "ПОПОЛНИТЬ", cases_title: "КЕЙСЫ", active_tasks: "ЗАДАНИЯ", completed: "ВЫПОЛНЕНО", 
        inventory_title: "ИНВЕНТАРЬ", nav_bonus: "Бонус", nav_cases: "Кейсы", nav_inv: "Инвентарь", 
        nav_profile: "Профиль", select_lang: "Выберите язык:", trade_link: "Steam Trade Link:", 
        save_btn: "СОХРАНИТЬ", claim_btn: "ПОЛУЧИТЬ", done_btn: "ВЫПОЛНЕНО", balance_desc: "Ваш баланс", 
        bonus_title: "ПОСТОЯННЫЕ БОНУСЫ", daily_reward: "Ежедневная награда", daily_desc: "От 50 до 5000 COIN", 
        referral_title: "Пригласить друзей", referral_desc: "За каждого друга +500 COIN", 
        nick_title: "Добавить имя бота", nick_desc: "Каждые 24 часа +50 COIN", link_btn: "ССЫЛКА", check_btn: "ПРОВЕРИТЬ" 
    },
    en: { 
        topup: "TOP UP", cases_title: "CASES", active_tasks: "ACTIVE TASKS", completed: "COMPLETED", 
        inventory_title: "INVENTORY", nav_bonus: "Bonus", nav_cases: "Cases", nav_inv: "Inventory", 
        nav_profile: "Profile", select_lang: "Select Language:", trade_link: "Steam Trade Link:", 
        save_btn: "SAVE", claim_btn: "CLAIM", done_btn: "DONE", balance_desc: "Your balance", 
        bonus_title: "DAILY BONUSES", daily_reward: "Daily Reward", daily_desc: "+50 to 5000 COIN", 
        referral_title: "Invite Friends", referral_desc: "Per friend +500 COIN", 
        nick_title: "Add Bot Name to Nick", nick_desc: "Every 24h +50 COIN", link_btn: "LINK", check_btn: "CHECK" 
    }
};

let tasks = [
    { id: 'tg', name: {uz: "Telegram Obuna", ru: "Подписка Telegram", en: "Join Telegram"}, reward: 250, done: false, link: 'https://t.me/community' },
    { id: 'insta', name: {uz: "Instagram Obuna", ru: "Подписка Instagram", en: "Follow Instagram"}, reward: 250, done: false, link: 'https://instagram.com/' }
];
// ==========================================
// 2. FUNKSIYALAR
// ==========================================

function getSkinImg(skin) {
    // Agar skin obyektida folder bo'lsa, o'shani ishlatadi. 
    // Faqat u umuman bo'lmagan holatdagina xato bermasligi uchun birorta papkani ko'rsatish kerak.
    const folder = skin.folder || 'Tactical'; 
    return `${folder}/${skin.file}`;
}

function setLanguage(lang) {
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) el.innerText = translations[lang][key];
    });
    renderCases();
    renderTasks();
}

function showPage(pageId, element) {
    // 1. Hamma sahifalarni yashirish
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });

    // 2. Tanlangan sahifani ko'rsatish
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 3. --- HEADER VA TO'LDIRISHNI FAQAT BONUSDA KO'RSATISH ---
    const mainHeader = document.getElementById('main-header'); // Header konteyneri
    const topupBtn = document.querySelector('.btn-topup') || document.querySelector('.topup-btn-header');

    if (pageId === 'bonus') {
        // Bonus sahifasida Header va Tugmani qaytaramiz
        if (mainHeader) mainHeader.style.display = 'flex';
        if (topupBtn) topupBtn.style.setProperty('display', 'block', 'important');
    } else {
        // Keys, Inventar va Profil qismlarida to'ldirish funksiyasini butunlay yashiramiz
        // Agar siz balans ham ko'rinmasligini xohlasangiz:
        if (mainHeader) mainHeader.style.display = 'none'; 
        
        // Agar balans qolsin, faqat tugma yo'qolsin desangiz, tepadagi qatorni o'chirib, buni ishlating:
        if (topupBtn) topupBtn.style.setProperty('display', 'none', 'important');
    }

    // 4. Navigatsiya tugmalarini yangilash
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if (element && element.classList.contains('nav-btn')) {
        element.classList.add('active');
    }

    // 5. Kerakli sahifani render qilish
    if (pageId === 'topup-uzs') renderTopup('uzs');
    if (pageId === 'topup-usd') renderTopup('usd');
    if (pageId === 'cases') renderCases();
    if (pageId === 'bonus') renderTasks();
    if (pageId === 'inventory') renderInventory();

    updateUIBalance();
}
function showCasePreview(caseId) {
    const selectedCase = cases.find(c => c.id === caseId);
    const skins = caseInventory[caseId];
    const lang = localStorage.getItem('lang') || 'uz';
    
    if (!selectedCase || !skins) return;

    document.getElementById('preview-case-img').src = selectedCase.img;
    document.getElementById('preview-case-name').innerText = selectedCase.name[lang];
    
    const openBtn = document.getElementById('preview-open-btn');
    openBtn.onclick = () => {
        closePreview();
        startRoulette(caseId);
    };
    
    // Tugma ichiga ham kristall belgisini qo'shish mumkin
    openBtn.innerHTML = lang === 'uz' ? `OCHISH - ${selectedCase.price} 💎` : `ОТКРЫТЬ - ${selectedCase.price} 💎`;

    const skinsGrid = document.getElementById('preview-skins-grid');
    skinsGrid.innerHTML = "";
    
    skins.forEach(skin => {
        skinsGrid.innerHTML += `
            <div class="preview-skin-item ${getRarityClass(skin.price)}">
                <img src="${selectedCase.folder}/${skin.file}" onerror="this.src='img/case1.png'">
                <p class="skin-name-text">${skin.name}</p>
                ${getPriceTagHTML(skin.price)}
            </div>`;
    });

    document.getElementById('preview-modal').style.display = 'flex';
}

function closePreview() {
    const modal = document.getElementById('preview-modal');
    if (modal) modal.style.display = 'none';
}

function updateUIBalance() {
    window.Telegram.WebApp.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? val : "10000";
        if(document.getElementById('balance')) document.getElementById('balance').innerText = bal;
        if(document.getElementById('balance-large')) document.getElementById('balance-large').innerText = bal;
    });
}

function updateBalance(amount) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        tg.CloudStorage.setItem('userBalance', (bal + amount).toString());
        updateUIBalance();
    });
}

function addToInventory(item) {
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        
        // Skin obyektiga rasm manzili to'g'ri chiqishi uchun folder ma'lumotini qo'shamiz
        // Agar item ichida folder bo'lmasa, demak u joriy ochilgan keysdan olinadi
        inv.push(item);
        
        tg.CloudStorage.setItem('inventory', JSON.stringify(inv), (err) => {
            if (err) console.error("Inventarga saqlashda xato:", err);
            else console.log("Skin inventarga saqlandi:", item.name);
        });
    });
}

function renderCases() {
    const grid = document.getElementById('cases-grid');
    if (!grid) return;
    grid.innerHTML = "";
    const lang = localStorage.getItem('lang') || 'uz';

    cases.forEach(c => {
        grid.innerHTML += `
            <div class="case-card" onclick="showCasePreview('${c.id}')">
                <img src="${c.img}" class="case-img" onerror="this.src='img/case1.jpg'">
                <div class="case-info-overlay">
                    <p class="case-name">${c.name[lang]}</p>
                    <div class="case-buy-btn">
                        <img src="img/nav_diamond.png" alt="coin">
                        <span>${c.price.toLocaleString()}</span>
                    </div>
                </div>
            </div>`;
    });
}

function renderInventory() {
    const grid = document.getElementById('inventory-grid');
    if (!grid) {
        console.error("Xato: inventory-grid elementi topilmadi!");
        return;
    }
    
    // Yuklanish holati
    grid.innerHTML = '<p style="text-align:center; width:100%;">Yuklanmoqda...</p>';
    
    // Telegram CloudStorage-dan ma'lumot olish
    window.Telegram.WebApp.CloudStorage.getItem('inventory', (err, val) => {
        if (err) {
            console.error("CloudStorage xatosi:", err);
            grid.innerHTML = '<p style="text-align:center; width:100%;">Maʼlumotni yuklab boʻlmadi.</p>';
            return;
        }

        let inv = val ? JSON.parse(val) : [];
        console.log("Inventar ma'lumotlari yuklandi:", inv);

        if (inv.length === 0) {
            grid.innerHTML = '<p style="text-align:center; width:100%; color:#777;">Inventar boʻsh</p>';
            return;
        }

        grid.innerHTML = ""; // Yuklanmoqda yozuvini tozalash
        
        inv.forEach((item, index) => {
            // Sokin papkasi va rasm yo'li
            const skinFolder = item.folder || 'Tactical';
            const imgPath = `${skinFolder}/${item.file}`;
            
            // Yordamchi funksiyalar mavjudligini tekshirish (ReferenceError oldini olish)
            const rarity = (typeof getRarityClass === 'function') ? getRarityClass(item.price) : 'rarity-common';
            const priceTag = (typeof getPriceTagHTML === 'function') ? getPriceTagHTML(item.price) : `<span>${item.price}</span>`;

            // HTML yaratish
            grid.innerHTML += `
                <div class="preview-skin-item ${rarity}">
                    <span class="wishlist-heart">♡</span>
                    <img src="${imgPath}" onerror="this.src='img/case1.png'">
                    <p class="skin-name-text">${item.name}</p>
                    ${priceTag}
                    <button onclick="withdrawItem(${index})" style="margin-top:10px; width:100%; font-size:10px; background:#2ecc71 !important;">STEAM</button>
                </div>`;
        });
    });
}

function sellAllInventory() {
    window.Telegram.WebApp.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        if(inv.length === 0) return alert("Inventar bo'sh!");
        let total = inv.reduce((sum, i) => sum + i.price, 0);
        updateBalance(total);
        window.Telegram.WebApp.CloudStorage.setItem('inventory', '[]');
        renderInventory();
        alert("Barchasi sotildi: +" + total + " COIN");
    });
}

// Eski startRoulette funksiyasini mana bu openCase funksiyasi bilan almashtiring
function startRoulette(caseId) {
    window.appData.currentCaseId = caseId;
    const selectedCase = cases.find(c => c.id === caseId);
    const possibleSkins = caseInventory[caseId];

    if (!selectedCase || !possibleSkins) return;

    // Balansni tekshirish (CloudStorage dan)
    window.Telegram.WebApp.CloudStorage.getItem('userBalance', (err, val) => {
        let bal = val ? parseInt(val) : 10000;
        if (bal < selectedCase.price) {
            alert(`Mablag' yetarli emas!`);
            return;
        }

        // Balansni ayirish
        updateBalance(-selectedCase.price);

        const modal = document.getElementById('roulette-modal');
        const track = document.getElementById('roulette-track');
        const viewport = document.getElementById('roulette-viewport');
        const resultDisplay = document.getElementById('result-display');
        
        // 1. Ruletkani tozalash va tayyorlash
        modal.style.display = 'flex';
        viewport.style.display = 'block';
        resultDisplay.style.display = 'none';
        track.style.transition = 'none';
        track.style.transform = 'translateY(0)';

        // 2. Skinlarni generatsiya qilish (60 ta)
        let rouletteSkins = [];
        for (let i = 0; i < 60; i++) {
            const randomSkin = possibleSkins[Math.floor(Math.random() * possibleSkins.length)];
            rouletteSkins.push(randomSkin);
        }

        // 3. HTML ga chiqarish
        track.innerHTML = rouletteSkins.map(skin => `
            <div class="roulette-item">
                <img src="${selectedCase.folder}/${skin.file}" onerror="this.src='img/case1.png'">
            </div>
        `).join('');

        // 4. Hisob-kitob (Vertikal aylanish)
        const winningIndex = 50; // 50-chi skin yutadi
        const itemHeight = 150;  // CSS dagi .roulette-item balandligi
        const viewportHeight = 455; // CSS dagi #roulette-viewport balandligi
        
        // Chiziq o'rtasiga tushish formulasi
        const stopPosition = (winningIndex * itemHeight) + (itemHeight / 2) - (viewportHeight / 2);

        // 5. Animatsiyani boshlash (12 soniya)
        setTimeout(() => {
            track.style.transition = 'transform 12s cubic-bezier(0.15, 0, 0.15, 1)';
            track.style.transform = `translateY(-${stopPosition}px)`;
        }, 100);

        // 6. Natijani ko'rsatish
        setTimeout(() => {
            const win = rouletteSkins[winningIndex];
            win.folder = selectedCase.folder;
            window.appData.currentWinningSkin = win;

            viewport.style.display = 'none';
            resultDisplay.style.display = 'block';
            
            document.getElementById('won-skin-img').src = `${win.folder}/${win.file}`;
            document.getElementById('won-skin-name').innerText = win.name;
            document.getElementById('won-skin-price').innerText = win.price.toLocaleString() + " COIN";
            
            addToInventory(win); // Avtomatik inventarga qo'shish
        }, 12100);
    });
}

function exitAndSave() {
    document.getElementById('roulette-modal').style.display = 'none';
    showPage('cases', document.querySelector('[onclick*="cases"]'));
}

// Boshlang'ich yuklash
document.addEventListener("DOMContentLoaded", () => {
    window.Telegram.WebApp.expand();
    const lang = localStorage.getItem('lang') || 'uz';
    setLanguage(lang);
    updateUIBalance();
});

// Kerakli bo'sh funksiyalar (xato bermasligi uchun)
function renderTasks() {}
function toggleTrade() {}
function withdrawItem() { alert("Steamga yuborildi!"); }
function toggleSettings() {
    const s = document.getElementById('settings-content');
    if(s) s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}

function toggleTradeSection() {
    const section = document.getElementById('trade-input-section');
    if(section) {
        section.style.display = (section.style.display === 'none') ? 'block' : 'none';
    }
}

// Vazifalar ro'yxatini chiqarish
function renderTasks() {
    const lang = localStorage.getItem('lang') || 'uz';
    const activeList = document.getElementById('active-tasks-list');
    const doneList = document.getElementById('done-tasks-list');
    
    if(!activeList || !doneList) return;
    
    activeList.innerHTML = ""; 
    doneList.innerHTML = "";
    
    tasks.forEach(t => {
        const btnText = t.done ? translations[lang].done_btn : translations[lang].claim_btn;
        const taskHtml = `
            <div class="task-card-pro">
                <div class="task-info-main">
                    <div class="task-icon-circle">📱</div>
                    <div class="task-text-content">
                        <h4>${t.name[lang]}</h4>
                        <p style="color: #2ecc71;">+${t.reward} COIN</p>
                    </div>
                </div>
                <button class="btn-action-pro" onclick="completeTask('${t.id}')">${btnText}</button>
            </div>`;
        
        if(t.done) {
            doneList.innerHTML += taskHtml;
        } else {
            activeList.innerHTML += taskHtml;
        }
    });
}
// To'ldirish (Top-up) qismida narxlarni ko'rsatish
function renderTopup(currency) {
    const container = document.getElementById(`${currency}-list`);
    if (!container) return;
    
    container.innerHTML = ""; 
    const packages = topupPackages[currency];

    packages.forEach(pkg => {
        let badgeHtml = pkg.badge ? `<span class="hit-badge">${pkg.badge}</span>` : '';
        
        // onclick qismi o'zgartirildi: endi u buyPackage funksiyasini chaqiradi
        container.innerHTML += `
            <div class="topup-row" onclick="buyPackage(${pkg.amount}, '${pkg.price}')">
                <div class="topup-left">
                    <img src="img/nav_diamond.png" class="topup-coin" style="width:18px; margin-right:10px;">
                    <span style="font-weight:bold;">${pkg.amount.toLocaleString()} COIN</span>
                    ${badgeHtml}
                </div>
                <div class="topup-right" style="color: #ffd700; font-weight:800;">${pkg.price}</div>
            </div>
        `;
    });
}
// Vazifani bajarish funksiyasi (Telegram/Instagram tugmasi bosilganda)
function completeTask(id) {
    const t = tasks.find(x => x.id === id);
    if (t && !t.done) {
        // Havolani ochish
        if(t.link) window.open(t.link, '_blank');
        
        // 5 soniyadan keyin bonusni berish (tekshirish simulyatsiyasi)
        setTimeout(() => {
            t.done = true;
            updateBalance(t.reward);
            renderTasks();
            alert(t.reward + " COIN hisobingizga qo'shildi!");
        }, 2000);
    }
}

// 1. Sotish tugmasi (Yutuqni balansga qaytaradi)
function sellWonSkin() {
    const win = window.appData.currentWinningSkin;
    if (!win) {
        console.error("Yutuq ma'lumoti topilmadi!");
        return;
    }

    // Balansni yangilash
    updateBalance(win.price);
    
    // Inventardan oxirgi qo'shilgan skinni olib tashlash (chunki u yutganda avto-qo'shiladi)
    const tg = window.Telegram.WebApp;
    tg.CloudStorage.getItem('inventory', (err, val) => {
        let inv = val ? JSON.parse(val) : [];
        if (inv.length > 0) {
            inv.pop(); // Oxirgi elementni o'chirish
            tg.CloudStorage.setItem('inventory', JSON.stringify(inv));
        }
    });

    // Modalni yopish va xabar berish
    document.getElementById('roulette-modal').style.display = 'none';
    alert(`Sotildi! +${win.price} COIN balansga qo'shildi.`);
}

// 2. Steam tugmasi (Yutuqni chiqarish simulyatsiyasi)
function withdrawWonSkin() {
    const win = window.appData.currentWinningSkin;
    if (!win) return;

    alert(`${win.name} Steam profilingizga yuborildi! (Trade Link tekshirilmoqda...)`);
    document.getElementById('roulette-modal').style.display = 'none';
}

// 3. Yana aylantirish tugmasi
function spinAgainAndSave() {
    // Joriy modalni yopish
    document.getElementById('roulette-modal').style.display = 'none';
    
    // Kichik tanaffus bilan ruletkani qayta ishga tushirish
    setTimeout(() => {
        if (window.appData.currentCaseId) {
            startRoulette(window.appData.currentCaseId);
        } else {
            showPage('cases');
        }
    }, 300);
}

// 4. Chiqish tugmasi
function exitAndSave() {
    document.getElementById('roulette-modal').style.display = 'none';
    showPage('cases');
}

// Buni app.js ning ochiq joyiga qo'ying
window.showCasePreview = function(caseId) {
    console.log("Bosilgan keys ID:", caseId);
    const selectedCase = cases.find(c => c.id === caseId);
    const skins = caseInventory[caseId];
    const lang = localStorage.getItem('lang') || 'uz';
    
    if (!selectedCase || !skins) return;

    const modal = document.getElementById('preview-modal');
    if (modal) {
        document.getElementById('preview-case-img').src = selectedCase.img;
        document.getElementById('preview-case-name').innerText = selectedCase.name[lang];
        
        const openBtn = document.getElementById('preview-open-btn');
        openBtn.onclick = () => {
            closePreview();
            startRoulette(caseId);
        };
        
        // Skinlarni chiqarish qismi...
        const skinsGrid = document.getElementById('preview-skins-grid');
        skinsGrid.innerHTML = "";
        skins.forEach(skin => {
            skinsGrid.innerHTML += `
                <div class="preview-skin-item">
                    <img src="${selectedCase.folder}/${skin.file}" style="width:60px;" onerror="this.src='img/case1.png'">
                    <p style="font-size:9px;">${skin.name}</p>
                </div>`;
        });

        modal.style.display = 'flex';
    }
};
