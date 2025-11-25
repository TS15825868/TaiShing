
// ultra.js - simple hero carousel
document.addEventListener('DOMContentLoaded', function(){
  const slides = document.querySelectorAll('.hero .slide');
  if(!slides.length) return;
  let idx = 0;
  slides[idx].classList.add('active');
  setInterval(()=> {
    slides[idx].classList.remove('active');
    idx = (idx+1) % slides.length;
    slides[idx].classList.add('active');
  }, 5000);
});
