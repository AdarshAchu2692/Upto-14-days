// ===============================
// 🔧 DEV MODE SWITCH
// ===============================
const DEV_MODE = true; // 🔁 set FALSE before sharing with her

// ===============================
// 📅 DATE CONFIG
// ===============================
const START_DAY = 7;
const END_DAY = 14;
const MONTH = 1; // February (0-based index)

// ===============================
// 🌐 ELEMENTS
// ===============================
const days = Array.from(document.querySelectorAll('.day'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const popup = document.getElementById('popup');

// ===============================
// 🧠 STATE
// ===============================
let currentIndex = 0;

// ===============================
// 📅 TODAY
// ===============================
const today = new Date();
const todayDate = today.getDate();
const todayMonth = today.getMonth();

// ===============================
// 🔊 STOP MEDIA (SAFE)
// ===============================
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

// ===============================
// 🎵 AUDIO START BUTTON
// ===============================
function setupAudio(section) {
  const btn = section.querySelector('.audio-start');
  const music = section.querySelector('.bgMusic, #promiseMusic');

  if (!btn || !music) return;

  btn.style.display = 'block';

  btn.onclick = () => {
    music.play().catch(() => {});
    btn.style.display = 'none';
  };
}

// ===============================
// 📆 CHECK IF DAY IS ALLOWED
// ===============================
function isAllowed(index) {
  if (DEV_MODE) return true;

  const dayNumber = START_DAY + index;

  if (todayMonth !== MONTH) return false;
  return todayDate >= dayNumber;
}

// ===============================
// 🧭 SHOW DAY
// ===============================
function showDay(index) {
  stopAllMedia();

  days.forEach(d => d.style.display = 'none');
  days[index].style.display = 'block';

  setupAudio(days[index]);

  // Save progress ONLY if not DEV MODE
  if (!DEV_MODE) {
    localStorage.setItem('valentine_last_day', index);
  }

  currentIndex = index;
}

// ===============================
// 💾 RESTORE LAST OPENED DAY
// ===============================
function restoreLastDay() {
  if (DEV_MODE) return 0;

  const saved = localStorage.getItem('valentine_last_day');
  if (saved !== null) {
    const i = parseInt(saved);
    if (isAllowed(i)) return i;
  }

  // fallback → today
  if (todayMonth === MONTH) {
    return Math.min(todayDate - START_DAY, days.length - 1);
  }

  return 0;
}

// ===============================
// 🚨 POPUP
// ===============================
function showPopup() {
  popup.classList.remove('hidden');
  setTimeout(() => popup.classList.add('hidden'), 2000);
}

// ===============================
// 🔘 NAVIGATION
// ===============================
prevBtn.onclick = () => {
  if (currentIndex > 0) {
    showDay(currentIndex - 1);
  }
};

nextBtn.onclick = () => {
  const nextIndex = currentIndex + 1;

  if (nextIndex < days.length) {
    if (isAllowed(nextIndex)) {
      showDay(nextIndex);
    } else {
      showPopup();
    }
  }
};

// ===============================
// 🤞 PROMISE DAY AUDIO DUCKING
// ===============================
const promiseMusic = document.getElementById('promiseMusic');
const promiseVoice = document.getElementById('promiseVoice');

if (promiseMusic && promiseVoice) {
  promiseVoice.addEventListener('play', () => {
    promiseMusic.volume = 0.45;
  });

  promiseVoice.addEventListener('ended', () => {
    promiseMusic.volume = 1;
  });

  promiseVoice.addEventListener('pause', () => {
    promiseMusic.volume = 1;
  });
}

// ===============================
// 🚀 INIT
// ===============================
currentIndex = restoreLastDay();
showDay(currentIndex);

// ===============================
// 🧪 DEV MODE LOG
// ===============================
if (DEV_MODE) {
  console.log('✅ DEV MODE ON: date lock, popup, memory disabled');
} else {
  console.log('🔒 LIVE MODE: date lock & memory enabled');
}
