$(window).on('load', function() {
  $('.slider__wrapper').each(function() {
    $(this).slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev down-arrow"></button>',
      nextArrow: '<button type="button" class="slick-next down-arrow"></button>',
    });
  });
});