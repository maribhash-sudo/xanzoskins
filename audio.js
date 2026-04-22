const sounds = {
    spin: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7306282998.mp3'),
    win: new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3')
};
function playSound(type) {
    sounds[type].currentTime = 0;
    sounds[type].play().catch(e => console.log("Audio bloklandi."));
}
