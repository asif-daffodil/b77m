/*Title :: Founding Leap Year App */
/*Description :: If you use this app you know that which year is leap year */
/*Author :: Freelancer Hasib*/
/*Date :: 18-08-2022  */

let button = document.querySelector('.button');
let inputyear = document.querySelector('.year');
let showresult = document.querySelector('.leapyear h2');
          
            // First Symtem Of leap year

button.addEventListener('click', () => {
    
    if(inputyear.value == ""){
        showresult.innerText = "Please input a Year";
        showresult.style.color = 'blue'
    }
   else if((inputyear.value % 4 == 0 && inputyear.value % 100 !== 0) || (inputyear.value % 400 == 0)){
        showresult.innerText = "Your input is " + inputyear.value + " and This Year is a (LEAPYEAR)"
        showresult.style.color = 'yellow'
    }
    else{
        showresult.innerText = "Your input is " + inputyear.value + " and This Year is (NOT a LEAPYEAR)"
        showresult.style.color = 'yellowgreen'
    }

})

inputyear.addEventListener('focus', () => {
    inputyear.value = "";
    showresult.innerText = "";
})

            
                //   second System of leap Year
  

// const leap = new Date(inputyear.value, 1, 29).getDate() === 29;
// button.addEventListener('click', () => {
    
//     if(inputyear.value == ""){
//         showresult.innerText = "Please input a Year";
//         showresult.style.color = 'blue'
//     }
//    else if(leap){
//         showresult.innerText = "Your input is " + inputyear.value + " and This Year is a (LEAPYEAR)"
//         showresult.style.color = 'yellow'
//     }
//     else{
//         showresult.innerText = "Your input is " + inputyear.value + " and This Year is (NOT a LEAPYEAR)"
//         showresult.style.color = 'yellowgreen'
//     }

// })

// inputyear.addEventListener('focus', () => {
//     inputyear.value = "";
//     showresult.innerText = "";
// })
 
