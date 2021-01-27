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
});

// Product tabs toggle
$('.tabs__item').click(function () {
  let name = $(this).attr('data-tab');
  let content = $('.tabs__info-item[data-tab="' + name + '"]');

  $(this).toggleClass('active').siblings().removeClass('active');
  content.toggleClass('active').siblings().removeClass('active');
});
