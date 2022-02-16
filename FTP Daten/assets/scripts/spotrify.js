let navOpen = false, playState = false;
let seekSlider = document.getElementById("audio-seek-slider");
let playIcon = document.getElementById("playIcon");
let audioBtn = document.getElementById("playBtn");
const audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentContainer = document.getElementById('current-time');
let menu = document.querySelector(".menu");

audioBtn.addEventListener('click', () => {
    if(!playState) {
        audio.play();
        playIcon.textContent = "❚❚";
      } else {
        audio.pause();
        playIcon.textContent = "▶";
      }
    playState = !playState;
});

const setSliderMax = () => {
    seekSlider.max = Math.floor(audio.duration);
}

audio.addEventListener('timeupdate', () => {
    let time = Math.floor(audio.currentTime);
    seekSlider.value = time;
    currentContainer.textContent = calculateTime(audio.currentTime)

    seekSlider.style.backgroundSize = (time - seekSlider.min) * 100 / (seekSlider.max - seekSlider.min) + '% 100%'
  });

seekSlider.addEventListener('change', () => {
    audio.currentTime = seekSlider.value;
    currentContainer.textContent = calculateTime(audio.currentTime)
  });

if (audio.readyState > 0) {
    displayDuration();
    setSliderMax();
  } else {
    audio.addEventListener('loadedmetadata', () => {
      displayDuration();
      setSliderMax();
    });
  }

const displayDuration = () => {
    durationContainer.textContent = calculateTime(audio.duration);
}

const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
}


  function openNav() {
    menu.classList.toggle("active");
    console.log("CLICK")
    if (!navOpen) {
      
      document.getElementById("info").style.left = "74.7%";
      document.getElementById("event").style.left = "66.4%";
      document.getElementById("chat").style.left = "58.1%";
      document.getElementById("settings").style.left = "49.8%";
      document.getElementById("home").style.left = "41.5%";
      document.getElementById("appContainer").style.width = "85%"
      navOpen = true;
    }
    else {
      document.getElementById("info").style.left = "100%";
      document.getElementById("event").style.left = "100%";
      document.getElementById("chat").style.left = "100%";
      document.getElementById("settings").style.left = "100%";
      document.getElementById("home").style.left = "100%";
      document.getElementById("appContainer").style.width = "100%"
      navOpen = false;

    }

  }