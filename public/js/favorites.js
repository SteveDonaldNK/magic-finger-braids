const path = window.location.pathname;
const container = document.querySelector(".product-container")

const storedItems = JSON.parse(localStorage.getItem('favorites'));
fetchItems(storedItems);

function fetchItems(storedItems) {
    fetch('/get-products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({storedItems})
    }).then(res => res.text())
    .then(html => {
        container.innerHTML = html;
        initialisation()
    });
}

function initialisation() {
    const toggleBtns = document.querySelectorAll(".show-btn");
    const offcanvas = document.querySelector(".drawer");
    const closeBtn = document.querySelector(".drawer-closer");
    const overlay = document.querySelector(".overlay");
    const addBtn = document.querySelector('.add-to-cart');
    const favIcons = document.querySelectorAll(".fav-icon");
    const error = document.querySelector("#option-error");
    const productData = document.querySelector('.product-data');
    const loader = document.querySelector('.spinner-container');
    checkFavorites(favIcons)

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
        error.classList.add('d-none');
      });
    
      offcanvas.addEventListener('transitionend', () => {
        if (!offcanvas.classList.contains('reveal')) {
            productData.classList.add("d-none");
            loader.classList.remove("d-none");
            error.classList.add('d-none');
        }
      });
      
      overlay.addEventListener("click", function () {
        offcanvas.classList.remove("reveal");
        overlay.classList.remove("reveal");
        document.body.style.overflow = "auto";
      });
}