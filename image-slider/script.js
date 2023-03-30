let brandSlider = document.querySelector(".brand-slider");
let brandSlides = document.querySelectorAll(".brand-slide");
let brandPrevBtn = document.querySelector(".brand-slider-container .prev-btn");
let brandNextBtn = document.querySelector(".brand-slider-container .next-btn");
let brandSlideIndex = 0;
let brandSlideInterval = setInterval(brandNextSlide, 3000);

function brandNextSlide() {
  brandSlideIndex++;
  if (brandSlideIndex > brandSlides.length - 4) {
    brandSlideIndex = 0;
  }
  brandSlider.style.transform = `translateX(-${brandSlideIndex * (100 / 4)}%)`;
}

function brandPrevSlide() {
  brandSlideIndex--;
  if (brandSlideIndex < 0) {
    brandSlideIndex = brandSlides.length - 4;
  }
  brandSlider.style.transform = `translateX(-${brandSlideIndex * (100 / 4)}%)`;
}

brandNextBtn.addEventListener("click", brandNextSlide);
brandPrevBtn.addEventListener("click", brandPrevSlide);

window.addEventListener("resize", () => {
  brandSlideIndex = 0;
  brandSlider.style.transform = `translateX(-${brandSlideIndex * (100 / 4)}%)`;
});
