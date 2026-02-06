// 🔧 DEV MODE
const DEV_MODE = true; // 👉 change to false before sending her

// Get today's date
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

const days = document.querySelectorAll('.day');
const warning = document.getElementById('warning');

days.forEach(day => {
  const dayNumber = parseInt(day.dataset.day);

  // If DEV MODE is ON → show everything
  if (DEV_MODE) {
    day.style.display = 'block';
    return;
  }

  // REAL LOGIC (for her)
  if (currentMonth !== 2 || currentDay < dayNumber) {
    day.style.display = 'none';

    day.addEventListener('click', () => {
      warning.classList.remove('hidden');
      setTimeout(() => warning.classList.add('hidden'), 2500);
    });
  }
});
