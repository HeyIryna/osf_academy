$(document).ready(function(){
    $('.about__carousell').slick( {
        dots: true,
        infinite: true,
        arrows: false,
        autoplay: true
    });
  });


  $(document).ready(function(){
    $('.popular__list').slick( {
        dots: true,
        arrows: false,
        mobileFirst: true,
        responsive: [
           {
              breakpoint: 767,
              settings: "unslick"
           }
        ]
    });
  });

