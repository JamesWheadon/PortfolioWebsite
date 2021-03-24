let slideIndex = 0;
const slides = document.getElementsByClassName("mySlides");

setInterval(function() {
  for (var i = 0; i < slides.length; i++) {
    slides[i].style.opacity = 0;
  }
  slideIndex = (slideIndex != slides.length - 1) ? slideIndex + 1 : 0;
  slides[slideIndex].style.opacity = 1;
}, 5000);