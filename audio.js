// audio.js fayli
const gameSounds = {
    spin: new Audio('audio/spin.mp3'),
    win: new Audio('audio/win.mp3')
};

function playSound(name) {
    if (gameSounds[name]) {
        gameSounds[name].currentTime = 0;
        gameSounds[name].play().catch(e => console.log("Ovoz o'ynalmadi:", e));
    }
}
