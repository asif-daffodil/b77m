var age = 1500;

if (age <= 12 && age > 0) {
  console.log("You are a baby");
} else if (age <= 19 && age > 12) {
  console.log("You are a teenager");
} else if (age <= 29 && age > 19) {
  console.log("You are a young person");
} else if (age <= 49 && age > 29) {
  console.log("You are a middle aged person");
} else if (age > 49 && age < 150) {
  console.log("You are an old person");
} else {
  console.log("You are not in this world");
}
