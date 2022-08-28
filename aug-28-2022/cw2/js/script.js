const date = document.querySelectorAll(".date")[0];
const time = document.querySelectorAll(".time")[0];
const week = document.querySelectorAll(".week")[0];
const hasib = document.querySelectorAll(".hasib")[0];

const shoeDate = (d) => {
  const montArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  date.textContent =
    ("0" + d.getDate()).slice(-2) +
    "/" +
    montArr[d.getMonth()] +
    "/" +
    d.getFullYear();
};

let hour, amPm;
const haCon = (h) => {
  if (h < 12) {
    hour = h;
    amPm = "AM";
  } else if (h === 12) {
    hour = h;
    amPm = "PM";
  } else {
    hour = h - 12;
    amPm = "PM";
  }
};
const weeArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const weeFunc = (w) => {
  w.map((wa) => {
    const div = document.createElement("div");
    div.textContent = wa;
    week.appendChild(div);
  });
};
weeFunc(weeArr);

const activeWeek = (d) => {
  const today = weeArr[d.getDay()];
  Array.from(week.children).map((d) => {
    d.textContent === today
      ? d.classList.add("activeWeek")
      : d.classList.remove("activeWeek");
  });
};

setInterval(() => {
  const d = new Date();
  shoeDate(d);
  haCon(d.getHours());
  activeWeek(d);
  hasibFunc(d);
  time.textContent =
    ("0" + hour).slice(-2) +
    ":" +
    ("0" + d.getMinutes()).slice(-2) +
    ":" +
    ("0" + d.getSeconds()).slice(-2) +
    " " +
    amPm;
}, 1000);

const hasibFunc = (d) => {
  const myDate = new Date(2022, 8, 10, 0, 0, 0);
  let delta = Math.abs(myDate - d) / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  let seconds = Math.floor(delta % 60); // in theory the modulus is not required

  hasib.textContent =
    days +
    " Days " +
    hours +
    " Hours " +
    minutes +
    " Minutes " +
    seconds +
    " Sec ";
};
