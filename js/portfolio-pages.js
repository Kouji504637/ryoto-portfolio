const menuButton=document.querySelector('.hamburger');
const siteMenu=document.querySelector('#menu');
menuButton?.addEventListener('click',()=>{const expanded=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!expanded));siteMenu?.classList.toggle('open',!expanded)});
siteMenu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menuButton?.setAttribute('aria-expanded','false');siteMenu.classList.remove('open')}));
const toTop=document.querySelector('.portfolio-top');
window.addEventListener('scroll',()=>toTop?.classList.toggle('visible',window.scrollY>300),{passive:true});
