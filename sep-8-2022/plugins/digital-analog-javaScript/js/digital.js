function updateClock(){
    var current = new Date();
    var dname = current.getDay(),
    mon = current.getMonth(),
    num = current.getDate(),
    yr = current.getFullYear(),
    hr = current.getHours(),
    min = current.getMinutes(),
    sec = current.getSeconds(),
    pr = "AM";

    if(hr == 0){
        hr = 12;
    }
    if (hr > 12)
{
    hr = hr-12;
    pr = "PM";
}
    Number.prototype.pad = function(digits){
        for(var n = this.toString(); n.length<digits; n=0+n);
        return n;
    }

    var months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var ids = ["day", "month", "num", "year", "hour", "min", "sec", "period"];
    var values = [weeks[dname], months[mon], num.pad(2), yr, hr.pad(2), min.pad(2), sec.pad(2), pr];

    for(var i=0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    
}
function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}