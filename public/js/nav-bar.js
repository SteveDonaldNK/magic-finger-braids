const cartBadge = document.querySelectorAll(".cart");
const favBadge = document.querySelectorAll(".fav");
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const fav = JSON.parse(localStorage.getItem('favorites')) || [];

(cartItems.length === 0) ? cartBadge.forEach(badge => badge.classList.add('d-none')) : cartBadge.forEach(badge => {
    badge.classList.remove('d-none');
    badge.innerHTML = cartItems.length
});

(fav.length === 0) ? favBadge.forEach(badge => badge.classList.add('d-none')) : favBadge.forEach(badge => {
    badge.classList.remove('d-none');
    badge.innerHTML = fav.length;
});

function removeFromCart(id, option) {
    // retrieve existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBadge = document.querySelectorAll(".cart");

    // find index of item to remove
    // const itemIndex = cartItems.findIndex(item => item.id === id);
    const itemIndex = cartItems.findIndex(item => item.id === id && item.option === option);

    if (itemIndex !== -1) {
        // remove item from array
        cartItems.splice(itemIndex, 1);
        cartBadge.forEach(badge => badge.innerHTML = cartItems.length)

        // update cart in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        //update ui
        getCart();
        if (cartItems.length === 0) {
            const cartBadge = document.querySelectorAll(".cart");
            const emptyCart = document.querySelector(".offcanvasRight-body");
            const btns = document.querySelector(".offcanvas-body-total");
            emptyCart.classList.remove('hide');
            btns.classList.add('hide');
            cartBadge.forEach(badge => badge.innerHTML = '');
        }
    }
}

function getCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const btns = document.querySelector(".offcanvas-body-total");
    const subTotal = document.querySelector("#amount");
    const items = document.querySelector('.item-list');
    if (cartItems.length !== 0) {
        const emptyCart = document.querySelector(".offcanvasRight-body");
        emptyCart.classList.add('hide');
        btns.classList.remove('hide');
    }
    items.innerHTML = ''
    subTotal.innerHTML = ''
    cartItems.forEach((item) => {
        const itemHtml = `
        <div class="d-flex item-container mb-4 position-relative">
            <button onclick="removeFromCart(\'${item.id}\', \'${item.option}\')" style="height: 0.3rem; width: 0.3rem" type="button" class="btn-close position-absolute top-0 end-0" aria-label="Close"></button>
            <div class="image-container">
                <img class="item-img" src="/${item.image}" alt="">
            </div>
            <div class="content-container ms-4 w-100 d-flex">
                <p class="mb-0">${item.name} (${item.option})</p>
                <div class="d-flex w-100 justify-content-between unit-data">
                <div class="d-flex align-items-end">
                    <button class="btn qty-controller me-2">-</button>
                    <input min="0" max="99" type="number" value="${item.quantity}">
                    <button class="btn qty-controller ms-2">+</button>
                </div>
                <div class="d-flex align-items-end">
                    <p class="mb-0 price">$${item.quantity * item.price}</p>
                </div>
                </div>
            </div>
        </div>
        <hr class="w-100 my-4 mx-0">
        `;
        items.innerHTML += itemHtml;
        subTotal.innerHTML = Number(subTotal.innerHTML) + (item.price * item.quantity);
      }
    );
}