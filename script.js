// 🔧 DEV MODE (true = you can see & navigate all days)
const DEV_MODE = true; // ⚠️ SET TO false before sending her

const days = Array.from(document.querySelectorAll('.day'));
const popup = document.getElementById('popup');

let index = 0;

// Date logic
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

// Hide all days initially
function hideAll() {
  days.forEach(d => d.style.display = 'none');
}

// Show one day by index
function showDay(i) {
  hideAll();
  days[i].style.display = 'block';
}

// Check if next day is allowed
function isAllowed(dayNumber) {
  if (DEV_MODE) return true;
  return currentMonth === 2 && currentDay >= dayNumber;
}

// Initial page load logic
if (DEV_MODE) {
  index = 0; // Always start from Feb 7 in dev mode
} else {
  // In real mode, start from latest unlocked day
  for (let i = 0; i < days.length; i++) {
    const dayNum = parseInt(days[i].dataset.day);
    if (isAllowed(dayNum)) index = i;
  }
}


showDay(index);

// Navigation buttons
document.getElementById('prevBtn').onclick = () => {
  if (index > 0) {
    index--;
    showDay(index);
  }
};

document.getElementById('nextBtn').onclick = () => {
  const nextIndex = index + 1;
  if (nextIndex < days.length) {
    const nextDayNum = parseInt(days[nextIndex].dataset.day);

    if (isAllowed(nextDayNum)) {
      index++;
      showDay(index);
    } else {
      popup.classList.remove('hidden');
      setTimeout(() => popup.classList.add('hidden'), 2200);
    }
  }
};

