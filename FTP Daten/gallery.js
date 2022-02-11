let navOpen = false;
  let appContainerDiv = document.getElementById("appContainer");
  let sliderDiv = document.getElementById("slider");
  let imgViewDiv = document.getElementById("img-view");

  function openNav(){
    if (!navOpen){
        /* document.getElementById("nav").style.height ="100%"
        document.getElementById("nav").style.width = "100%" */
        document.getElementById("nav").style.left = "0"
        appContainerDiv.style.width = "75%"
        navOpen = true;
    }
    else{
      /* document.getElementById("nav").style.height = "0%"
      document.getElementById("nav").style.width = "0%" */
      document.getElementById("nav").style.left = "50%"
      appContainerDiv.style.width = "100%"
      navOpen = false;
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