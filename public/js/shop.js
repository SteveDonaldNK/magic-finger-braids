function addToCart(id, option) {
    option = JSON.parse(option);
    var product;
    fetch('/product', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        product = data;
        
    // retrieve existing cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBadge = document.querySelectorAll(".cart");

    // check if product already exists in cart
    const existingItems = cartItems.filter(item => item.id === product._id);
    const existingItem = existingItems.find(item => item.option === option.name);

    if (existingItem) {
        if (existingItem.option === option.name) {
            existingItem.quantity += 1
        } else {
            const newItem = {
                id: product._id,
                name: product.name,
                image: product.image,
                type: product.type,
                min: product.min,
                max: product.max,
                option: option.name,
                price: Number(option.price),
                quantity: 1
            };
            cartItems.push(newItem);
            cartBadge.forEach(badge => badge.innerHTML = cartItems.length);
        }
    } else {
        // add new item to cart
        const newItem = {
            id: product._id,
            name: product.name,
            image: product.image,
            type: product.type,
            min: product.min,
            max: product.max,
            option: option.name,
            price: Number(option.price),
            quantity: 1
        };
        cartItems.push(newItem);
        cartBadge.forEach(badge => badge.innerHTML = cartItems.length);
    }

    // update cart in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    });
    
}

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

function showItem(id) {
    const itemTitle = document.querySelector('.item-title');
    const itemImage = document.querySelector('.quickview-img');
    const itemPrice = document.querySelector('.item-price');
    const options = document.querySelector('#options');
    const addBtn = document.querySelector('.add-to-cart');
    const price = document.querySelector('#price');

    addBtn.setAttribute("id", id);

    addBtn.value = ''
    options.innerHTML = '';
    price.innerHTML = '';
    fetch('/product', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        itemTitle.innerHTML = data.name;
        itemImage.setAttribute("src", data.image);
        if (data.max === null) {
            itemPrice.innerHTML = `$${data.min}`;
        } else {
            itemPrice.innerHTML = `$${data.min} - $${data.max}`;
        }
        data.options.forEach( option => {
            const optionHtml = `
            <button type="button" id="${option.name}" value="${option.price}" class="btn px-4 py-1 btn-outline-dark rounded-0 border-2" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="option 1">
                ${option.name}
            </button>`;
            options.innerHTML += optionHtml;

            const buttons = document.querySelectorAll('#options button');
            buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.classList.remove('btn-dark', 'selected');
                    otherButton.classList.add('btn-outline-dark');
                }
                });
                addBtn.value = JSON.stringify({price: button.value, name: button.id});
                button.classList.remove('btn-outline-dark');
                button.classList.add('btn-dark', 'selected');
                price.innerHTML = `$${button.value}`;
            });
            });
        })
    })
    .catch(error => console.error(error));
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
                <img class="item-img" src="${item.image}" alt="">
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

function sort(e) {
    console.log(e.target.value);
}

const toggleBtns = document.querySelectorAll(".show-btn");
const offcanvas = document.querySelector(".drawer");
const closeBtn = document.querySelector(".drawer-closer");
const overlay = document.querySelector(".overlay");
const cartBadge = document.querySelectorAll(".cart");
const favBadge = document.querySelector(".fav");
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const addBtn = document.querySelector('.add-to-cart');

(cartItems.length === 0) ? cartBadge.forEach(badge => badge.classList.add('d-none')) : cartBadge.forEach(badge => {
    badge.classList.remove('d-none');
    badge.innerHTML = cartItems.length
});

addBtn.addEventListener('click', () => {
    if (addBtn.value === '') {
        console.log("please choose size");
    } else {
        addToCart(addBtn.id, addBtn.value)
    }
});

toggleBtns.forEach( toggleBtn => toggleBtn.addEventListener("click", function () {
    offcanvas.classList.add("reveal");
    overlay.classList.add("reveal");
    document.body.style.overflow = "hidden";
  }));
  
  closeBtn.addEventListener("click", function () {
    offcanvas.classList.remove("reveal");
    overlay.classList.remove("reveal");
    document.body.style.overflow = "auto";
  });
  
  overlay.addEventListener("click", function () {
    offcanvas.classList.remove("reveal");
    overlay.classList.remove("reveal");
    document.body.style.overflow = "auto";
  });