// متغیرهای بازی
let score = 0;
let energy = 100;
let maxEnergy = 100;
let clickPower = 1;

// انتظار برای آماده شدن Telegram Web App
window.Telegram.WebApp.ready();

// تابع کلیک روی کاراکتر
function handleClick() {
    if (energy >= clickPower) {
        // کاهش انرژی
        energy -= clickPower;
        // افزایش امتیاز
        score += clickPower;
        // به‌روزرسانی نمایش
        updateDisplay();
        // انیمیشن کلیک
        animateClick();
        // افزایش انرژی به صورت خودکار
        setTimeout(() => {
            if (energy < maxEnergy) {
                energy++;
                updateDisplay();
            }
        }, 1000);
    }
}

// تابع به‌روزرسانی نمایش
function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('energy').textContent = energy;
}

// تابع انیمیشن کلیک
function animateClick() {
    const character = document.getElementById('character');
    character.style.transform = 'scale(0.9)';
    setTimeout(() => {
        character.style.transform = 'scale(1)';
    }, 100);
}

// اضافه کردن ایونت لیسنر
document.addEventListener('DOMContentLoaded', function() {
    const character = document.getElementById('character');
    character.addEventListener('click', handleClick);
    
    // نمایش اطلاعات اولیه
    updateDisplay();
});
