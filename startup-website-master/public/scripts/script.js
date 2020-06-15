
var mybutton = document.querySelector("#myBtn");

var counters = document.querySelectorAll(".count");
var speed = 200;




var  a  = document.querySelector('.animate__bounce');
var  b  = document.querySelector('.header-p');
var  c = document.querySelector('.about-h1');
var d       = document.querySelector('.about-p');
if(a){
    gsap.from(".animate__bounce", {duration: 1.5, x: 1000, opacity: 0, scale: 0.5});
}
if(b){
  gsap.from(".header-p", {duration: 1.5, x: -1000, opacity: 0, scale: 1});

}


$(document).ready(function(){
  $(".owl-carousel").owlCarousel();
});

      window.onscroll = function(){

        var navBar = document.querySelector('.navbar');
        console.log(navBar);
        console.log(navBar.classList);

        if(document.body.scrollTop > 5){
          navBar.classList.add('scroll-nav');
        }else{
          navBar.classList.remove('scroll-nav');
        }

        if(counters && document.body.scrollTop > 1200){
          counters.forEach(counter => {
            const updateCount = () =>{
              const target = +counter.getAttribute('data-target');
          
              const count = +counter.innerText;
          
              const inc = target / speed;
          
              console.log(count);
          
              
              if(count < target){
                counter.innerText = count+inc;
                setTimeout(updateCount,1);
          
              }else{
                count.innerText = target;
              }
            }
          
            updateCount();
          })
          
        }
        if(document.body.scrollTop > 30 ){
          mybutton.style.display = "block";
        }else{
          mybutton.style.display = "none";
        }
      }





      function topFunction(){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }

