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
    $('.cart__container')
      .css('display', 'flex')
      .html(sessionStorage.getItem('cart').split(',').length);
  }

  if (sessionStorage.getItem('wishlist')) {
    $('.wishlist__container')
      .css('display', 'flex')
      .html(sessionStorage.getItem('wishlist').split(',').length);
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

// "Buy button" and "plus button" increase the number for cart element
$('button.buy').on('click', addToCart);
$('.overlay__button_plus').on('click', addToCart);

function addToCart() {
  let product = { name: 'name' };

  if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify(product));
  } else {
    sessionStorage.setItem(
      'cart',
      sessionStorage.getItem('cart') + ',' + JSON.stringify(product)
    );
  }
  $('.cart__container')
    .css('display', 'flex')
    .html(sessionStorage.getItem('cart').split(',').length);
}

// "Add to wishlist" button increases the number for cart element
$('.overlay__button_heart').on('click', addToWishlist);

function addToWishlist() {
  let product = { name: 'name' };

  if (!sessionStorage.getItem('wishlist')) {
    sessionStorage.setItem('wishlist', JSON.stringify(product));
  } else {
    sessionStorage.setItem(
      'wishlist',
      sessionStorage.getItem('wishlist') + ',' + JSON.stringify(product)
    );
  }
  $('.wishlist__container')
    .css('display', 'flex')
    .html(sessionStorage.getItem('wishlist').split(',').length);
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
  if (/^[1-9][0-9]*$/.test($('.amount__number').val().trim())) {
    for (let i = 0; i < +$('.amount__number').val().trim(); i++) {
      addToCart();
    }
  } else {
    alert('Please, enter number');
  }
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
