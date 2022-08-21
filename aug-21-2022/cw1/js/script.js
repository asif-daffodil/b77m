const header = document.querySelectorAll(".header");
const details = document.querySelectorAll(".details");

for (let i = 0; i < header.length; i++) {
  header[i].addEventListener("click", () => {
    for (let j = 0; j < header.length; j++) {
      if (i === j) {
        if (header[j].classList.contains("active")) {
          header[j].classList.remove("active");
          details[j].style.maxHeight = null;
          details[j].style.padding = null;
        } else {
          header[j].classList.add("active");
          details[j].style.maxHeight = "max-content";
          details[j].style.padding = "10px";
        }
      } else {
        header[j].classList.remove("active");
        details[j].style.maxHeight = null;
        details[j].style.padding = null;
      }
    }
  });
}
