function leapYear(year) {
  const yearDataType = typeof year;
  switch (yearDataType) {
    case "number":
      if (year % 1 != 0 && year < 0) {
        console.log(
          "Decimal and Minus number aren't allowed. Please input valid year."
        );
      } else if (year % 1 != 0) {
        console.log("Decimal number isn't allowed. Please input valid year.");
      } else if (year < 0) {
        console.log("Minus number isn't allowed. Please input valid year.");
      } else {
        if (year % 4 == 0) {
          if (year % 100 != 0 || year % 400 == 0) {
            console.log(year + " is a Leap Year!!");
          } else {
            console.log(year + " is not a Leap Year!!");
          }
        } else {
          console.log(year + " is not a Leap Year!!");
        }
      }
      break;
    case "string":
      console.log("String isn't allowed. Please input valid year.");
      break;
  }
}

leapYear(-20.45); //write year here
