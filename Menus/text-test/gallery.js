let pg, canv, galleryImg;
let navOpen = false;
let appContainerDiv = document.getElementById("appContainer");
let changeFlag = false;
let animationFlag = false;
let tempScale;
let galleryContextString = "Galerie";
let mouseDragX;
let mouseDragDir = 0;
let imgV1, imgV2, imgV3, imgV4;
let i1pre;
let imageBuffer, imageBufferX;

function preload(){
  imgV1 = loadImage("assets/gallery/vacation1.jpg")
  i1pre = loadImage("assets/gallery/vacation1.jpg")
  imgV2 = loadImage("assets/gallery/vacation2.jpg")
  imgV3 = loadImage("assets/gallery/vacation3.jpg")
  imgV4 = loadImage("assets/gallery/vacation4.jpg")
}

function setup() {
    imageBufferX = 0;
    canv = createCanvas(600, 520);
    canv.parent('appContainer');
    pg = createGraphics(width, height)
    imageBuffer = createGraphics(width+200, height/4)
    

  }
  
  function draw() {
  clear();
  noStroke();
    if(changeFlag){
      if(!navOpen){
        animationFlag = true;
        tempScale = 0.75;
      }else if(navOpen){
        tempScale = 1;
        setTimeout(()=>{
          animationFlag = true;
        },150)
        
      }
      changeFlag = false;
      
      console.log(tempScale)
    }

    if(animationFlag){
      console.log("animation -- run")
      if(navOpen){
        // downsizing, starting at 1 to .75
        tempScale -= 0.025;
        if(tempScale <= 0.75){animationFlag=false;console.log("END -- .75 --",tempScale)}
      }else if(!navOpen){
        // upsizing, starting at .75 to 1
        tempScale += 0.10;
        if(tempScale >= 1){animationFlag=false; console.log("END -- 1 -- ",tempScale)}
      };
  
      scale(tempScale);
      console.log("temp",tempScale)
      //animationFlag = false;
    }else{
      scale(tempScale);
    }

    getGalleryPreview();
    getGalleryFirstLine();
    getGalleryTopbar();
    pg.ellipse(pg.width / 2, pg.height / 2, 50, 50);
    galleryImg = image(pg, 00, 0);
    //image(pg, 0, 0, 50, 50);
    fill(0, 0, 255);
    circle(100, 100, 25);
  }

  function getGalleryTopbar(){
    fill(81,81,81)
    rect(0,0, width, 30)
    textAlign(CENTER,TOP);
    fill(255,255,255);
    text(galleryContextString, width/2,10)
  }

  function getGalleryFirstLine(){
    imgV1.resize(200,0);
    imgV2.resize(200,0);
    imgV3.resize(200,0);
    imgV4.resize(200,height/4);
    imageBuffer.image(imgV1,0,0);
    imageBuffer.image(imgV2,imgV1.width,0);
    imageBuffer.image(imgV3,imgV1.width+imgV2.width,0);
    imageBuffer.image(imgV4,imgV1.width+imgV2.width+imgV3.width,0);

    imageBufferX += 2.5*mouseDragDir;
    console.log(imageBufferX)
    if(imageBufferX < -215){
      imageBufferX = -215;
    }else if(imageBufferX > 10){
      imageBufferX = 10
    }

    image(imageBuffer, imageBufferX,0)
    if(mouseDragDir >0){
      mouseDragDir -= 0.25
    }else if(mouseDragDir <0){
      mouseDragDir += 0.25
    }else if(mouseDragDir === 0){
    }
  }

  function getGalleryPreview(){
    image(i1pre,10,20,width-75,0)
  }

  function mouseClicked(event) {
    console.log(event);
  }

  function mouseDragged(event){
    //console.log(event)
    mouseDragDir = event.movementX;
    mouseDragX = mouseX;

    return false;
  }

  function touchMoved(event){
    console.log(event)
  }

  function openNav(){
    console.log("CLICK")
    if (!navOpen){
      document.getElementById("nav").style.height ="100%"
      document.getElementById("nav").style.width = "100%"
      appContainerDiv.style.width = "75%";
      navOpen = true;
      changeFlag = true;
      console.log("navopen", navOpen)
    }
    else{
      document.getElementById("nav").style.height = "0%"
      document.getElementById("nav").style.width = "0%"
      appContainerDiv.style.width = "100%";
      navOpen = false;
      changeFlag = true;
      console.log("NAV CLOSED")
    }
    
  }