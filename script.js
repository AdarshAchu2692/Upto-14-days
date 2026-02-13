const DEV_MODE = true;

const START_DAY = 7;
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
  days.forEach(d=>d.style.display='none');
  days[index].style.display='block';
  setupAudio(days[index]);
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

showDay(0);






