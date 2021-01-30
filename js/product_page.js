$(document).ready(function () {
  $('.product__images').slick({
    dots: true,
    infinite: true,
    mobileFirst: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick',
      },
    ],
  });

  $('.popular__list').slick({
    dots: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick',
      },
    ],
  });

  // double slider for product images

  $('.slider-main').slick({
    slidesToShow: 1,
    arrows: false,
    asNavFor: '.slider-nav',
    fade: true,
  });

  $('.slider-nav').slick({
    slidesToShow: 4,
    asNavFor: '.slider-main',
    vertical: true,
    focusOnSelect: true,
    autoplay: false,
    dots: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          vertical: false,
          focusOnSelect: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  });

  // uploads data to cart and wishlist icons from session storage
  if (sessionStorage.getItem('cart')) {
    fillListIcon('cart', '.cart__container');
  }

  if (sessionStorage.getItem('wishlist')) {
    fillListIcon('wishlist', '.wishlist__container');
  }

  // hides text from description that is over 100 symbols, and shows it on clicking "Read more"
  let moreDescription = $('.product__text').text().slice(100);
  $('.product__text').text($('.product__text').text().slice(0, 100));

  $('.product__more').on('click', () => {
    $('.product__text').text($('.product__text').text() + moreDescription);
    $('.product__more').hide();
  });
});

// Product tabs toggle
$('.tabs__item').click(function () {
  let name = $(this).attr('data-tab');
  let content = $('.tabs__info-item[data-tab="' + name + '"]');

  $(this).toggleClass('active').siblings().removeClass('active');
  content.toggleClass('active').siblings().removeClass('active');
});

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

function fillListIcon(storageName, className) {
  let cartContent = JSON.parse(sessionStorage.getItem(storageName));
  let cartAmount = cartContent.reduce((acc, el) => {
    return acc + el.number;
  }, 0);
  $(className).css('display', 'flex').html(cartAmount);
}

// "Change amount button" increases or decreases number of products user wants to buy
$('.amount__button.plus').on('click', function () {
  $('.amount__number').val(+$('.amount__number').val() + 1);
});

$('.amount__button.minus').on('click', function () {
  if (+$('.amount__number').val() > 1) {
    $('.amount__number').val(+$('.amount__number').val() - 1);
  }
});

// "Add to cart button" increase the number for cart element
$('.btn__add').on('click', addToCartDifferentAmount);

function addToCartDifferentAmount() {
  if (validAmount()) {
    let product = fillProductFromProductPage();
    addToStorage('cart', product);
    fillListIcon('cart', '.cart__container');
  }
}

let validAmount = () => {
  if (/^[1-9][0-9]*$/.test($('.amount__number').val().trim())) {
    return true;
  } else {
    alert('Please, enter number');
    return false;
  }
};

function fillProductFromProductPage() {
  let product = {
    name: $('.product__title').text().trim(),
    img: $('.img__main').attr('src'),
    price: $('.product__price').text().replace( /^\D+/g, ''),
    number: +$('.amount__number').val().trim(),
  };
  return product;
}

// 'zoom button' opes the full-page preview for main product image
$('.img__expand').on('click', function () {
  $('.slick-current > .img__main').addClass('img-enlargeable');
  let src = $('.slick-current > .img__main').attr('src');
  let modal;
  function removeModal() {
    modal.remove();
    $('body').off('keyup.modal-close');
  }
  modal = $('<div>')
    .css({
      background: 'RGBA(0,0,0,.5) url(' + src + ') no-repeat center',
      backgroundSize: 'contain',
      width: '100%',
      height: '100%',
      position: 'fixed',
      zIndex: '10000',
      top: '0',
      left: '0',
      cursor: 'zoom-out',
    })
    .click(function () {
      removeModal();
    })
    .appendTo('body');
  //handling ESC
  $('body').on('keyup.modal-close', function (e) {
    if (e.key === 'Escape') {
      removeModal();
    }
  });
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

// Toggles up-/down-arrows on header and footer menu when sub-menus are opened /closed
$('[data-toggle="collapse"]').on('click', function (event) {
  $(this).find('i').toggleClass('fa-caret-down fa-caret-up');
});

// Adds current year to footer
$('.current-year').text(new Date().getFullYear());
