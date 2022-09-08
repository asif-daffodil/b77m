
// THIS STORES INPUTTED NUMBERS TO MAKE CALCULATIONS

window.total = 0;
window.currentNum = 0;
window.equalsChain = false;

window.operations = {
  addition: false,
  subtraction: false,
  multiplication: false,
  division: false
};

window.calculate = {
  addition: function (a, b) { return a + b; },
  subtraction: function (a, b) { return a - b; },
  multiplication: function (a, b) { return a * b; },
  division: function (a, b) { return a / b; }
};

window.first = true;
window.pending = false;
