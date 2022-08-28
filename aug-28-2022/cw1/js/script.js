const nav = document.querySelectorAll("nav")[0];
const dtls = document.querySelectorAll(".dtls")[0];
const haha = document.querySelectorAll(".haha")[0];
const dtlsArr = Array.from(dtls.children[0].children);

nav.addEventListener("click", (e) => {
  const menues = Array.from(e.target.parentElement.parentElement.children);
  const clickedIndex = menues.indexOf(e.target.parentElement);
  for (let i = 0; i < menues.length; i++) {
    if (i === clickedIndex) {
      menues[i].classList.toggle("activeNav");
      dtlsArr[i].classList.toggle("d-none");
      toggleHaha();
    } else {
      menues[i].classList.remove("activeNav");
      dtlsArr[i].classList.add("d-none");
    }
  }
});

const toggleHaha = () => {
  for (let i = 0; i < dtlsArr.length; i++) {
    if (!dtlsArr[i].classList.contains("d-none")) {
      haha.classList.remove("d-none");
      return;
    } else {
      haha.classList.add("d-none");
    }
  }
};

haha.addEventListener("click", () => {
  for (let i = 0; i < dtlsArr.length; i++) {
    haha.classList.add("d-none");
    dtlsArr[i].classList.add("d-none");
    nav.children[0].children[i].classList.remove("activeNav");
  }
});
