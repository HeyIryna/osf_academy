$(document).ready(function () {
  fillItemsList();
  calculateAll();
});

function fillItemsList() {
  let cart = [];
  if (sessionStorage.getItem('cart')) {
    cart = JSON.parse(sessionStorage.getItem('cart'));
  }

  for (product of cart) {
    let newItem = `<div class="item">
        <div class="item__image-box">
            <img class="item__image" src="${product.img}" alt="${product.name}">
        </div>
        <div class="item__name-box">
            <p class="item__name">${product.name}</p>
            <p class="item__price_secondary">$ <span class="item__price_num">${
              product.price
            }</span></p>
        </div>
            <div class="item__control amount">
                <span class="amount__button minus"><i class="fas fa-minus"></i></span>
                <input class="amount__number" type="text" value="${
                  product.number
                }">
                <span class="amount__button plus"><i class="fas fa-plus"></i></span>
            </div>
        <div class="item__price_primary"><span>$</span><span class="item__price_result">${(
          +product.price * product.number
        )
          .toFixed(2)
          .replace('.', ',')}</span></div>
        <div class="item__delete">
            <i class="fas fa-times"></i>
        </div>
    </div> `;
    $('.cart__list').append(newItem);
  }
}

// "Change amount button" increases or decreases number of products user wants to buy
$(document).on('click', '.amount__button.plus', function () {
  let amount = $(this).siblings('.amount__number');
  amount.val(+amount.val() + 1);
  changePriceResult(this, amount);
  calculateAll();
});

$(document).on('click', '.amount__button.minus', function () {
  let amount = $(this).siblings('.amount__number');
  amount.val(+amount.val() - 1);
  changePriceResult(this, amount);
  calculateAll();
});

// "Change amount button" increases or decreases number of products user wants to buy on input change
$(document).on('change', '.amount__number', function () {
  console.log('hello');
  changePriceResult(this, $(this));
  calculateAll();
});

function changePriceResult(element, amount) {
  let itemResult = $(element).closest('.item').find('.item__price_result');
  let itemPrice = +$(element).closest('.item').find('.item__price_num').text();
  itemResult.text((itemPrice * amount.val()).toFixed(2).replace('.', ','));
}

// delete item from cart
$(document).on('click', '.item__delete', function () {
  $(this).closest('.item').remove();
  calculateAll();
});

//calculate total sum in cart without delivery
function calculateAll() {
  let subtotal = 0;
  $('.item__price_result').each(function () {
    subtotal += +$(this).text().replace(',', '.');
  });
  $('.calculations__subtotal span').text(Math.round(subtotal * 100) / 100);
  let shipping = +$('input[name=shipping]:checked').val();
  $('.calculations__total span').text(
    Math.round((subtotal + shipping) * 100) / 100
  );
}

// recalculate total on shipping change
$('.form-check :radio').change(function () {
  calculateAll();
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
