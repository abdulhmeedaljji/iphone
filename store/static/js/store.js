if(true){
    var cart = products;
}
else{
    var cart = JSON.parse(localStorage.getItem('cart'))
    updateCart()
}

document.querySelector('#products').querySelectorAll('#addToCart').forEach((x)=>{
    x.addEventListener('click',(e)=>{
        let prodName = e.target.parentElement.parentElement.querySelector('.subTitle').innerText;
        if(cart[prodName][0]<1){
            let prodPrice = e.target.parentElement.parentElement.querySelector('.title').innerText;
            let prodImg = e.target.parentElement.parentElement.querySelector('img').src;
            let div1 = document.createElement('div');
            div1.classList.add('prod')
            let img = document.createElement('img');
            img.src = prodImg;
            img.style.height= '100%';
            let i = document.createElement('i')
            i.classList.add('fa-remove')
            i.classList.add('fa')
            div1.appendChild(img);
            div1.appendChild(i);
            let div2 = document.createElement('div');
            let div21 = document.createElement('div');
            div21.classList.add('subTitle');
            div21.innerHTML = prodName;
            let div22 = document.createElement('div');
            div22.classList.add('title');
            let div221 = document.createElement('span');
            div221.innerHTML = prodPrice;
            div22.appendChild(div221)
            let div222 = document.createElement('span');
            div222.style='background-color:var(--black);color:white;border-radius:100px;padding:2px;margin-right:5px;'
            div222.innerHTML = `1`;
            div22.appendChild(div222)
            div2.appendChild(div21)
            div2.appendChild(div22)
            div1.appendChild(div2)
            let element = document.querySelector('#cart').querySelector('#total')
            element.parentNode.insertBefore(div1, element);
            cart[prodName][0]++;
            cart[prodName][2]=prodImg
            document.querySelector('#cart').querySelectorAll('i').forEach((x)=>{
                x.addEventListener('click',(e)=>{
                    cart[e.target.parentElement.querySelector('.subTitle').innerHTML][0]=0
                    document.querySelector('#cart').removeChild(e.target.parentElement)
                    cart[e.target.parentElement.querySelector('div').querySelector('.subTitle').innerHTML][0]=0;
                    localStorage.setItem('cart',JSON.stringify(cart))
                    let x = 0;
                    for(let [h,y] of Object.entries(cart)){
                        if(h!='total'){
                            x += (y[0]*y[1]);
                        }
                    }
                    cart.total = x;
                    document.querySelector('#total').innerHTML = `المجموع الكلي: ${cart.total}`
                })
            })
        }
        else{
            document.querySelector('#cart').querySelectorAll('.prod').forEach((x)=>{
                if(x.querySelector('div').querySelector('.subTitle').innerHTML==prodName){
                    x.querySelector('div').querySelector('.title').querySelectorAll('span')[1].innerHTML = cart[prodName][0]+1
                }
            })
            cart[prodName][0]++
        }
        let x = 0;
        for(let [h,y] of Object.entries(cart)){
            if(h!='total'){
                x += (y[0]*y[1]);
            }
        }
        cart.total = x;
        console.log(cart.total)
        document.querySelector('#total').innerHTML = `المجموع الكلي: ${cart.total}`
        localStorage.setItem('cart',JSON.stringify(cart))
    })
})

document.querySelector('#cart').querySelector('.but').addEventListener('click',async()=>{
    if(cart.total > 0){
        localStorage.setItem('cart',JSON.stringify(cart));
        location.replace('./form')
    }
})

/********************************************************************/

function updateCart(){
    //iterate over all the products
    for(let [name,o] of Object.entries(cart)){
        if(name != 'total' && o[0] != 0){
            let prodName = name;
            let prodPrice = o[1];
            let prodImg = o[2];
            let quant = o[0]
            /**********************/
            let div1 = document.createElement('div'); //
            div1.classList.add('prod') //
            let img = document.createElement('img');  //
            img.src = prodImg;
            img.style.height= '100%'; //
            let i = document.createElement('i') //
            i.classList.add('fa-remove') //
            i.classList.add('fa') //
            div1.appendChild(img); //
            div1.appendChild(i); //
            let div2 = document.createElement('div'); //
            let div21 = document.createElement('div'); //
            div21.classList.add('subTitle'); //
            div21.innerHTML = prodName;
            let div22 = document.createElement('div'); //
            div22.classList.add('title'); //
            let div221 = document.createElement('span'); //
            div221.innerHTML = `${prodPrice} جنيه مصري`;
            div22.appendChild(div221) //
            let div222 = document.createElement('span'); //
            div222.style='background-color:#5A3733;color:white;border-radius:100px;padding:2px;margin-right:5px;' //
            div222.innerHTML = quant;
            div22.appendChild(div222) //
            div2.appendChild(div21) //
            div2.appendChild(div22) //
            div1.appendChild(div2) //
            /*******************************/
            let element = document.querySelector('#cart').querySelector('#total')
            element.parentNode.insertBefore(div1, element);
            /*Update the sum*/
            let p = 0;
            for(let [h,y] of Object.entries(cart)){
                if(h!='total'){
                    p += (y[0]*y[1]);
                }
            }
            document.querySelector('#total').innerHTML = `المجموع الكلي: ${p}`
            /* Deleting the product from the cart */
            document.querySelector('#cart').querySelectorAll('i').forEach((x)=>{
                x.addEventListener('click',(e)=>{
                    //remove from the cart
                    cart[e.target.parentElement.querySelector('.subTitle').innerHTML][0]=0
                    //remove from UI
                    document.querySelector('#cart').removeChild(e.target.parentElement)
                    cart[e.target.parentElement.querySelector('div').querySelector('.subTitle').innerHTML][0]=0;
                    //send the updated cart to the server
                    localStorage.setItem('cart',JSON.stringify(cart))
                    let x = 0;
                    for(let [h,y] of Object.entries(cart)){
                        if(h!='total'){
                            x += (y[0]*y[1]);
                        }
                    }
                    cart.total = x;
                    document.querySelector('#total').innerHTML = `المجموع الكلي: ${cart.total}`
                })
            })
        }
    }
}

