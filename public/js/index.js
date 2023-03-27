const navbar = document.querySelector(".navbar");

(window.scrollY > 0) && navbar.classList.toggle("bg-light");
(window.scrollY > 0) && navbar.classList.toggle("shadow-sm");

window.onscroll = function() {
    navbar.classList.toggle("shadow-sm", window.scrollY > 0);
    navbar.classList.toggle("bg-light", window.scrollY > 0);
  };