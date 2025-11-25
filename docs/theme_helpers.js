// theme helper - keeps simple
document.addEventListener('click', function(e){
  if(e.target.matches('.nav a')) document.body.classList.remove('menu-open');
});