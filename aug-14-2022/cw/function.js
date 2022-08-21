function city() {
  console.log("Dhaka");
}

// city();

function country(cnt) {
  console.log(cnt);
}

/* country("Bangladesh");
country("England"); */

function sum(num1 = 2, num2 = 3) {
  console.log(num1 + num2);
}

sum(5, 6);
sum();
sum(9);
