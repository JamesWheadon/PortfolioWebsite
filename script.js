var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");

setInterval(showSlides, 5000); // Change image every 5 seconds

function showSlides() {
    var i;
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex].style.display = "block";
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0
    }
}
