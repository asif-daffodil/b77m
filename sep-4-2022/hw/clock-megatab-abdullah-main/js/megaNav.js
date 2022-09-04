const nav = document.querySelectorAll("ul")[0];
const navbody = document.querySelectorAll(".nav")[0];
const blr = document.querySelectorAll(".blur")[0];
// const megamenu = document.querySelectorAll(".mega")[0];
const clockDisplay = document.querySelectorAll(".clock")[0];
const head = document.querySelectorAll(".head")[0];

const megamenu = head.children;

nav.addEventListener("click", (e) => {
  const menus = Array.from(e.target.parentElement.parentElement.children);
  const clickedIndex = menus.indexOf(e.target.parentElement);

  for (let i = 0; i < menus.length; i++) {
    if (2 === clickedIndex) {
      for (let j = 0; j < menus.length; j++) {
        if (2 == j) {
          menus[j].classList.add("active");
          megamenu[j].classList.remove("d-none");
          megamenu[j].style.top = "80px";
          // clockDisplay.style.filter = "blur(4px)";
          // clockDisplay.style.background = "grey";
        } else {
          menus[j].classList.remove("active");
          megamenu[j].style.top = "-280px";
          // clockDisplay.style.filter = "blur(0)";
          // clockDisplay.style.background = "transparent";
        }
      }
    } else if (i === clickedIndex) {
      if (!menus[i].classList.contains("active")) {
        // menus[i].classList.add("active");
        megamenu[i].style.top = "80px";
      } else {
        // menus[i].classList.remove("active");
        megamenu[i].style.top = "-280px";
      }
    } else {
      menus[i].classList.remove("active");
      megamenu[i].style.top = "-280px";
    }
  }
});
blr.addEventListener("click", () => {
  for (let i = 0; i < 5; i++) {
    nav.children[i].classList.remove("active");
    megamenu[i].style.top = "-280px";
    clockDisplay.style.filter = "blur(0)";
    clockDisplay.style.background = "transparent";
  }
});

/*
  function active(i){
    navbody.style.width = "750px";
    navbody.style.borderRadius = "20px";
    navbody.style.top = "20px";
    navbody.style.left = "50%";
    navbody.style.transform = "translateX(-50%)";
    clockDisplay.style.filter = "blur(4px)";       
    clockDisplay.style.background = "grey";
    menus[i].children[0].classlist.add("act");
    megamenu.style.height = "0";
    megamenu.style.paddingBlock = "0";
  }

  function deactive(i){
    navbody.style.width = "100%";
    navbody.style.borderRadius = "0";
    navbody.style.top = "0";
    clockDisplay.style.filter = "blur(0)";  
    clockDisplay.style.background = "transparent";
    menus[i].children[0].classlist.remove("act");
  } 
*/
