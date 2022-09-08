# A Basic Calculator
A basic calculator modeled after the Apple iPhone calculator, built with HTML, CSS, and ES5.

![Calculator App](https://i.ibb.co/LN1dDd8/basic-calculator-screenshot.jpg)

My first project top to bottom.
For this one I experimented with building the front-end first. 
This presented some challenges later on which was due to the app's use of the user-inputted number
to do calculations as well as update the back-end. 

HTML elements were created dynamically with Javascript, using the jQuery library.
The CSS for the calculator was built primarily using CSS Grid.

Features implemented in this calculator:
* Equals chaining to run the most recent operator on the stored number as well as the total displayed on the screen
  * *ex.* **2 + 2 =** (display: 4) **=** (display: 6) **=** (display: 8) **=** (display: 10) and so on
* Calculations without clicking the "=" operator
  * *ex.* **1 + 2 -** (display: 3) **4 x** (display: -1) **5 ÷** (display: -5) **5 =** (display: -1) **=** (display: -0.2) **=** (display: -0.04) and so on
  * *Apple's calculator:* **1 + 2 -** (display: 3) **4 x** _(display: 4)_ **5 ÷** _(display: 20)_ **5 =** (display: -1) **=** (display: -0.2) **=** (display: -0.04)
* Operators highlight on click and un-highlight in the same fashion as Apple's calculator
* +/- Sign toggles inputted number between negative and positive, works on 0 to toggle between 0 and -0
* Clear button completely resets calculator for new number
* Decimal can correctly only be added once

The app is built purposefully not using ES6.
