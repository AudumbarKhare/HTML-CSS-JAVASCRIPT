var cartTable = document.getElementById('cart-table');
const table = document.querySelector('#cart-table tbody');

//fetch data from fakestoreapi.com to show into table.
$.ajax({
  url: 'https://fakestoreapi.com/products?limit=5',
  success: function (data) {
    showCartItem(data);
  }
});

function showCartItem(data) {
  let html = '';
  data.forEach(item => {
    // Create a new row for the item in the table
    html += `
        <tr>
          <td>${item.title}</td>
          <td><img class="product-image" src="${item.image}" /></td>
          <td class="price_per_quantity">$${item.price.toFixed(2)}</td>
          <td class="quantity">
            <button class="minus" disabled>-</button>
            <input type="text" value="1" min="1" max="10">
            <button class="add">+</button>
          </td>
          <td class="item_total_price">$${item.price.toFixed(2)}</td>
          <td class="actions"><button class="delete">Delete</button></td>
        </tr>`;
  });
  // Add the new rows to the cart table
  table.innerHTML = html;
  const deleteButton = document.querySelectorAll('td.actions button.delete');
  deleteButton.forEach(button => {
    button.addEventListener('click', deleteFromCart)
  })
  updateCart();
}

// Function to update the cart when the quantity of an item changes
function updateCart() {
  const quantityInput = document.querySelectorAll('.quantity input');
  let subTotal = 0;
  let tax = 0;
  let discount = 0;
  let total = 0;

  quantityInput.forEach(input => {
    const row = input.closest('tr');
    const quantity = parseInt(input.value);
    const price = parseInt(row.querySelector('.price_per_quantity').textContent.replace('$', ''));
    const itemTotal = price * quantity;
    row.querySelector('td.item_total_price').textContent = `$${itemTotal.toFixed(2)}`
    subTotal += itemTotal;
  });

  tax = subTotal * 10 / 100; //10% tax
  discount = subTotal >= 50 ? subTotal * 10 / 100 : 0; //10% discount if subtotal is greater than $50
  total = (subTotal + tax) - discount;
  document.querySelector('#totals .subtotal').textContent = `Subtotal : $${subTotal.toFixed(2)}`;
  document.querySelector('#totals .tax').textContent = `Tax : $${tax.toFixed(2)}`;
  document.querySelector('#totals .discount').textContent = `Discount : $${discount.toFixed(2)}`;
  document.querySelector('#totals .total_amount').textContent = `Total : $${total.toFixed(2)}`
}

//add event listeners to the add and minus
cartTable.addEventListener('click', e => {
  if (e.target.classList.contains('add')) {
    addItemToCart(e.target.closest('tr'));
  } else if (e.target.classList.contains('minus')) {
    removeItemFromCart(e.target.closest('tr'));
  }
});

//

//function to add an item to the cart
function addItemToCart(row) {
  const input = row.querySelector('td.quantity input');
  const qty = parseInt(input.value);
  if (qty < 10) {
    input.value = qty + 1;
    row.querySelector('button.minus').removeAttribute('disabled');
  }
  updateCart();
}

//function to remove an item from the cart
function removeItemFromCart(row) {
  const input = row.querySelector('td.quantity input');
  const qty = parseInt(input.value);
  if (qty > 1) {
    input.value = qty - 1;
  } else {
    //row.remove();
    cartTable.querySelector('tbody tr td.quantity button.minus').setAttribute('disabled', true);
  }
  updateCart();
}

function deleteFromCart(e) {
  const isDelete = confirm('Are you sure you want to delete this item from your cart?');
  if(!isDelete){
    return;
  }
  e.target.closest('tr').remove();
  if (cartTable.querySelectorAll('tbody tr').length === 0) {
    table.innerHTML = `<tr><td colspan="5" style="text-align:center;">No More Item into cart</td></tr>`
  }
  updateCart();
}