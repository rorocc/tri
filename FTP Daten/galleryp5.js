let pg, canv, galleryImg;
let navOpen = false;
let appContainerDiv = document.getElementById("appContainer");
let changeFlag = false;
let animationFlag = false;
let tempScale;
let galleryContextString = "Galerie";
let mouseDragX;
let mouseDragDir = 0;
let imgV1, imgV2, imgV3, imgV4, imgWheel;
let i1pre, i2pre;
let imageBuffer, imageBufferX, galleryWheel;
let rotationAngle =0;
function preload(){
  imgV1 = loadImage("assets/gallery/vacation1.jpg")
  i1pre = loadImage("assets/gallery/vacation1.jpg")
  imgV2 = loadImage("assets/gallery/vacation2.jpg")
  i2pre = loadImage("assets/gallery/vacation2.jpg")
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
      
      console.log("tempScale",tempScale)
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
  }

  function getGalleryTopbar(){
    fill(81,81,81)
    rect(0,0, width, 30)
    textAlign(CENTER,TOP);
    fill(255,255,255);
    text(galleryContextString, width/2,10)
  }

  function getGalleryFirstLine(){
    imageMode(CORNER);
    imgV1.resize(200,0);
    imgV2.resize(200,0);
    imgV3.resize(200,0);
    imgV4.resize(200,height/4);
    imageBuffer.image(imgV1,0,0);
    imageBuffer.image(imgV2,imgV1.width,0);
    imageBuffer.image(imgV3,imgV1.width+imgV2.width,0);
    imageBuffer.image(imgV4,imgV1.width+imgV2.width+imgV3.width,0);

    if(mouseY < height/4){
      imageBufferX += 2.5*mouseDragDir;
      if(imageBufferX < -215){
        imageBufferX = -215;
      }else if(imageBufferX > 10){
        imageBufferX = 10
      }
    }
    image(imageBuffer, imageBufferX,0)
    noStroke();

     

    let c = color('rgba(0, 0, 0, 1)');
    let d =  color('rgba(0, 0, 0, 0)');
    setGradient(0,imageBuffer.height*2/3, width, imageBuffer.height/3, d, c, 1);

    fill(255,255,255)
    rect(imageBufferX,imageBuffer.height-5, 200, 5) 

    if(mouseDragDir >0){
      mouseDragDir -= 0.25
    }else if(mouseDragDir <0){
      mouseDragDir += 0.25
    }else if(mouseDragDir === 0){
    }  

  }
let angle = 0;
  function getGalleryPreview(){
    
    console.log("rot", angle)

    push()
      if(mouseY > height/4){
        translate(width/2, height)
        if(angle > -65){
          angle -= 5;
        }
        rotate(PI/180 * angle)
        translate(-width/2, -height)
      }else angle=0;
    
    i1pre.resize(0,height)
    i2pre.resize(0,height)
    image(i1pre,0,0)
    push()
    imageMode(CORNER);
    translate(width/2,height)
    rotate(PI/180 * 30)
    translate(0,-height)
    image(i2pre,0,0)
    pop()
    pop()
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

  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
  
    if (axis === 1) {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = map(i, y, y + h, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis === 2) {
      // Left to right gradient
      for (let i = x; i <= x + w; i++) {
        let inter = map(i, x, x + w, 0, 1);
        let c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
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