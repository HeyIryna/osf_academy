$(document).ready(function () {
  $('.about__carousell').slick({
    dots: true,
    infinite: true,
    arrows: false,
    focusOnSelect: false,
  });

  $('.popular__list').slick({
    dots: true,
    arrows: false,
    mobileFirst: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick',
      },
    ],
  });

  $('.featured__list').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    focusOnSelect: false,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  });

  if (sessionStorage.getItem('cart')) {
    fillListIcon('cart', '.cart__container');
  }

  if (sessionStorage.getItem('wishlist')) {
    fillListIcon('wishlist', '.wishlist__container');
  }

  if (!sessionStorage.getItem('cookies')) {
    window.setTimeout(function () {
      $('#cookies__modal').modal('show');
    }, 10000);
  }
});

// hides mobile and desktop dropped menus on window resize
$(window).resize(function () {
  if ($(window).width() <= 769) {
    if ($('.header__dropdown_desktop').hasClass('show')) {
      $('.header__dropdown_desktop').toggleClass('show hide');
    }
  } else {
    if ($('.header__dropdown_mobile').hasClass('show')) {
      $('.header__dropdown_mobile').toggleClass('show hide');
    }
  }
});

// show / hide desktop header dropdown menu on click
$('.header__toggle').on('click', function () {
  $('.header__dropdown_desktop').toggleClass('show hide');
  $(this).toggleClass('active');
});

// show / hide mobile header dropdown menu on click
$('.menu__icon').on('click', function () {
  $('.menu__icon').toggleClass('fa-bars fa-times');
  $('.header__dropdown_mobile').toggleClass('show hide');
});

// Adds cookies flag lo session storage
$('#cookies__accept').on('click', () => {
  sessionStorage.setItem('cookies', 'true');
  $('#cookies__modal').modal('hide');
});

// Toggles up-/down-arrows on header and footer menu when sub-menus are opened /closed
$('[data-toggle="collapse"]').on('click', function (event) {
  $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
});

// Adds current year to footer
$('.current-year').text(new Date().getFullYear());

// "Buy button" and "plus button" increase the number for cart element
$('button.buy').on('click', addToCart);
$('.overlay__button_plus').on('click', addToCart);

function addToCart() {
  addToStorage(this, 'cart');
  fillListIcon('cart', '.cart__container');
}

// "Add to wishlist" button increases the number for cart element
$('.overlay__button_heart').on('click', addToWishlist);

function addToWishlist() {
  addToStorage(this, 'wishlist');
  fillListIcon('wishlist', '.wishlist__container');
}

function addToStorage(element, storageName) {
  let card = $(element).closest('.card');

  let product = {
    name: card.find('.card__title').text(),
    img: card.find('.card__img').attr('src'),
    price: card.find('.price').text(),
    number: 1,
  };

  let cart = [];
  if (sessionStorage.getItem(storageName)) {
    cart = JSON.parse(sessionStorage.getItem(storageName));

    if (cart.find((el) => el.name === product.name)) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
          cart[i].number += 1;
          sessionStorage.setItem(storageName, JSON.stringify(cart));
          break;
        }
      }
    } else {
      cart.push(product);
      sessionStorage.setItem(storageName, JSON.stringify(cart));
    }
  } else {
    cart.push(product);
    sessionStorage.setItem(storageName, JSON.stringify(cart));
  }
}

function fillListIcon(storageName, className) {
  let cartContent = JSON.parse(sessionStorage.getItem(storageName));
  let cartAmount = cartContent.reduce((acc, el) => {
    return acc + el.number;
  }, 0);
  $(className).css('display', 'flex').html(cartAmount);
}

// AJAX request for load more products
$('#load__more_homepage').on('click', function () {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let uploadedProducts = JSON.parse(xhr.responseText);

      for (let i = 0; i < 4; i++) {
        let newCard = `<div class="card">
    <div class="card__content">
        <img class="card__img" src="${uploadedProducts[i].image}" alt="${uploadedProducts[i].name}">
        <div class="card__text">
            <p class="card__title">${uploadedProducts[i].name}</p>
            <span class="card__price">${uploadedProducts[i].price}</span>                           
        </div>                            
    </div>
    <div class="card__overlay">
        <div class="overlay__buttons-group">
            <div class="overlay__button overlay__button_plus"><i class="fas fa-plus"></i></div>
            <div class="overlay__button overlay__button_heart"><i class="fas fa-heart"></i></div>                    
        </div>
    </div>
</div>`;
        $('.popular__list').append(newCard);
      }
    }
  };
  xhr.open('GET', './popular.json');
  xhr.send();
});

// show / hide password
$('.password__icon').on('click', function () {
  let passwordAttr =
    $('.password__input').attr('type') === 'password' ? 'text' : 'password';
  $('.password__input').attr('type', passwordAttr);
  $(this).toggleClass('fa-eye fa-eye-slash');
});
