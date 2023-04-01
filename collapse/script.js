var coll = document.getElementsByClassName("collapsible");
// const angleDown = document.getElementsByClassName('fa-angle-down');
// console.log(angleDown);
var i;

for (i = 0; i < coll.length; i++) {
  //console.log(i);
  coll[i].addEventListener("click", function () {
    this.querySelector('.fa-angle-down').classList.toggle('rotate');
    this.classList.toggle("active");

    var content = this.nextElementSibling;
    console.log(content.style.display);
    if (content.style.display === "block" || content.style.display=="") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



const priceRange = document.getElementById("priceRange");
const minPrice = document.querySelector(".min-price");
const maxPrice = document.querySelector(".max-price");

priceRange.addEventListener("input", function () {
  const value = parseInt(priceRange.value);
  const min = parseInt(priceRange.min);
  const max = parseInt(priceRange.max);
  const range = max - min;
  const position = ((value - min) / range) * 100;

  minPrice.textContent = "$" + value.toLocaleString();
  maxPrice.textContent = "$" + max.toLocaleString();

  priceRange.style.background = `linear-gradient(to right, #007bff 0%, #007bff ${position}%, #ddd ${position}%, #ddd 100%)`;
});
