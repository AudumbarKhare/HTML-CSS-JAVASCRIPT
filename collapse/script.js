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




const itemsPerPage = 10;
let currentPage = 1;
let data = [];

// retrieve data from fakestoreapi.com
$.ajax({
  url: "https://fakestoreapi.com/products",
  success: function(response) {
    data = response;
    updateData();
    updatePagination();
  }
});

// update the display of the data based on the current page
function updateData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToDisplay = data.slice(startIndex, endIndex);
  let html = "";
  dataToDisplay.forEach(item => {
    html += `<div class="product-card">
    <div class="product-image">
      <img src="${item.image}" alt="${item.image}">
    </div>
    <div class="product-info">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="price">${item.price}</div>
      <button class="add-to-cart"><i class="fa fa-cart-plus" aria-hidden="true"></i></button>
      <button class="add-to-favorite"><i class="fa fa-heart-o" aria-hidden="true"></i></button>
      <a href="./pages/product-details.html" class="view-product"><i class="fa fa-eye" aria-hidden="true"></i></a>
    </div>
    </div>`;
  });
  $("#product").html(html);
}

// update the pagination links based on the number of pages required
function updatePagination() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  let html = "";
  for (let i = 1; i <= totalPages; i++) {
    html += `<a href="#" data-page="${i}">${i}</a>`;
  }
  $("#pagination-container").html(html);
  $("#pagination-container a").click(function(event) {
    event.preventDefault();
    currentPage = parseInt($(this).attr("data-page"));
    updateData();
    updatePagination();
  });
}

