const header = document.querySelectorAll(".header");
const details = document.querySelectorAll(".details");

const btn = document.querySelectorAll(".city")
const result = document.querySelectorAll(".baal");

for (let i = 0; i < header.length; i++) {
  header[i].addEventListener("click", () => {
    for (let j = 0; j < header.length; j++) {
      if (i === j) {
        if (header[j].classList.contains("active")) {
          header[j].classList.remove("active");
          details[j].style.maxHeight = null;
        } else {
          header[j].classList.add("active");
          details[j].style.maxHeight = details[j].scrollHeight +"px";
        }
      } else {
        header[j].classList.remove("active");
        details[j].style.maxHeight = null;
      }
    }
  });
}

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", ()=>{
        for (let j = 0; j < btn.length; j++) {
            if (i === j) {
                  btn[j].classList.add("active1");
                  result[j].style.opacity = '1';
                }else{ 
                btn[j].classList.remove("active1");
                result[j].style.opacity = '0';
              }
            
        }
    })
    
}



