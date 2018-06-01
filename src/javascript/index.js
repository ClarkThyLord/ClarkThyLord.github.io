window.onload = function() {

  // Star-up slides with cycle
  showSlides(slidesIndex);
  setTimeout(autoSlides, 3500);

};


// Local Variables
var slidesIndex = 0,
  slidesAuto = true;

function setSlide(slideNumber) {

  showSlides(slideNumber);

}

function showSlides(slideNumber) {
  // Make refrences to DOM objects
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");

  if (slideNumber >= slides.length) {

    slidesIndex = 0;

  } else if (slideNumber < 0) {

    slidesIndex = slides.length - 1;

  } else {

    slidesIndex = slideNumber;

  }

  // Cycle through and set-up DOM objects
  for (var num = 0; num < slides.length; num++) {

    slides[num].style.display = "none";

  }
  for (var num = 0; num < dots.length; num++) {

    dots[num].classList.remove("active");

  }

  // Set-up classes to DOM objects
  slides[slidesIndex].style.display = "inline";
  dots[slidesIndex].classList.add("active");

}

function autoSlides() {
  if (slidesAuto === true) {
    // Make refrences to DOM objects
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");

    // Cycle through and set-up DOM objects
    for (var num = 0; num < slides.length; num++) {

      slides[num].style.display = "none";

    }
    for (var num = 0; num < dots.length; num++) {

      dots[num].classList.remove("active");

    }

    // Move to the next slide
    slidesIndex++;

    if (slidesIndex >= slides.length) {

      slidesIndex = 0;

    }

    // Set-up classes to DOM objects
    slides[slidesIndex].style.display = "inline";
    dots[slidesIndex].classList.add("active");

    // Cycle again if auto sliding is still true
    if (slidesAuto === true) {
      setTimeout(function() {
        if (slidesAuto === true) {
          autoSlides();
        }
      }, 3500);

    }
  }

}