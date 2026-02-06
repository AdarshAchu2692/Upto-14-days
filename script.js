const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

const days = document.querySelectorAll('.day');
const warning = document.getElementById('warning');

days.forEach(day => {
  const dayNumber = parseInt(day.dataset.day);

  if (currentMonth !== 2 || currentDay < dayNumber) {
    day.style.display = 'none';

    day.addEventListener('click', () => {
      warning.classList.remove('hidden');
      setTimeout(() => warning.classList.add('hidden'), 2500);
    });
  }
});
