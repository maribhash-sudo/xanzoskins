// audio.js
const sounds = {
    spin: new Audio('https://actions.google.com/sounds/v1/ui/click.ogg'), // Ishonchliroq havola
    win: new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg')
};

function playSound(type) {
    let s = sounds[type];
    s.currentTime = 0;
    s.play().catch(e => {
        console.error("Ovoz chiqmayapti! Sababi: " + e.message);
        // Agar ovoz chiqmasa, konsolga xato yozadi
    });
}
