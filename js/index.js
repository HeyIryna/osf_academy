$(document).ready(function () {
  $('.about__carousell').slick({
    dots: true,
    infinite: true,
    arrows: false,
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

  if(!sessionStorage.getItem("cookies")) {
    window.setTimeout(function () {
      $("#cookies__modal").modal("show");
    }, 2000);
  }
});

// Adds cookies flag lo session storage
$('#cookies__accept').on('click', () => {
  sessionStorage.setItem("cookies", "true");
})

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

