const DEV_MODE = true; // set false before final sharing

const days = Array.from(document.querySelectorAll('.day'));
const popup = document.getElementById('popup');

let index = 0;

// date logic
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

// stop only audio + non-autoplay videos
function stopAllMedia() {
  document.querySelectorAll('audio').forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  document.querySelectorAll('video:not([autoplay])').forEach(v => {
    v.pause();
    v.currentTime = 0;
  });
}

// audio start button logic
function setupAudioStart(section) {
  const btn = section.querySelector('.audio-start');
  const music = section.querySelector('audio.bgMusic');

  if (!btn || !music) return;

  btn.style.display = 'block';
  btn.onclick = () => {
    music.play().catch(()=>{});
    btn.style.display = 'none';
  };
}

function showDay(i) {
  stopAllMedia();
  days.forEach(d => d.style.display = 'none');
  days[i].style.display = 'block';
  setupAudioStart(days[i]);
}

function isAllowed(dayNum) {
  if (DEV_MODE) return true;
  return currentMonth === 2 && currentDay >= dayNum;
}

// initial page
if (DEV_MODE) {
  index = 0;
} else {
  days.forEach((d, i) => {
    if (isAllowed(parseInt(d.dataset.day))) index = i;
  });
}

showDay(index);

// navigation
document.getElementById('prevBtn').onclick = () => {
  if (index > 0) showDay(--index);
};

document.getElementById('nextBtn').onclick = () => {
  if (index + 1 < days.length) {
    const nextDay = parseInt(days[index + 1].dataset.day);
    if (isAllowed(nextDay)) {
      showDay(++index);
    } else {
      popup.classList.remove('hidden');
      setTimeout(() => popup.classList.add('hidden'), 2000);
    }
  }
};
