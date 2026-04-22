// audio.js
const sounds = {
    spin: new Audio('https://www.soundjay.com/buttons/button-50.mp3'),
    win: new Audio('https://www.soundjay.com/human/applause-01.mp3')
};

function playSound(type) {
    if (sounds[type]) {
        sounds[type].currentTime = 0; // Ovozni har doim boshidan boshlash
        sounds[type].play().catch(e => console.log("Ovoz bloklandi, ekranga tegish kerak."));
    }
}
