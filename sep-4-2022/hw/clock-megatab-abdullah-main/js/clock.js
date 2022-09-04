const clock = document.querySelectorAll(".time")[0];
const w = document.querySelectorAll(".week")[0];
const date = document.querySelectorAll(".date")[0];
const se = document.querySelectorAll("h3")[0];

let d = new Date();

const weekDay = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

for (let i = 0; i < weekDay.length; i++) {
  let para = document.createElement("span");
  let node = document.createTextNode(weekDay[i]);

  para.appendChild(node);
  w.appendChild(para);
}

function week() {
  for (let i = 0; i < weekDay.length; i++) {
    i == d.getDay() ? (w.children[i].style.color = "black") : w.children[i];
  }
}

function clk() {
  let d = new Date();

  let hour = d.getHours() % 12 == 12 ? 12 : d.getHours() % 12;
  let minute = d.getMinutes();
  let second = d.getSeconds();
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  clock.textContent =
    (hour < 10 ? "0" + hour : hour) +
    ":" +
    (minute < 10 ? "0" + minute : minute) +
    ":" +
    (second < 10 ? "0" + second : second) +
    " " +
    (d.getHours() > 12 ? " PM" : " AM");

  date.textContent =
    d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
  week();
}
setInterval(clk, 1000);
