  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelector('.needs-validation');
  // Create a new Date object for the current time
  const now = new Date();

  // Check if the current time is after 6 pm
  if (now.getHours() >= 18) {
    // If it's after 6 pm, add one day to the current date
    now.setDate(now.getDate() + 1);
  }

  // Format the date as yyyy-mm-dd
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const today = yyyy + '-' + mm + '-' + dd;

  // Set the minimum date of the input element to today's date
  document.getElementById("validationCustom07").setAttribute("min", today);

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  (() => {
    'use strict'
  // Loop over them and prevent submission
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false)
  })()

function processCheckout(e) {
    const date = document.querySelector('#validationCustom07');
    const bookingDate = formatDate(date.value);
    const items = JSON.parse(localStorage.getItem('cartItems'));
    const data = [];
    const spinner = `<div class="spinner-border spinner-border-sm text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`

    if (form.checkValidity()) {
      e.target.classList.add('disabled')
      e.target.innerHTML = spinner;

      items.forEach(item => {
        const itemData = {
          id: item.id,
          option: item.option,
          quantity: item.quantity
        };
        data.push(itemData);
      });

      fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({items: data, bookingDate })
      }).then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json))
      }).then(({ url }) => {
        e.target.innerHTML = "Proceed to checkout"
        window.location = url
      }).catch(e => {
        // e.target.innerHTML = "Proceed to checkout"
        console.log(e);
      })
    }
}

function listItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = document.querySelector(".checkout-total");
    const realTotal = document.querySelector(".checkout-real-total");
    const items = document.querySelector('.checkout-items-container');
    items.innerHTML = ''
    total.innerHTML = ''
    cartItems.forEach((item) => {89
        const itemHtml = `
        <div class="d-flex item-container mb-4 position-relative">
            <button onclick="removeFromCart(\'${item.id}\', \'${item.option}\')" style="height: 0.3rem; width: 0.3rem" type="button" class="btn-close position-absolute top-0 end-0" aria-label="Close"></button>
            <div class="image-container">
                <img class="item-img" src="/${item.image}" alt="">
            </div>
            <div class="content-container ms-4 w-100 d-flex">
                <p class="mb-0">${item.name} (${item.option})</p>
                <div class="d-flex w-100 justify-content-between unit-data">
                <div class="d-flex w-100 align-items-center justify-content-between">
                    <p class="mb-0">Quantity: ${item.quantity}</p>
                    <p class="mb-0 price">$${item.quantity * item.price}</p>
                </div>
                </div>
            </div>
        </div>
        <hr class="w-100 my-4 mx-0">
        `;
        items.innerHTML += itemHtml;
        total.innerHTML = Number(total.innerHTML) + (item.price * item.quantity);
        realTotal.innerHTML = Number(total.innerHTML) - 50;
      }
    );
}

function formatDate(date) {
  const newDate = new Date(date);
  const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
  return newDate.toLocaleDateString('en-US', options);  
}

function insertCountries() {
  const countriesDropdown = document.getElementById('validationCustom06');

  fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(countries => {
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.name;
        option.text = country.name;
        countriesDropdown.add(option);
      });
    });
}

  listItems();
  insertCountries();