nextP.addEventListener('click',function(){
    this.classList.add('hidden2')
    let nonHidden = [...document.querySelectorAll('.p')].filter(e=>e.classList.contains('hidden')==false)
    let lastNonHiddenInd = nonHidden.at(-1).getAttribute('ind') - 1;
    [...document.querySelectorAll('.p')].forEach((e,i)=>{
        if(i>lastNonHiddenInd&&i<=6+lastNonHiddenInd)
        e.classList.remove('hidden')
    });
    [...document.querySelectorAll('.p')].forEach((e,i)=>{
        if(i<=lastNonHiddenInd&&i>=Math.abs(nonHidden.at(0).getAttribute('ind') - 1))
        e.classList.add('hidden')
    })
    lastP.classList.remove('hidden2')
    console.log(document.querySelectorAll('.p').length > 6+lastNonHiddenInd)
    if(document.querySelectorAll('.p').length > 6+lastNonHiddenInd)
    nextP.classList.remove('hidden2')
})

lastP.addEventListener('click',function(){
    this.classList.add('hidden2')
    let nonHidden = [...document.querySelectorAll('.p')].filter(e=>e.classList.contains('hidden')==false)
    let firstNonHiddenInd = nonHidden.at(0).getAttribute('ind') - 1;
    console.log(firstNonHiddenInd);
    [...document.querySelectorAll('.p')].forEach((e,i)=>{
        if(i>=firstNonHiddenInd&&i<=5+firstNonHiddenInd)
        e.classList.add('hidden')
    });
    [...document.querySelectorAll('.p')].forEach((e,i)=>{
        if(i<firstNonHiddenInd&&i>=Math.abs(5-firstNonHiddenInd))
        e.classList.remove('hidden')
    })
    if(firstNonHiddenInd != 5)
    this.classList.remove('hidden2')
    nextP.classList.remove('hidden2')
})

if([...document.querySelectorAll('.p')].length < 5){
    nextP.classList.add('hidden2')
}

document.querySelector('.side').querySelector('.but').addEventListener('click',()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
    location.replace('/form')
})

if(window.innerWidth > 834){
    document.querySelector('footer').querySelector('img').src= ' /static/images/payment2.png'
}
else{
    document.querySelector('footer').querySelector('img').src= ' /static/images/payment.png'
}

window.addEventListener('resize',()=>{
    if(window.innerWidth > 834){
        document.querySelector('footer').querySelector('img').src= ' /static/images/payment2.png'
    }
    else{
        document.querySelector('footer').querySelector('img').src= ' /static/images/payment.png'
    }
})


const observer = new window.IntersectionObserver(([entry]) => {
    const para = document.querySelector('#col');
    const compStyles = window.getComputedStyle(para).flexDirection
    console.log(compStyles)
    console.log(entry.boundingClientRect.top)
    if (entry.isIntersecting) {
      console.log('Enter')
      return
    }
    if(window.innerWidth < 1015){
        if(compStyles == 'column'){
            document.querySelector('#col').style = 'flex-direction:column-reverse!important'
        }
        else{
            document.querySelector('#col').style = 'flex-direction:column!important'
        }
    }
    
    
    if (entry.boundingClientRect.top > 0) {
    } else {
    }
  }, {
    root: null,
    threshold: 0,
  })
observer.observe(document.querySelector('#cart'))

document.querySelector('nav').querySelectorAll('div')[0].addEventListener('click',()=>{
    location.replace('/')
})

document.querySelector('nav').querySelectorAll('div')[1].addEventListener('click',()=>{
    location.replace('/form')
})