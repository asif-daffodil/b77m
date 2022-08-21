function isLeapYear(year) {
  if (typeof year === "number" && year > 0) {
    if (year % 1 != 0) {
      console.log("Number cannot be type of Float");
      return false;
    }
    if (year % 400 === 0 && year % 4 === 0) {
      return true;
    } else {
      return false;
    }
  }
  if (typeof year === "string") {
    console.log("Please Enter Number");
  }
  if (typeof year === "number") {
    if (year < 0) {
      console.log("Please Input Positive Number");
    }
  }
  return false;
}
console.log(isLeapYear(1900));
