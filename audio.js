// audio.js
const sounds = {
    click: new Audio('https://www.soundjay.com/buttons/button-16.mp3'),
    spin: new Audio('https://www.soundjay.com/buttons/button-50.mp3'),
    win: new Audio('https://www.soundjay.com/human/applause-01.mp3')
};

function playSound(type) {
    if (sounds[type]) {
        sounds[type].currentTime = 0; // Ovozni boshidan boshlash
        sounds[type].play().catch(e => console.log("Ovoz bloklandi: Foydalanuvchi ekranga tegishi kerak"));
    }
}
