const DEV_MODE = false;

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

  const d = today.getDate();
  if(d < START_DAY) return 0;
  if(d > END_DAY) return days.length - 1;

  return d - START_DAY;
}

function isAllowed(index){
  if(DEV_MODE) return true;
  const today = new Date();
  return today.getDate() >= START_DAY + index;
}

function showDay(index){
  stopAllMedia();
  days.forEach(d=>d.style.display='none');
  days[index].style.display='block';
  setupAudio(days[index]);
  closeLetter();
  currentIndex = index;
}

function showEarlyMessage(){
  nextMessageText.innerText = TOO_EARLY_MESSAGE;
  nextModal.classList.remove('hidden');
}

nextContinueBtn.onclick = ()=> nextModal.classList.add('hidden');

prevBtn.onclick = ()=>{ if(currentIndex>0) showDay(currentIndex-1); };

nextBtn.onclick = ()=>{
  const nextIndex = currentIndex + 1;
  if(nextIndex < days.length){
    if(isAllowed(nextIndex)) showDay(nextIndex);
    else showEarlyMessage();
  }
};

/* Promise voice */
const promiseMusic = document.getElementById('promiseMusic');
const promiseVoice = document.getElementById('promiseVoice');

if(promiseMusic && promiseVoice){
  promiseVoice.onplay = ()=> promiseMusic.pause();
  promiseVoice.onended = ()=> promiseMusic.play().catch(()=>{});
}

/* LETTER */
const overlay = document.getElementById('letterOverlay');
const envelope = document.getElementById('envelope');
const letterPage = document.getElementById('letterPage');

function openLetter(){
  overlay.classList.remove('hidden');
  letterPage.classList.add('hidden');
  envelope.style.display="block";
  document.body.style.overflow="hidden";
}

envelope.onclick = ()=>{
  envelope.style.display="none";
  letterPage.classList.remove('hidden');
};

function closeLetter(){
  overlay.classList.add('hidden');
  document.body.style.overflow="auto";
}

currentIndex = getTodayIndex();
showDay(currentIndex);

