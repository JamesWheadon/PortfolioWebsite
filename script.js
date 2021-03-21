let slideIndex = 0;
const slides = document.getElementsByClassName("mySlides");

setInterval(function() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  slideIndex = (slideIndex != slides.length - 1) ? slideIndex + 1 : 0;
  slides[slideIndex].style.opacity = 1;
}, 5000);

function openNav() {
    document.getElementById("SidenavBar").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("SidenavBar").style.width = "0";
    document.body.style.backgroundColor = "white";
  }