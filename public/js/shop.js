
const toggleBtns = document.querySelectorAll(".show-btn");
const offcanvas = document.querySelector(".drawer");
const closeBtn = document.querySelector(".drawer-closer");
const overlay = document.querySelector(".overlay");
const addBtn = document.querySelector('.add-to-cart');
const favIcons = document.querySelectorAll(".fav-icon");
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const error = document.querySelector("#option-error");

favIcons.forEach(icon => {
    if (favorites.includes(icon.id)) {
        icon.setAttribute("src", "assets/liked.svg");
    } 
})

addBtn.addEventListener('click', () => {
    if (addBtn.value === '') {
        error.classList.remove('d-none');
        error.innerHTML = "Please choose a size";
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
        cartBadge.forEach(badge => {
            badge.classList.remove('d-none');
            badge.innerHTML = cartItems.length;
        });
    }

    // update cart in local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    });
    
}

function addToFavorites(e, id) {
    const favBadge = document.querySelectorAll(".fav");
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // check if product already exists in favorites
    const itemIndex = favorites.findIndex(item => item === id);

    if (itemIndex < 0) {
        favorites.push(id);
        e.target.setAttribute("src", "assets/liked.svg");
    } else {
        favorites.splice(itemIndex, 1);
        e.target.setAttribute("src", "assets/favorite.svg");
        
    }

    favBadge.forEach(badge => {
        badge.classList.remove('d-none');
        (favorites.length === 0 ? badge.innerHTML = '' : badge.innerHTML = favorites.length )
    })
    localStorage.setItem('favorites', JSON.stringify(favorites));

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
                    error.classList.add('d-none');
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

function sort(e) {
    const key = e.target.value;
    switch (key) {
        case '1':
            fetchItems(key)
            break;

        case '2':
            fetchItems(key)
            break;

        case '3':
            fetchItems(key)
            break;
    
        default:
            fetchItems(key)
            break;
    }
}

function fetchItems(key) {
    fetch('/sort-products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: key })
    })
    .then(res => res.text())
    .then(html => {
        const productContainer = document.querySelector(".product-container");
        productContainer.innerHTML = html;
    })
    .catch(error => {
        console.error(error);
    });
}
