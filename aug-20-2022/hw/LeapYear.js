function leapYear(year) {
  if (isNaN(year) || year < 0 || year % 1 !== 0) {
    console.log("Please provide a valid year!");
  } else {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
      console.log(year + " is a Leap Year!");
    } else {
      console.log(year + " is not a Leap Year");
    }
  }
}

const myYear = 2000.689;
const checkYear = leapYear(myYear);
