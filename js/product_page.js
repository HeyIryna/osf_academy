$(document).ready(function () {
  // $('.product__images').slick({
  //   dots: true,
  //   infinite: true,
  //   mobileFirst: true,
  //   arrows: false,
  //   infinite: true,
  //   slidesToShow: 3,
  //   responsive: [
  //     {
  //       breakpoint: 767,
  //       settings: 'unslick',
  //     },
  //   ],
  // });

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
  //////////////////////////

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
      }
    ],
  });


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


