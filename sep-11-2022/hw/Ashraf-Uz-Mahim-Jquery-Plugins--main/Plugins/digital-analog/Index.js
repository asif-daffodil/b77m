var hh=document.querySelector('.hour')
var mh=document.querySelector('.minute')
var sh=document.querySelector('.second')

function Time(){
    var date=new Date()
    var sec=date.getSeconds()/60
    var min=(sec + date.getMinutes())/60
    var hr=(min + date.getHours())/12
    var weekNames=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat']
    var monthNames=['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    rotate(sh,sec)
    rotate(mh,min)
    rotate(hh,hr)

    var h=date.getHours()
    var m=date.getMinutes()
    var s=date.getSeconds()
    var d=date.getDay()
    var mo=date.getMonth()
    var y=date.getFullYear()
    if(h===0){
        h=12
    }
    if (h>12) {
        h=h-12
        session='PM'
    }

    h=(h<10)? '0'+h:h
    m=(m<10)? '0'+m:m
    s=(s<10)? '0'+s:s

    $('.hours').text(h)
    $('.minutes').text(m)
    $('.seconds').text(s)
    $('.day').text(weekNames[d])
    $('.month').text(monthNames[mo])
    $('.year').text(y)
    setInterval(Time,1000)
}

function rotate(tag,ratio){
    $(tag).css('--rotation',ratio*360)
}

Time()
