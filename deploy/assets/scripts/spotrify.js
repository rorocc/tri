let navOpen = false, playState = false;
let seekSlider = document.getElementById("audio-seek-slider");
let playIcon = document.getElementById("playIcon");
let audioBtn = document.getElementById("playBtn");
let audioInfoDiv = document.getElementById("audio-info");
let trackTitle = document.getElementById("track-title");
let albumImgsDiv = document.getElementById("audio-album-img");
let albumImg = document.getElementById("album-img");
let artistName = document.getElementById("artist-name");
let spotifyBar = document.getElementById("audio-sidebar-controls");
const audio = document.querySelector('audio');
const durationContainer = document.getElementById('duration');
const currentContainer = document.getElementById('current-time');
let menu = document.querySelector(".menu");
let currentTrack = 0, nextTrack = 1, lastTrack = 2;
let tracksArray = [{trackName: "Cosmetic Geometry", artist: "atherrasool1111", coverSrc: "tri_cosmetic.png", trackSrc: "cosmeticgeometry.mp3"},
{trackName: "Lorem Ipsum", artist: "Jona K", coverSrc: "tri_jona.png", trackSrc: "cosmeticgeometry.mp3"},
{trackName: "Spirit Blossom", artist: "RomanBelov", coverSrc: "tri_spirit.png", trackSrc: "spiritblossom.mp3"}]

updateTrack(0);
setImages();

function updateTrack(dir){
  
    switch (dir) {
        case 1:
            lastTrack = currentTrack;
            if(currentTrack === tracksArray.length-1){
                currentTrack = 0;
                nextTrack = currentTrack +1;
            }else{
              currentTrack += 1;
              if(currentTrack === tracksArray.length-1){
                nextTrack = 0;
              }else nextTrack++;
            }
            break;
        case -1:
            nextTrack = currentTrack;
            if(currentTrack === 0){
                currentTrack = tracksArray.length -1;
                lastTrack = currentTrack -1;
            }else{
                currentTrack -= 1;
                if(currentTrack === 0){
                  lastTrack = tracksArray.length-1;
                }else lastTrack = currentTrack -1;
            }
            break;
        default:
            break;
    }

    console.log(lastTrack, currentTrack, nextTrack)
    trackTitle.textContent = tracksArray[currentTrack].trackName;
    artistName.textContent = tracksArray[currentTrack].artist;
    //albumImg.src = `assets/covers/${tracksArray[currentTrack].coverSrc}`;
    //document.getElementById("album-img-next").src = `assets/covers/${tracksArray[nextTrack].coverSrc}`;
    audio.src=`assets/tracks/${tracksArray[currentTrack].trackSrc}`;

    swapImages(dir)

    if(dir !== 0 && playState){
        audio.play();
    }
}

function setImages(){
  let current = document.getElementById("album-img");
  let next = document.getElementById("album-img-next");
  let last = document.getElementById("album-img-last");

  current.src = `assets/covers/${tracksArray[currentTrack].coverSrc}`;
  next.src = `assets/covers/${tracksArray[nextTrack].coverSrc}`;
  last.src = `assets/covers/${tracksArray[lastTrack].coverSrc}`;
}

function swapImages(dir){
  let current = document.getElementById("album-img");
  let next = document.getElementById("album-img-next");
  let last = document.getElementById("album-img-last");

  switch (dir) {
    case 0:
      return;
    case 1:
      current.classList.remove("current-img");
      next.classList.remove("next-img");
    
      current.classList.add("last-img");
      next.classList.add("current-img");
    
      current.id = "album-img-last";
      next.id = "album-img";
    
      setTimeout(()=>{
        last.remove();
      },500);
    
      let strNext = `<img class="next-img" id="album-img-next" src="assets/covers/${tracksArray[nextTrack].coverSrc}">`
      albumImgsDiv.insertAdjacentHTML("beforeend", strNext)

      break;

    case -1:
      current.classList.remove("current-img");
      last.classList.remove("last-img");
    
      current.classList.add("next-img");
      last.classList.add("current-img");
      
      current.id = "album-img-next";
      last.id = "album-img";

      setTimeout(()=>{
        next.remove();
      },500);
    
      let strLast = `<img class="last-img" id="album-img-last" src="assets/covers/${tracksArray[lastTrack].coverSrc}">`
      albumImgsDiv.insertAdjacentHTML("afterbegin", strLast)

      break;
  
    default:
      break;
  }

  
  
}


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

audio.addEventListener('ended', ()=>{
    updateTrack(1);
})

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
      spotifyBar.style.transform = "translate(-75px, -115px) rotate(-60deg)"
      navOpen = true;
    }
    else {
      document.getElementById("info").style.left = "100%";
      document.getElementById("event").style.left = "100%";
      document.getElementById("chat").style.left = "100%";
      document.getElementById("settings").style.left = "100%";
      document.getElementById("home").style.left = "100%";
      document.getElementById("appContainer").style.width = "100%"
      spotifyBar.style.transform = "translateY(-90px) rotate(-60deg)"
      navOpen = false;

    }

  }

  swipedetect(audioInfoDiv, function(swipedir){
    console.log(swipedir)
  switch (swipedir) {
      case "left":
        updateTrack(1)
          break;
      case "right":
        updateTrack(-1);
          break;
      default:
          break;
  }
})