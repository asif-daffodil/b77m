document.write("This is a demo text");

// document.getElementById("myDiv").textContent = "<b>sada sada kala kala</b>";
document.getElementById("myDiv").innerHTML = "<b>sada sada kala kala</b>";

// alert("this is a alert");
// let x = prompt("what is your name?", "");
// alert(x);

const myform = document.getElementById("myform");
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const result = document.getElementById("result");

myform.addEventListener("submit", (e) => {
  e.preventDefault();
  if (num1.value.length === 0) {
    alert("Please input the number 1");
  }
  result.textContent = parseInt(num1.value) + parseInt(num2.value);
});

/* function namnai(a, b) {
  return a + b;
}

const namnai = (a, b) => {
  return a + b;
}; */
