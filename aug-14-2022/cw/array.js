var cities = ["Dhaka", "Rajshahi", "Khulna", "Rongpur"];
cities.push("Joypurhat", "Bogura");
cities.pop();
cities.shift();
cities.unshift("Barishal");
cities.splice(cities.indexOf("Rajshahi"), 1, "Jhalokathi");
// console.log(cities);

var persons = [
  ["Asif", 36, "Jhalokathi"],
  ["Hasibul", 22, "Shoriotpur"],
  ["Abdullah", 21, "Munshigonj"],
  ["Hasib", 23, "Khulna"],
];

// console.log(persons[2][2]);

// console.log(cities.length);

/* for (var i = 0; i < cities.length; i++) {
  console.log(cities[i]);
} */

for (let i = 0; i < persons.length; i++) {
  for (let j = 0; j < persons[i].length; j++) {
    console.log(persons[i][j]);
  }
}
