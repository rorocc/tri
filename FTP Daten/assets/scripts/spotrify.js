let navOpen = false;
let menu = document.querySelector(".menu");

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