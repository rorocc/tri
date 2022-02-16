let navOpen = false; // is the navbar opened?
let touchActive = false; // is a touch event happening?
let touchTemp; // touchTemp = "previous" touch point
let angle = 0; // current rotation angle of the image wheel
let rotationMemory = 0, imageIndex = 0; imageIndexBefore = 0;
let imageAngles = [0, -60, -120, -180, -240, -300]; // image rotation breakpoints
let appContainerDiv = document.getElementById("appContainer");
let sliderDiv = document.getElementById("slider");
let imgViewDiv = document.getElementById("img-view");
let menu = document.querySelector(".menu");

  function openNav(){
    menu.classList.toggle("active");
    if (!navOpen){
        /* document.getElementById("nav").style.height ="100%"
        document.getElementById("nav").style.width = "100%" */
        document.getElementById("info").style.left = "74.7%";
      document.getElementById("event").style.left = "66.4%";
      document.getElementById("chat").style.left = "58.1%";
      document.getElementById("settings").style.left = "49.8%";
      document.getElementById("home").style.left = "41.5%";
      appContainerDiv.style.width ="75%";
        imgViewDiv.style.transform = `translate(-375px, -125px)  scale(0.75, 0.75) rotate(${handleAngle(angle)}deg)`;

        console.log(" --- rotationMemory ", rotationMemory/4, " --- angle ", angle)
        
        navOpen = true;
    }
    else{
      /* document.getElementById("nav").style.height = "0%"
      document.getElementById("nav").style.width = "0%" */
      document.getElementById("info").style.left = "100%";
      document.getElementById("event").style.left = "100%";
      document.getElementById("chat").style.left = "100%";
      document.getElementById("settings").style.left = "100%";
      document.getElementById("home").style.left = "100%";
      appContainerDiv.style.width ="100%";
      navOpen = false;
      imgViewDiv.style.transform = `translateX(-300px) rotate(${handleAngle(angle)}deg) `;
    }  
  }

  /**
   * Gets triggered when clicked on a preview thumbnail, sets the image by index
   * @param {index of the clicked image} idx 
   */
  function sliderClickHandler(idx){
    sliderDiv.classList.remove("slider-closed")
    setImageIndex(idx)
    handleAngle(imageAngles[idx])

    rotationMemory = imageAngles[idx]*4;

    console.log("clicked ", idx, " --- rotationMemory ", rotationMemory/4, " --- angle ", angle, " --- actual imageAngle ", imageAngles[idx])
    
    setImage(imageAngles[idx]);
  }

  /**
   * Sets the img-selected class on the selected image, removing on the image before
   * @param {Index of the current image} idx 
   */
  function setImageIndex(idx){
    imageIndexBefore = imageIndex;
    imageIndex = idx;

    document.getElementById(`img-${imageIndexBefore}`).classList.toggle("img-selected")
    document.getElementById(`img-${imageIndex}`).classList.toggle("img-selected")
  }

  /**
   * Rotates to the selected image & scrolls the slider so the image is visible
   * @param {The angle/degree of the image} angle 
   */
  function setImage(angle){
    if(navOpen){
      imgViewDiv.style.transform = `translate(-380px, -100px) scale(0.75, 0.75) rotate(${handleAngle(angle)}deg)`;
    }else{
      imgViewDiv.style.transform = `translateX(-300px) rotate(${angle}deg) `;
    }

    let scrollValue = (600/6)*imageIndex;

    sliderDiv.scrollTo({
      top: 0,
      left: scrollValue,
      behavior: 'smooth'
    });
  }

  /**
   * Calculates the rotation of the image wheel by calculating the difference of two consecutive touch points
   * @param {Touch event} e 
   */
  function calcRotation(e){
    let rotation;
    if(touchTemp){
      rotation =  e.touches[0].clientX - touchTemp.clientX;
    }else rotation = 0;

    touchTemp = e.touches[0];
  
    rotationMemory += rotation;
    angle = rotationMemory/4;

    console.log(rotationMemory, "MEMORY")

    if(angle > 0){
      rotationMemory = 0;
      angle = 0;
    }else if(angle < -300){
      rotationMemory = -300*4;
      angle = -300;
    }
   
    setImage(angle);
  }



  function handleAngle(angleInput){
    let result, tempIdx;
    let min = 9999;
    for(let i =0; i < imageAngles.length; i++){
      result = Math.abs(imageAngles[i] - angleInput);
      if(result < min){
        min = result;
        tempIdx = i;
      }
    }
    setImageIndex(tempIdx)
    console.log(angleInput, min, imageIndex);
    rotationMemory = 4*imageAngles[imageIndex];
    return imageAngles[imageIndex];
  }

  /**
   * Setting if a touch event is happening, so that consecutive touch points can be saved and compared
   * @param {Boolean describing if touch event is happening} bool 
   */
  function setTouchState(bool){
    touchActive = bool;

    if(!bool){
      touchTemp = null; // no touch event = no "previous" touch point
      setImage(handleAngle(angle))
    }else{
      sliderDiv.classList.add("slider-closed") // minimizing the slider bar when swiping through the images 
    }
  }

  /**
   * CURRENTLY NOT IN USE ---
   * detecting quick swipe, using swipedetection.js
   */
  swipedetect(imgViewDiv, function(swipedir){
      console.log(swipedir)
    switch (swipedir) {
        case "left":
            break;
        case "right":

            break;
        default:
            break;
    }
  })