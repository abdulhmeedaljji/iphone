let news = document.querySelector('#news').querySelectorAll('input')
let newData = document.querySelector('.addConsult').querySelectorAll('input')
let editData = document.querySelector('.editConsult').querySelectorAll('input')
let newsTXT = document.querySelector('.addConsult').querySelector('textarea')
let editTXT = document.querySelector('.editConsult').querySelector('textarea')
/*********************************************************/

document.querySelector('#refresh2').addEventListener('click',async()=>{
    if(newData[0].value!=0||newData[1].value!=0||newData[2].value!=0){
        /*let newsArr = []
        for(let y=0;y<document.querySelector('.addConsult').querySelectorAll('fieldset')[4].querySelectorAll('input').length;y++){
            if(document.querySelector('.addConsult').querySelectorAll('fieldset')[4].querySelectorAll('input')[y].value!='')
            newsArr.push(document.querySelector('.addConsult').querySelectorAll('fieldset')[4].querySelectorAll('input')[y].value)
        }
        console.log(newsArr)*/
        await fetch(`/controlPanel/products/add/?name=${newData[0].value}&img=${newData[1].value.split('\\')[2]}&price=${newData[2].value}&date=${[...newData].at(-1).value}`)
        .then(()=>{
            document.querySelector('#loading-wrapper').classList.remove('hidden')
            document.querySelector('section').classList.add('hidden')
        })
    }
    location.reload()
})

document.querySelector('#refresh3').addEventListener('click',async()=>{
    if(true){
        /*let newsArr2 = []
        for(let y=0;y<document.querySelector('.editConsult').querySelectorAll('fieldset')[4].querySelectorAll('input').length;y++){
            if(document.querySelector('.editConsult').querySelectorAll('fieldset')[4].querySelectorAll('input')[y].value!='')
            newsArr2.push(document.querySelector('.editConsult').querySelectorAll('fieldset')[4].querySelectorAll('input')[y].value)
        }*/
        await fetch(`/controlPanel/products/edit/?ind=${[...document.querySelectorAll('tr')].filter((_,i)=>i!=0)[ind2].getAttribute('num-id')}&name=${editData[0].value}&img=${editData[1].value.split('\\')[2]}&price=${editData[2].value}&date=${[...editData].at(-1).value}`)
        .then(()=>{
            document.querySelector('#loading-wrapper').classList.remove('hidden')
            document.querySelector('section').classList.add('hidden')
        })
    }
    location.reload()
})


document.querySelectorAll('.plus').forEach((e)=>{
    e.addEventListener('click',()=>{
        newInput(e.parentElement.querySelector('div'))
    })
})

document.querySelector('.addConsult').querySelector('div').addEventListener('click',(e)=>{
    e.target.parentElement.classList.add('hidden')
    e.target.parentElement.parentElement.querySelector('#news').classList.remove('hidden')
})

document.querySelector('.editConsult').querySelector('div').addEventListener('click',(e)=>{
    e.target.parentElement.classList.add('hidden')
    e.target.parentElement.parentElement.querySelector('#news').classList.remove('hidden')
})
document.querySelector('section').querySelector('div').addEventListener('click',(e)=>{
    e.target.parentElement.parentElement.querySelector('.addConsult').classList.remove('hidden')
    e.target.parentElement.classList.add('hidden')
})

/***************************************/

document.querySelectorAll('.switch').forEach(e=>{
    e.addEventListener('click',async function(evt){
        evt.preventDefault()
        if(this.querySelector('input').checked == false){
            this.querySelector('input').checked = true
            await fetch(`/controlPanel/products/favon/?ind=${e.closest('tr').getAttribute('num-id')}`)
            .then((e)=>e.json())
            .then((e)=>{
                console.log(e)
                if(e==true)
                location.reload()
                else{
                    alert('لقد وصلت للحد الأقصي في المنتجات المميزة')
                    location.reload()
                }
            })
        }else{
            this.querySelector('input').checked = true
            await fetch(`/controlPanel/products/favoff/?ind=${e.closest('tr').getAttribute('num-id')}`)
            .then((e)=>{location.reload()})
        }
    },{once:true})
})

function newInput(x){
    x.appendChild(document.createElement('input'))
}
