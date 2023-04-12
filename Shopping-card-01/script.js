window.onload = () => {
    const shopping_cart_item = [];
    const shoppingCart = document.querySelector('.shopping-cart-right');
    const alert_box = document.querySelector('.alert');
    const alert_message = document.querySelector('.alert-message p');
    const alert_close = document.querySelector('.alert-message .alert-close');
    const delivery_date = document.querySelector('.delivery-date-info p');

    var discount_per = 0;
    async function getData() {
        const response = await fetch('https://fakestoreapi.com/products?limit=5');
        const data = await response.json();
        return data;
    }

    getData().then(data => {
        // Do something with the retrieved data
        shopping_cart_item.push(...data);
        showShappingCartItem(shopping_cart_item);
    }).catch(error => {
        // Handle any errors that occurred during the fetch request
        console.error(error);
    });


    function showShappingCartItem(products) {
        let html = "";
        products.forEach(product => {
            html += ` <div class="product-details-info">
            <div class="item-img">
                <img src="${product.image}" />
            </div>

            <div class="shopping-cart-details">
                <p class="item-name"><strong>${product.title}</strong></p>
                <p class="item-price">Price : <span>$${product.price.toFixed(2)}</span></p>

                <div class="items-counts">
                    <button class="btn-plus add"><i class="fa fa-plus add" aria-hidden="true"></i></button>
                    <input type="text" class="item-quantity" value="1" />
                    <button class="btn-mins minus"><i class="fa fa-minus minus" aria-hidden="true"></i></button>
                </div>

                <div class="extra-link">
                    <a href="#"><i class="fa fa-heart" aria-hidden="true"></i>Add To Favourite</a>
                    <a href="#"><i class="fa fa-eye" aria-hidden="true"></i>View Product</a>
                    <a href="#" id="${product.id}" class="remove-item"><i class="fa fa-trash" aria-hidden="true"></i>Remove</a>
                </div>
            </div>
        </div>`;
        });
        shoppingCart.innerHTML = `<div class="product-length"><h3>${products.length === 0 ? `Your Cart is empty.` : `Cart (${products.length} item)`}</h3></div> ${html}`;
        updateCart();
        generateRandomCoupon();
        show_delivery_date();

        const itemCount = document.querySelector('.shopping-cart-details div.items-counts');
        const removeItem = document.querySelectorAll('div.extra-link');

        itemCount.addEventListener('click', (e) => {
            console.log(e.target.classList.contains('add'));
            if (e.target.classList.contains('add')) {
                incrementItemToCart(itemCount);
            } else if (e.target.classList.contains('minus')) {
                decrementItemFromCart(itemCount);
            }
        });

        removeItem.forEach(i => {
            i.querySelector('.remove-item').addEventListener('click', () => {
                const id = i.querySelector('.remove-item').getAttribute('id');
                shopping_cart_item.forEach((remove, index) => {
                    if (remove.id == id) {
                        const isDelete = confirm('Are you sure you want to delete this item from your cart?');
                        if (!isDelete) return;
                        shopping_cart_item.splice(index, 1);
                        showShappingCartItem(shopping_cart_item);
                    }

                });
            })
        })
    }

    // Function to update the cart when the quantity of an item changes
    function updateCart() {
        let subtotal = 0;
        let tax = 0;
        let discount = 0;
        let total_amount = 0;

        const product = document.querySelectorAll('.shopping-cart-details');

        product.forEach(input => {
            const price = parseFloat(input.querySelector('p.item-price span').textContent.replace('$', '')).toFixed(2);
            const qty = parseInt(input.querySelector('div.items-counts input').value);

            const itemPrice = price * qty;
            subtotal += itemPrice;
        });
        tax = subtotal * 10 / 100;
        discount = subtotal * discount_per / 100;
        total_amount = (tax + subtotal) - discount;
        document.querySelector('.shopping-cart-calculation p.subtotal span').textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector('.shopping-cart-calculation p.tax span').textContent = `$${tax.toFixed(2)}`;
        document.querySelector('.shopping-cart-calculation p.discount label').textContent = `(${discount_per}%)`
        document.querySelector('.shopping-cart-calculation p.discount span').textContent = `$${discount.toFixed(2)}`;
        document.querySelector('.shopping-cart-calculation p.total span').textContent = `$${total_amount.toFixed(2)}`;
    }

    function incrementItemToCart(input) {
        const quantity = parseInt(input.querySelector('.item-quantity').value);
        if (quantity < 10) {
            input.querySelector('.item-quantity').value = quantity + 1;
        }
        updateCart();
    }

    function decrementItemFromCart(input) {
        const quantity = parseInt(input.querySelector('.item-quantity').value);
        if (quantity > 1) {
            input.querySelector('.item-quantity').value = quantity - 1;
        }
        updateCart();
    }

    function generateRandomCoupon() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var randomCoupon = "";
        for (var i = 0; i < 6; i++) {
            var randomNum = Math.floor(Math.random() * chars.length);
            randomCoupon += chars.substring(randomNum, randomNum + 1);
        }
        return randomCoupon;
    }

    var new_coupon_code = generateRandomCoupon()
    document.querySelector('.discount-coupon-no b').textContent = new_coupon_code;

    document.querySelector('.btn-apply').addEventListener('click', () => {
        discount_per = Math.floor(Math.random() * 10) + 1;
        const coupon_code = document.querySelector('.txt-discount-coupon').value;

        if (new_coupon_code === coupon_code) {
            updateCart();
            alert_message.innerHTML = `<strong>Congratulations !!</strong> You get ${discount_per}% Discount !`;
            alert_box.style.display = 'flex';
            document.querySelector('.btn-apply').setAttribute('disabled', true);
            setInterval(() => { alert_box.style.display = 'none' }, 5000);
        }
    });

    alert_close.addEventListener('click', () => {
        alert_box.style.display = 'none';
    });

   function show_delivery_date(){
        const after_day = Math.floor(Math.random()*10)+1;
        const date = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const currentDateString = date.toLocaleDateString('en-IN', options);

        date.setDate(date.getDate() + after_day);
        const nextDateString = date.toLocaleDateString('en-IN', options);
        delivery_date.innerHTML = `${currentDateString} - ${nextDateString}`
       // console.log();

    }
}