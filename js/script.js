// меню бургер
let headerNav = document.querySelector('.header-navBut');
document.querySelector('.header-burger').addEventListener('click', () =>{
   headerNav.classList.toggle('active');
   document.querySelector('.header-burger').classList.toggle('active');
   document.body.classList.toggle('lock')
});
// ленивая загрузка
const options = {threshold: [.1, .4, .95]}; 
let interRat = .4;
const windowWidth = window.innerWidth;
if(windowWidth <= 890){
   options.threshold = [.1, .2, .95];
   interRat = .2;
} else{
   options.threshold = [.1, .4, .95];
   interRat = .4;
};
const observer = new IntersectionObserver((entries) =>{
   entries.forEach(entry =>{
      let targetBlock = entry.target;
      if(entry.isIntersecting && entry.intersectionRatio >= .1){
         targetBlock.classList.remove('lazy-loading');
      };
      if(entry.isIntersecting && entry.intersectionRatio >= interRat){
         if(document.querySelector('.scrollActive')){
            document.querySelector('.scrollActive').classList.remove('scrollActive');
         };
         if(targetBlock.hasAttribute('id')){
            let id = targetBlock.getAttribute('id');
            document.querySelector(`[data-section="#${id}"]`).classList.add('scrollActive');    
         };
      };
   });
}, options);
document.querySelectorAll('[class*="_container"]').forEach((item) =>{
   observer.observe(item);
}); 
// навигация
let navLink = document.querySelectorAll('[data-section]');
for(item of navLink){
   item.addEventListener('click', event =>{
      let targetElement = document.querySelector(event.target.dataset.section);
      let scroll = (targetElement.getBoundingClientRect().top) + window.pageYOffset - 164;
      window.scrollTo({
         top: scroll,
         behavior: 'smooth'
      });
      event.preventDefault();
      headerNav.classList.remove('active');
      document.querySelector('.header-burger').classList.remove('active');
      document.body.classList.remove('lock')
   });
};
// аккардеон
document.querySelectorAll('.accordion_item').forEach(item =>{
   let itemText = item.querySelector('.accordion_itemText');
   itemText.style.height='0';
   const itemTextHeight = itemText.scrollHeight;
   item.querySelector('.accordion_itemH').addEventListener('click', (event) =>{
      event.currentTarget.classList.toggle('accordion_itemH__active');
      itemText.classList.toggle('accordion_itemText__active');
      if(itemText.classList.contains('accordion_itemText__active')){
         itemText.style.height = itemTextHeight + 20 + 'px';
      } else{
         itemText.style.height='0';
      };
   });
});