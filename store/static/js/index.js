/*var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });*/
  function slide(){
    if(this.window.innerWidth > 950){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 5,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });
    }
    else if(this.window.innerWidth <= 950 && this.window.innerWidth > 750){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });
    }
    else if(this.window.innerWidth <= 750 && this.window.innerWidth > 550){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });
    }
    else if(this.window.innerWidth <= 550 && this.window.innerWidth > 350){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });
    }
    else if(this.window.innerWidth <= 350 && this.window.innerWidth > 150){
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
    });
    }
  }
slide()
window.addEventListener('resize',slide)

/*************************************************/
function day(){
  document.documentElement.style.setProperty('--scroll','white');
  [...document.querySelectorAll('img')].filter(e=>e.src.includes("/static/images/circle-with-an-arrow-pointing-to-left.png")).forEach(e=>{
    e.style.filter = ''
  })
  document.documentElement.style.setProperty('--main','#007185')
  document.documentElement.style.setProperty('--col','white')
  nightMode.src= '/static/images/night-mode.png'
  document.body.style.backgroundColor=''
  document.body.style.color = ''
  document.querySelector('nav').style.backgroundColor = ''
  document.querySelector('nav').style.color = ''
  document.querySelector('section').querySelectorAll('article').forEach(e=>{
    e.style.backgroundColor=''
  })
  document.querySelector('#search').style.backgroundColor = ''
  document.querySelector('#search').querySelector('input').style.color = ''
}

function night(){
  [...document.querySelectorAll('img')].filter(e=>e.src.includes("/static/images/circle-with-an-arrow-pointing-to-left.png")).forEach(e=>{
    e.style.filter = 'grayScale(1)'
  })
  document.documentElement.style.setProperty('--scroll','rgb(31, 31, 31)')
  document.documentElement.style.setProperty('--main','#e3e3e3')
  document.documentElement.style.setProperty('--col','black')
  nightMode.src= '/static/images/day-and-night.png'
  document.body.style.backgroundColor='#292a2d'
  document.body.style.color = '#e3e3e3'
  document.querySelector('nav').style.backgroundColor = '#1f1f1f'
  document.querySelector('nav').style.color = '#e3e3e3'
  document.querySelector('section').querySelectorAll('article').forEach(e=>{
    e.style.backgroundColor='#1f1f1f'
  })
  document.querySelector('#search').style.backgroundColor = '#3c4043'
  document.querySelector('#search').querySelector('input').style.color = 'white'
}

if(localStorage.getItem('dayMode')=='n')
night()
if(localStorage.getItem('dayMode')=='d')
day()
if(localStorage.getItem('dayMode') == null)
localStorage.setItem('dayMode','d')

document.querySelector('#nightMode').addEventListener('click',function(){
  if(localStorage.getItem('dayMode')=='d'){
    localStorage.setItem('dayMode','n')
    night()
  }
  else{
    localStorage.setItem('dayMode','d')
    day()
  }
})

/************************************/
let searchFunc = async function(){
  location.replace(`/controlPanel/products/search/?ind=${this.nextElementSibling.value}`)
  }
document.querySelector('#search').querySelector('b').addEventListener('click',searchFunc)
document.addEventListener('keypress',function(e){
  if(e.key == 'Enter'&&document.querySelector('#search').querySelector('input').value!=''){
    location.replace(`/controlPanel/products/search/?ind=${document.querySelector('#search').querySelector('input').value}`)
  }
})

