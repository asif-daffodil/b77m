const deg= 6;
const hor = document.querySelector('#hor');
const mn = document.querySelector('#mn');
const sc = document.querySelector('#sc');


setInterval(() => {
let day = new Date();
let hh = day.getHours() * 30;
let mm = day.getMinutes() * deg;
let ss = day.getSeconds() * deg;

hor.style.transform = `rotateZ(${(hh)+(mm/12)}deg)`;
mn.style.transform = `rotateZ(${mm}deg)`;
sc.style.transform = `rotateZ(${ss}deg)`;
});

$(document).ready(function(){
    $(".datetime").hide();
    $(".dig").click(function(){
      $(".clock").hide();
      $(".datetime").show();
    });
    $(".analog").click(function(){
        $(".datetime").hide();
        $(".clock").show();
      });
  });