function checkout() {
    CinetPay.setConfig({
        apikey: '',//   YOUR APIKEY
        site_id: '',//YOUR_SITE_ID
        notify_url: 'http://mondomaine.com/notify/',
        mode: 'PRODUCTION'
    });
    CinetPay.getCheckout({
        transaction_id: Math.floor(Math.random() * 100000000).toString(), // YOUR TRANSACTION ID
        amount: 100,
        currency: 'XOF',
        channels: 'ALL',
        description: 'Test de paiement',   
         //Fournir ces variables pour le paiements par carte bancaire
        customer_name:"Joe",//Le nom du client
        customer_surname:"Down",//Le prenom du client
        customer_email: "down@test.com",//l'email du client
        customer_phone_number: "088767611",//l'email du client
        customer_address : "BP 0024",//addresse du client
        customer_city: "Antananarivo",// La ville du client
        customer_country : "CM",// le code ISO du pays
        customer_state : "CM",// le code ISO l'état
        customer_zip_code : "06510", // code postal

    });
    CinetPay.waitResponse(function(data) {
        if (data.status == "REFUSED") {
            if (alert("Votre paiement a échoué")) {
                window.location.reload();
            }
        } else if (data.status == "ACCEPTED") {
            if (alert("Votre paiement a été effectué avec succès")) {
                window.location.reload();
            }
        }
    });
    CinetPay.onError(function(data) {
        console.log(data);
    });
}

function listItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // const subTotal = document.querySelector("#amount");
    const items = document.querySelector('.checkout-items');
    console.log(items);
    items.innerHTML = ''
    // subTotal.innerHTML = ''
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
                    <button onclick="updateQuantity(\'${item.id}\',\'${item.option}\',\'reduce\')" class="btn me-2">-</button>
                    <input min="0" max="99" type="number" value="${item.quantity}">
                    <button onclick="updateQuantity(\'${item.id}\',\'${item.option}\',\'increase\')" class="btn ms-2">+</button>
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
        // subTotal.innerHTML = Number(subTotal.innerHTML) + (item.price * item.quantity);
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