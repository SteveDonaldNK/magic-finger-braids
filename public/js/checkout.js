  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const form = document.querySelector('.needs-validation');
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;

  // Set the minimum date of the input element to today's date
  document.getElementById("validationCustom07").setAttribute("min", today);

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
        body: JSON.stringify({items: data})
      }).then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json))
      }).then(({ url }) => {
        window.location = url
      }).catch(e => {
        console.log(e);
      })
    }
}

function listItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const total = document.querySelector(".checkout-total");
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
      }
    );
}

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    forms.forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  listItems()