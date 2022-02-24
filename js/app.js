$(function () {
  /*
   ** Public Setings
   *** Lazy Loading For Images
   *** Carousel
   */
  const CAROUSEL_SETTINGS = {
    dots: true,
    rtl: true,
    margin: 40,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      2024: {
        items: 3,
      },
    },
  };
  $("img.lazyload").lazyload();
  $(".owl-carousel").owlCarousel(CAROUSEL_SETTINGS);
});
