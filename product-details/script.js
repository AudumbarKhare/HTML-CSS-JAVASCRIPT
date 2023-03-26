// Product Image Gallery
const productImage = document.querySelector('.product-image-details img');
const thumbnailImages = document.querySelectorAll('.thumbnail-images img');
console.log(thumbnailImages);
thumbnailImages.forEach((img) => {
  img.addEventListener('click', () => {
    const newImageSrc = img.src.replace('-thumb', '');
    productImage.src = newImageSrc;
    thumbnailImages.forEach((img) => {
      img.classList.remove('active-img');
    });
    img.classList.add('active-img');
  });
});

// Tabbed Content
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content .tab');

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetTab = document.querySelector(targetId);
    tabLinks.forEach((link) => {
      link.parentElement.classList.remove('active');
    });
    tabContents.forEach((tab) => {
      tab.classList.remove('active');
    });
    link.parentElement.classList.add('active');
    targetTab.classList.add('active');
  });
});


//Get the button add

const addItem = document.getElementById('btn-add-item');
const minItem = document.getElementById('btn-min-item');
const itemQuantity = document.getElementById('quantity');

var item_qty = 1;

itemQuantity.value = item_qty;

//increment item
addItem.addEventListener('click', () => {

  item_qty >= 5 ? alert('I have added max no of Item.') : ++item_qty;
  itemQuantity.value = item_qty

});

minItem.addEventListener('click', () => {

  item_qty <= 1 ? alert('I have added at least one item.') : --item_qty;
  itemQuantity.value = item_qty;
});

// // Get the product image element
// const zoomProductImage = document.querySelector('.product-image');

// // Set the default zoom level
// let zoomLevel = 1;

// // Add event listeners for zoom in and zoom out on hover
// zoomProductImage.addEventListener('mouseover', () => {
//   zoomLevel = 1.2;
//   zoomProductImage.style.transform = `scale(${zoomLevel})`;
//   zoomProductImage.style.transition = 'transform 0.5s ease';
// });

// zoomProductImage.addEventListener('mouseout', () => {
//   zoomLevel = 1;
//   zoomProductImage.style.transform = `scale(${zoomLevel})`;
// });
