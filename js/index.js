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

  $('.featured__list').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
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

  if (!sessionStorage.getItem('cookies')) {
    window.setTimeout(function () {
      $('#cookies__modal').modal('show');
    }, 10000);
  }
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
