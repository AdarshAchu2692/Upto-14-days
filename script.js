// 🔧 DEV MODE
const DEV_MODE = true; // ❗ set false before sending her

const days = Array.from(document.querySelectorAll('.day'));
const popup = document.getElementById('popup');

let index = 0;

// Date check
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

// Stop all media when changing pages
function stopAllMedia() {
  document.querySelectorAll('audio, video').forEach(m => {
    m.pause();
    m.currentTime = 0;
  });
}

// Show only one day
function showDay(i) {
  stopAllMedia();
  days.forEach(d => d.style.display = 'none');
  days[i].style.display = 'block';

  // autoplay bg music if exists
  const music = days[i].querySelector('audio.bgMusic');
  if (music) {
    music.muted = true;
    music.play().catch(()=>{});
    document.addEventListener('click', () => {
      music.muted = false;
      music.play().catch(()=>{});
    }, { once:true });
  }
}

// Check if day is allowed
function isAllowed(dayNum) {
  if (DEV_MODE) return true;
  return currentMonth === 2 && currentDay >= dayNum;
}

// Initial load
if (DEV_MODE) {
  index = 0;
} else {
  for (let i = 0; i < days.length; i++) {
    if (isAllowed(parseInt(days[i].dataset.day))) index = i;
  }
}

showDay(index);

// Navigation
document.getElementById('prevBtn').onclick = () => {
  if (index > 0) {
    index--;
    showDay(index);
  }
};

document.getElementById('nextBtn').onclick = () => {
  if (index + 1 < days.length) {
    const nextDay = parseInt(days[index + 1].dataset.day);
    if (isAllowed(nextDay)) {
      index++;
      showDay(index);
    } else {
      popup.classList.remove('hidden');
      setTimeout(() => popup.classList.add('hidden'), 2200);
    }
  }
};

// 🎵 Propose day logic
const proposeMusic = document.getElementById('proposeMusic');
const proposeVideo = document.getElementById('proposeVideo');

if (proposeVideo && proposeMusic) {
  proposeMusic.muted = true;
  proposeMusic.play().catch(()=>{});

  document.addEventListener('click', () => {
    proposeMusic.muted = false;
    proposeMusic.play().catch(()=>{});
  }, { once:true });

  proposeVideo.addEventListener('play', () => proposeMusic.pause());
  proposeVideo.addEventListener('ended', () => proposeMusic.play());
}

// 🤞 Promise day logic
const promiseMusic = document.getElementById('promiseMusic');
const promiseVideo = document.getElementById('promiseVideo');

if (promiseVideo && promiseMusic) {
  promiseMusic.play().catch(()=>{});
  promiseVideo.addEventListener('play', () => promiseMusic.pause());
  promiseVideo.addEventListener('ended', () => promiseMusic.play());
}
