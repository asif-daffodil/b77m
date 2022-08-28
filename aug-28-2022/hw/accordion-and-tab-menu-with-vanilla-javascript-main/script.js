                    // tab menu system one coding

let head = document.querySelectorAll('.tab div');
let body = document.querySelectorAll('.show');

for(let i = 0; i < head.length; i++){
    head[i].addEventListener('click', function(){

        for(let j = 0; j < head.length; j++){
            if(i === j){
               head[j].classList.add('activebtn');
               body[j].classList.add('block')
               body[j].classList.remove('none')
            }
            else{
                head[j].classList.remove('activebtn')
                body[j].classList.remove('block')
                body[j].classList.add('none')
            }
        }
    })
}

              // tab menu system two coding
    
// let head = document.querySelectorAll('.tab')[0];
// let body = document.querySelectorAll('.maintab')[0];
// let headarr = Array.from(head.children)
// let bodyarr = Array.from(body.children)

// head.addEventListener('click' , function(e){
//     const clickCurrentDiv = headarr.indexOf(e.target);
//     for(let i = 0; i < headarr.length; i++){
//         if(i === clickCurrentDiv){
//             headarr[i].classList.add('activebtn');
//             bodyarr[i].classList.add('block')
//             bodyarr[i].classList.remove('none')
//         }else{
//             headarr[i].classList.remove('activebtn');
//             bodyarr[i].classList.add('none')
//             bodyarr[i].classList.remove('block')
//         }
//     }
// })



                        

let accordianHead = document.querySelectorAll('.accordian_head');
let accordianBody = document.querySelectorAll('.accordian_body');

for(let i = 0; i < accordianHead.length; i++){
    accordianHead[i].addEventListener('click',function(){

        for(let j = 0; j < accordianHead.length; j++){
            if(i === j){

                if(accordianHead[j].classList.contains('active')){
                    accordianHead[j].classList.remove('active')
                    accordianBody[j].style.maxHeight = "0"
                }else{
                    accordianHead[j].classList.add('active');
                    accordianBody[j].style.maxHeight = "1000px"
                }
            }else{
                accordianHead[j].classList.remove('active')
                accordianBody[j].style.maxHeight = "0"
            }
        }
    })
}



