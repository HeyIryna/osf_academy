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
});
