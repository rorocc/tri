let navOpen = false;
let touchActive = false;
let touchTemp, angle = 0;
let rotationMemory = 0, imageIndex = 0; imageIndexBefore = 0;
let imageAngles = [0, -60, -120, -180, -240, -300];
let appContainerDiv = document.getElementById("appContainer");
let sliderDiv = document.getElementById("slider");
let imgViewDiv = document.getElementById("img-view");

  function openNav(){
    if (!navOpen){
        /* document.getElementById("nav").style.height ="100%"
        document.getElementById("nav").style.width = "100%" */
        document.getElementById("nav").style.left = "0"
        appContainerDiv.style.width = "75%"
        imgViewDiv.style.transform = `translate(-375px, -125px)  scale(0.75, 0.75) rotate(${handleAngle(angle)}deg)`;
        navOpen = true;
    }
    else{
      /* document.getElementById("nav").style.height = "0%"
      document.getElementById("nav").style.width = "0%" */
      document.getElementById("nav").style.left = "50%"
      appContainerDiv.style.width = "100%"
      navOpen = false;
      imgViewDiv.style.transform = `translateX(-300px) rotate(${handleAngle(angle)}deg) `;
    }  
  }

  function sliderClickHandler(idx){
    sliderDiv.classList.remove("slider-closed")
    setImageIndex(idx)

    rotationMemory = imageAngles[idx]*4;
    
    setImage(imageAngles[idx]);
  }

  function setImageIndex(idx){
    imageIndexBefore = imageIndex;
    imageIndex = idx;

    document.getElementById(`img-${imageIndexBefore}`).classList.toggle("img-selected")
    document.getElementById(`img-${imageIndex}`).classList.toggle("img-selected")
  }

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

  function setTouchState(bool){
    touchActive = bool;

    if(!bool){
      touchTemp = null;
      setImage(handleAngle(angle))
    }else{
      //sliderDiv.classList.add("transition-class");
      sliderDiv.classList.add("slider-closed")
      setTimeout(()=>{
        //sliderDiv.classList.remove("transition-class");
      },500)
      
    }
  }


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