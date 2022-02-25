$(function () {
  const loaderTag = $(".page-loader");
  const CAROUSEL_SETTINGS_SAID = {
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
  const CAROUSEL_SETTINGS_READY_MESSAGE = {
    rtl: true,
    nav: true,
    margin: 10,
    dots: false,
    responsive: {
      0: {
        items: 2,
      },
      768: {
        items: 3,
      },
    },
  };
  const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
  const productOrderSelect = $("#orderProductsSelect");
  const carouselSaid = ".owl-carousel";
  const productsFilterNavLinks = $("#v-pills-tab .nav-link");
  const textAreaCustomMessage = $(".custom-message-input");
  const toggleCustomMessageBTN = $(".toggle-custom-message");
  const quantityButtons = $(".quantity-buttons");

  // page loader
  loaderTag.find(".page-loader").animate(
    {
      top: 200,
      opacity: 0,
    },
    500,
    function () {
      loaderTag.delay(50).fadeOut(500);
    }
  );
  // Lazy Loading For Images
  $("img.lazyload").lazyload();
  // Carousels
  if (carouselSaid.length) {
    // Said Section
    $(carouselSaid)
      .not(".ready-message-wrap")
      .owlCarousel(CAROUSEL_SETTINGS_SAID);
    // Product Details Select Ready message
    $(`${carouselSaid}.ready-message-wrap`).owlCarousel(
      CAROUSEL_SETTINGS_READY_MESSAGE
    );
  }
  //  Enable Tootip bootstrap
  if (tooltipTriggerList.length) {
    tooltipTriggerList.each(function () {
      return new bootstrap.Tooltip($(this));
    });
  }
  // Enable SelectNice
  if (productOrderSelect.length) {
    productOrderSelect.niceSelect();
    productOrderSelect.on("change", function (e) {
      console.log(e.target.value);
    });
  }

  // Edit Nav-pills bootstrap when click on filter
  if (productsFilterNavLinks.length) {
    productsFilterNavLinks.not(".dont-add-active").each(function () {
      $(this).on("click", function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
      });
    });
  }

  // Enable Custom Message Product Details
  if (textAreaCustomMessage.length) {
    let enable = true;
    let textarea = textAreaCustomMessage.find("textarea");
    toggleCustomMessageBTN.on("click", () => {
      textAreaCustomMessage.toggleClass("select");
      textarea.toggleClass("disabled");

      if (enable) {
        textarea.removeAttr("disabled");
        enable = false;
      } else {
        textarea.prop("disabled", true);
        enable = true;
      }
    });
  }

  // Handle Quantity Buttons in Product details
  if (quantityButtons.length) {
    let [minusBTN, inputCounter, plusBTN] = [
      quantityButtons.find(".minus"),
      quantityButtons.find("input"),
      quantityButtons.find(".plus"),
    ];
    let counterNumber = inputCounter.val();

    minusBTN.on("click", function () {
      if (counterNumber > 1) {
        counterNumber--;
        inputCounter.val(counterNumber);
      }
    });

    plusBTN.on("click", function () {
      if (counterNumber < +inputCounter.attr("max")) {
        counterNumber++;
        inputCounter.val(counterNumber);
      }
    });
  }
});
