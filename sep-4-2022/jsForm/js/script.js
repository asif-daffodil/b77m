const myForm = document.querySelector("#myForm");
const confirmMe = document.querySelector("#confirmMe");
const subMe = document.querySelector("#subMe");
const yname = document.querySelector("#yname");
const yemail = document.querySelector("#yemail");
const errName = document.querySelector("#errName");
const errEmail = document.querySelector("#errEmail");

myForm.addEventListener("submit", (e) => formSub(e));
confirmMe.addEventListener("click", (e) => formCheck(e));

const formSub = (e) => {
  e.preventDefault();
  if (yname.value.length === 0) {
    yname.classList.add("is-invalid");
    errName.innerHTML = `Please write your name`;
  } else if (!yname.value.match(/^[A-Za-z. ]*$/)) {
    yname.classList.add("is-invalid");
    errName.innerHTML = `Invalid Name`;
  } else {
    yname.className = "is-valid form-control";
    errName.innerHTML = ``;
  }

  if (yemail.value.length === 0) {
    yemail.classList.add("is-invalid");
    errEmail.innerHTML = `Please write your email address`;
  } else if (
    !yemail.value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    yemail.classList.add("is-invalid");
    errEmail.innerHTML = `Invalid Email Address`;
  } else {
    yemail.className = "is-valid form-control";
    errEmail.innerHTML = ``;
  }
};

const formCheck = (e) => {
  e.target.checked === true
    ? (subMe.disabled = false)
    : (subMe.disabled = true);
};
