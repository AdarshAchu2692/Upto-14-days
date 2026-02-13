const DEV_MODE = true;

const START_DAY = 7;
const MONTH = 1;

const days = Array.from(document.querySelectorAll('.day'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

const TOO_EARLY_MESSAGE = "Dhirthi vekkalle kanna... Poyit nale vaa";

const nextModal = document.getElementById('nextMessageModal');
const nextMessageText = document.getElementById('nextMessageText');
const nextContinueBtn = document.getElementById('nextContinueBtn');

function stopAllMedia(){
  document.querySelectorAll('audio').forEach(a=>{
    a.pause();
    a.currentTime = 0;
  });
}

function setupAudio(section){
  const start = section.querySelector('.audio-start');
  const stop = section.querySelector('.audio-stop');
  const music = section.querySelector('.bgMusic, #promiseMusic');
  const video = section.querySelector('video');

  if (start && music) {
    start.onclick = () => {
      music.play().catch(()=>{});
    };
  }

  if (stop && music) {
    stop.onclick = () => {
      music.pause();
      music.currentTime = 0;
    };
  }

  // 🎬 ONLY stop music if video has audio
  if (video && music && !video.muted) {
    video.addEventListener('play', () => {
      music.pause();
    });

    video.addEventListener('pause', () => {
      music.play().catch(()=>{});
    });

    video.addEventListener('ended', () => {
      music.play().catch(()=>{});
    });
  }
}


function isAllowed(index){
  if(DEV_MODE) return true;
  const today = new Date();
  return today.getMonth() === MONTH && today.getDate() >= START_DAY + index;
}

function showDay(index){
  stopAllMedia();

  days.forEach(d => d.style.display = 'none');
  days[index].style.display = 'block';

  setupAudio(days[index]);

  // 💋 Kiss Day fade-in animation (index 6)
  if (index === 6) {
    const items = days[index].querySelectorAll('.polaroid');
    items.forEach((el, i) => {
      el.classList.remove('fade-in');
      setTimeout(() => {
        el.classList.add('fade-in');
      }, i * 120);
    });
  }

  currentIndex = index;
}


function showEarlyMessage(){
  nextMessageText.innerText = TOO_EARLY_MESSAGE;
  nextModal.classList.remove('hidden');
}

nextContinueBtn.onclick = ()=> nextModal.classList.add('hidden');

prevBtn.onclick = ()=>{
  if(currentIndex > 0) showDay(currentIndex - 1);
};

nextBtn.onclick = ()=>{
  const nextIndex = currentIndex + 1;
  if(nextIndex < days.length){
    if(isAllowed(nextIndex)){
      showDay(nextIndex);
    } else {
      showEarlyMessage();
    }
  }
};

const promiseMusic = document.getElementById('promiseMusic');
const promiseVoice = document.getElementById('promiseVoice');

if(promiseMusic && promiseVoice){
  promiseVoice.addEventListener('play', ()=> promiseMusic.pause());
  promiseVoice.addEventListener('ended', ()=> promiseMusic.play().catch(()=>{}));
  promiseVoice.addEventListener('pause', ()=> promiseMusic.play().catch(()=>{}));
}
// ===============================
// 🤗 HUG DAY – REAL FEEL LOGIC
// ===============================
const hugCircle = document.getElementById('hugCircle');
const hugText = document.getElementById('hugText');

let hugTimer;
let hugCompleted = false;

if (hugCircle && hugText) {

  const startHug = () => {
    hugCompleted = false;
    hugCircle.innerText = "🤗";
    hugCircle.classList.add('hug-warm');
    hugText.innerText = "I’m right here… just stay.";

    hugTimer = setTimeout(() => {
      hugCompleted = true;
      hugText.innerText = "That’s it… breathe. You’re safe here 🤍";
    }, 2000);
  };

  const endHug = () => {
    clearTimeout(hugTimer);
    hugCircle.innerText = "🤍";
    hugCircle.classList.remove('hug-warm');

    hugText.innerText = hugCompleted
      ? "That warmth you feel… keep it with you today 🫶"
      : "Stay a little longer next time 🤍";
  };

  hugCircle.addEventListener('mousedown', startHug);
  hugCircle.addEventListener('mouseup', endHug);
  hugCircle.addEventListener('touchstart', startHug);
  hugCircle.addEventListener('touchend', endHug);
}
// 💌 Valentine Letter
function openLetter(){
  document.getElementById('letterPage').classList.remove('hidden');
}

function closeLetter(){
  document.getElementById('letterPage').classList.add('hidden');
}

showDay(0);

// 🍫 Chocolate Day – One bite at a time
let biteCount = 0;

const biteMessages = [
  "A little sweetness… and suddenly I’m thinking of you closer than I should 🍫",
  "The more time passes, the harder it is to pretend I don’t miss you 😌",
  "Some sweetness lingers… like the thought of you staying a little longer 💕",
  "Almost gone… but the warmth is still here, isn’t it? 🫶",
  "Like chocolate melting slowly… I stopped resisting what I feel for you ❤️"
];


const chocoBar = document.getElementById('chocoBar');
const biteMessage = document.getElementById('biteMessage');

if (chocoBar) {
  chocoBar.onclick = () => {
    if (biteCount < 5) {
      biteCount++;
      chocoBar.innerText = "🍫".repeat(5 - biteCount);
      biteMessage.innerText = biteMessages[biteCount - 1];
    }
  };
}






