const DEV_MODE = true; // set false before sending

const days = Array.from(document.querySelectorAll('.day'));
const popup = document.getElementById('popup');

let index = 0;

// date logic
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1;

function stopAllMedia() {
  // stop ONLY audio
  document.querySelectorAll('audio').forEach(a => {
    a.pause();
    a.currentTime = 0;
  });

  // stop ONLY videos that are NOT autoplay loops
  document.querySelectorAll('video:not([autoplay])').forEach(v => {
    v.pause();
    v.currentTime = 0;
  });
}


function setupAudioStart(section) {
  const btn = section.querySelector('.audio-start');
  const music = section.querySelector('audio.bgMusic, #proposeMusic, #promiseMusic');

  if (!btn || !music) return;

  btn.style.display = 'block';

  btn.onclick = () => {
    music.volume = 1;
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

// nav
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

// Propose day logic
const proposeMusic = document.getElementById('proposeMusic');
const proposeVideo = document.getElementById('proposeVideo');
if (proposeMusic && proposeVideo) {
  proposeVideo.addEventListener('play', () => proposeMusic.pause());
  proposeVideo.addEventListener('ended', () => proposeMusic.play());
}

// Promise day volume ducking
const promiseMusic = document.getElementById('promiseMusic');
const promiseVoice = document.getElementById('promiseVoice');
if (promiseMusic && promiseVoice) {
  promiseVoice.addEventListener('play', () => promiseMusic.volume = 0.45);
  promiseVoice.addEventListener('ended', () => promiseMusic.volume = 1);
  promiseVoice.addEventListener('pause', () => promiseMusic.volume = 1);
}

