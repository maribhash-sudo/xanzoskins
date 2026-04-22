// audio.js - Yangilangan va ishonchli
const sounds = {
    // Ruletka aylanish ovozi (short click)
    spin: new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_7306282998.mp3'),
    // Yutuq ovozi (fanfare/success)
    win: new Audio('https://cdn.pixabay.com/audio/2021/08/04/audio_0625c1539c.mp3')
};

function playSound(type) {
    const s = sounds[type];
    if (!s) return;

    // Ovozni boshidan boshlash
    s.currentTime = 0;
    
    // Ovoz balandligini sozlash (ixtiyoriy)
    s.volume = 0.5;

    // Brauzer blokirovkasini chetlab o'tish uchun va'da (promise) bilan ishga tushiramiz
    const playPromise = s.play();

    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Ovoz bloklandi: Foydalanuvchi hali sahifaga tegmadi.");
        });
    }
}
