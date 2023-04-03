const currentUrl = window.location.href;
const error = document.querySelector("#option-error");
const buttons = document.querySelectorAll(".option-btn");
const addBtn = document.querySelector('.add-to-cart');
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

function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer.php?u=${currentUrl}`, '_blank');
}

function shareOnInstagram() {
    window.open(`https://www.sharethis.com/share?url=${currentUrl}&title=<title>&image=<image>&hashtags=<hashtags>`, '_blank');
}

function shareOnTikTok() {
    window.open(`https://www.tiktok.com/share?url=${currentUrl}`, '_blank');
}