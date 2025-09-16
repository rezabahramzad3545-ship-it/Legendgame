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
// متغیرهای بازی
let score = 0;
let energy = 100;
let maxEnergy = 100;
let clickPower = 1;
let isDoubleEarning = false;
let doubleEarningEndTime = 0;

// انتظار برای آماده شدن Telegram Web App
window.Telegram.WebApp.ready();

// تابع کلیک روی کاراکتر
function handleClick() {
    if (energy >= clickPower) {
        // کاهش انرژی
        energy -= clickPower;
        
        // محاسبه امتیاز
        let earnedScore = clickPower;
        if (isDoubleEarning) {
            earnedScore *= 2;
        }
        
        // افزایش امتیاز
        score += earnedScore;
        
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
    } else {
        alert('انرژی کافی ندارید!');
    }
}

// تابع استفاده از بوست انرژی
function useEnergyBoost() {
    energy = maxEnergy;
    updateDisplay();
    alert('انرژی شما پر شد!');
}

// تابع استفاده از بوست درآمد مضاعف
function useDoubleBoost() {
    if (score >= 500) {
        score -= 500;
        isDoubleEarning = true;
        doubleEarningEndTime = Date.now() + (30 * 1000); // 30 ثانیه
        
        updateDisplay();
        alert('درآمد مضاعف فعال شد برای 30 ثانیه!');
        
        // غیرفعال کردن دکمه موقتاً
        const doubleBtn = document.getElementById('double-boost');
        doubleBtn.disabled = true;
        doubleBtn.textContent = '⏳ فعال (30s)';
        
        // چک کردن پایان بوست
        checkDoubleBoost();
    } else {
        alert('سکه کافی ندارید! (نیاز به 500🪙)');
    }
}

// تابع چک کردن پایان بوست
function checkDoubleBoost() {
    const interval = setInterval(() => {
        const timeLeft = Math.ceil((doubleEarningEndTime - Date.now()) / 1000);
        
        if (timeLeft <= 0) {
            isDoubleEarning = false;
            clearInterval(interval);
            const doubleBtn = document.getElementById('double-boost');
            doubleBtn.disabled = false;
            doubleBtn.textContent = '💰 درآمد مضاعف (500🪙)';
            alert('درآمد مضاعف به پایان رسید!');
        } else {
            const doubleBtn = document.getElementById('double-boost');
            doubleBtn.textContent = `⏳ فعال (${timeLeft}s)`;
        }
    }, 1000);
}

// تابع به‌روزرسانی نمایش
function updateDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('energy').textContent = energy;
    document.getElementById('max-energy').textContent = maxEnergy;
}

// تابع انیمیشن کلیک
function animateClick() {
    const character = document.getElementById('character');
    character.style.transform = 'scale(0.9)';
    setTimeout(() => {
        character.style.transform = 'scale(1)';
    }, 100);
}

// اضافه کردن ایونت لیسنرها
document.addEventListener('DOMContentLoaded', function() {
    // کلیک روی کاراکتر
    const character = document.getElementById('character');
    character.addEventListener('click', handleClick);
    
    // بوست‌ها
    document.getElementById('energy-boost').addEventListener('click', useEnergyBoost);
    document.getElementById('double-boost').addEventListener('click', useDoubleBoost);
    
    // نمایش اطلاعات اولیه
    updateDisplay();
    
    // افزایش انرژی خودکار
    setInterval(() => {
        if (energy < maxEnergy) {
            energy++;
            updateDisplay();
        }
    }, 1000);
});
// اضافه کردن این تابع
function inviteFriends() {
    // دریافت اطلاعات کاربر از تلگرام
    const user = window.Telegram.WebApp.initDataUnsafe.user;
    const userId = user ? user.id : 'unknown';
    
    // ساخت لینک دعوت
    const botUsername = 'your_bot_username'; // اسم یوزرنیم ربات خودتون رو بذارید
    const inviteLink = `https://t.me/${botUsername}?start=ref_${userId}`;
    
    // باز کردن لینک دعوت در تلگرام
    window.Telegram.WebApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent('به بازی جذاب من بپیوند!')}`);
}

// اضافه کردن این ایونت لیسنر در DOMContentLoaded
document.getElementById('invite-btn').addEventListener('click', inviteFriends);
