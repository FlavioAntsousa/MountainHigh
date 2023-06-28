

/* $(window).on('beforeunload', function(){
      $(window).scrollTop(0);
}); */
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      if (this.mobileMenu) {
        this.addClickEvent();
      }
      return this;
    }
  }
  
  const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
  );
  mobileNavbar.init();


/* 
  function myFunction() {
    var element = document.body;
    element.classList.toggle("nav-depois");
  } */

/*   function meternav(){
    document.getElementById('inicio').innerHTML = "Inicio";
  }
  function tirarnav(){
    document.getElementById('inicio').innerHTML= " ";
  }
  
 */
  
/*   function scroll() {
    if (window.pageYOffset > 700) {
        try {
            document.getElementById('footer').className = 'footer2'
            
          } catch (e) {
            false
        }
    } else {
        try {
            document.getElementById('footer2').className = 'footer'

          } catch (e) {
            false
        }
    }
}
window.addEventListener('scroll', scroll);
 */
/* document.getElementById("body").onscroll = function myFunction() {  
    var scrolltotop = document.scrollingElement.scrollTop;
    var target = document.getElementById("main1");
    var xvalue = "center";
    var factor = 0.5;
    var yvalue = scrolltotop * factor;
    target.style.backgroundPosition = xvalue + " " + yvalue + "px";
  } */



