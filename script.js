const DEV_MODE = true;

const START_DAY = 7;
const END_DAY = 14;
const MONTH = 1;

const days = Array.from(document.querySelectorAll('.day'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

const TOO_EARLY_MESSAGE = "Dhirthi vekkalle kanna ... Poyit nale vaa";

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

  if(start && music){
    start.onclick = ()=> music.play().catch(()=>{});
  }

  if(stop && music){
    stop.onclick = ()=>{
      music.pause();
      music.currentTime = 0;
    };
  }

  // pause music only if video has sound
  if(video && music && !video.muted){
    video.onplay = ()=> music.pause();
    video.onpause = ()=> music.play().catch(()=>{});
    video.onended = ()=> music.play().catch(()=>{});
  }
}

function getTodayIndex(){
  if(DEV_MODE) return 0;

  const today = new Date();

  if(today.getMonth() !== MONTH) return 0;

  const todayDay = today.getDate();

  if(todayDay < START_DAY) return 0;

  if(todayDay > END_DAY) return days.length - 1;

  return todayDay - START_DAY;
}

function isAllowed(index){
  if(DEV_MODE) return true;

  const today = new Date();
  if(today.getMonth() !== MONTH) return false;

  return today.getDate() >= START_DAY + index;
}

function showDay(index){
  stopAllMedia();

  days.forEach(d => d.style.display='none');
  days[index].style.display='block';

  setupAudio(days[index]);

  closeLetter(); // ensure overlay closed

  currentIndex = index;
}

function showEarlyMessage(){
  nextMessageText.innerText = TOO_EARLY_MESSAGE;
  nextModal.classList.remove('hidden');
}

nextContinueBtn.onclick = ()=>{
  nextModal.classList.add('hidden');
};

prevBtn.onclick = ()=>{
  if(currentIndex > 0){
    showDay(currentIndex - 1);
  }
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

// Promise Day voice logic
const promiseMusic = document.getElementById('promiseMusic');
const promiseVoice = document.getElementById('promiseVoice');

if(promiseMusic && promiseVoice){
  promiseVoice.onplay = ()=> promiseMusic.pause();
  promiseVoice.onended = ()=> promiseMusic.play().catch(()=>{});
  promiseVoice.onpause = ()=> promiseMusic.play().catch(()=>{});
}

/* ❤️ LETTER LOGIC */
const overlay = document.getElementById('letterOverlay');
const envelope = document.getElementById('envelope');
const letterPage = document.getElementById('letterPage');

function openLetter(){
  if(!overlay) return;

  overlay.classList.remove('hidden');
  letterPage.classList.add('hidden');

  envelope.style.display = "block";
  envelope.style.opacity = 1;
  envelope.style.transform = "scale(1)";

  document.body.style.overflow = "hidden";
}

if(envelope){
  envelope.onclick = () => {
    envelope.style.transform = "scale(1.8)";
    envelope.style.opacity = 0;

    setTimeout(()=>{
      envelope.style.display = "none";
      letterPage.classList.remove('hidden');
    }, 400);
  };
}

function closeLetter(){
  if(!overlay) return;

  overlay.classList.add('hidden');
  document.body.style.overflow = "auto";
}

// INIT
currentIndex = getTodayIndex();
showDay(currentIndex);
