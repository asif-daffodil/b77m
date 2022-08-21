const heading = document.querySelectorAll(".heading")[0];
const details = document.querySelectorAll(".details")[0];
const headingArr = Array.from(heading.children);
const detailsArr = Array.from(details.children);

heading.addEventListener("click", (e) => {
  const clickedDivIndex = headingArr.indexOf(e.target);
  for (let i = 0; i < headingArr.length; i++) {
    if (i === clickedDivIndex) {
      headingArr[i].classList.add("active");
      detailsArr[i].classList.remove("d-none");
    } else {
      headingArr[i].classList.remove("active");
      detailsArr[i].classList.add("d-none");
    }
  }
});
