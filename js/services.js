$(document).ready(function () {
  // uploads data to cart and wishlist icons from session storage
  if (sessionStorage.getItem('cart')) {
    fillListIcon('cart', '.cart__container');
  }

  if (sessionStorage.getItem('wishlist')) {
    fillListIcon('wishlist', '.wishlist__container');
  }

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
});

function fillListIcon(storageName, className) {
    let cartContent = JSON.parse(sessionStorage.getItem(storageName));
    let cartAmount = cartContent.reduce((acc, el) => {
      return acc + el.number;
    }, 0);
    $(className).css('display', 'flex').html(cartAmount);
  }

//"Buy button" and "plus button" increase the number for cart element
$('button.buy').on('click', addToCart);
$('.overlay__button_plus').on('click', addToCart);

function addToCart() {
  let product = fillProductFromCard(this);
  addToStorage('cart', product);
  fillListIcon('cart', '.cart__container');
}

// "Add to wishlist" button increases the number for cart element
$('.overlay__button_heart').on('click', addToWishlist);

function addToWishlist() {
  let product = fillProductFromCard(this);
  addToStorage('wishlist', product);
  fillListIcon('wishlist', '.wishlist__container');
}

function addToStorage(storageName, product) {
  let cart = [];
  if (sessionStorage.getItem(storageName)) {
    cart = JSON.parse(sessionStorage.getItem(storageName));

    if (cart.find((el) => el.name === product.name)) {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === product.name) {
          cart[i].number += product.number;
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

function fillProductFromCard(element) {
  let card = $(element).closest('.card');

  let product = {
    name: card.find('.card__title').text(),
    img: card.find('.card__img').attr('src'),
    price: card.find('.price').text().replace( /^\D+/g, ''),
    number: 1,
  };
  return product;
}

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
  
  // Toggles up-/down-arrows on header and footer menu when sub-menus are opened /closed
  $('[data-toggle="collapse"]').on('click', function (event) {
    $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
  });
  
  // Adds current year to footer
  $('.current-year').text(new Date().getFullYear());
