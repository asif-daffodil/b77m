const btns = document.querySelectorAll(".btns")[0];
const img = document.querySelectorAll(".img")[0].children[0];

btns.addEventListener("click", (e) => {
  const btnNo = Array.from(btns.children).indexOf(e.target);
  btnNo === 1
    ? (img.src = "./images/pic_bulboff.gif")
    : (img.src = "./images/pic_bulbon.gif");
});
