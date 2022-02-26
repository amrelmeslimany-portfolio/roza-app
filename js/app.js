$(function () {
  const loaderTag = $(".page-loader");
  const tooltipTriggerList = $('[data-bs-toggle="tooltip"]');
  const productOrderSelect = $("#orderProductsSelect");
  const carouselSaid = ".owl-carousel";
  const productsFilterNavLinks = $("#v-pills-tab .nav-link");
  const readyMessageWrap = $(".ready-message-wrap");
  const textAreaCustomMessage = $(".custom-message-input");
  const toggleCustomMessageBTN = $(".toggle-custom-message");
  const quantityButtons = $(".quantity-buttons");

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
  const Carousal_Public_Options = (margin = 10, items = 3) => ({
    rtl: true,
    nav: true,
    margin,
    dots: false,
    autoWidth: true,
    items,
  });

  let readyMessageInput;

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
  if ($("img.lazyload").length) {
    $("img.lazyload").lazyload();
  }
  // Carousels
  if ($(carouselSaid).length) {
    // Said Section
    if (
      $(carouselSaid).not(
        ".ready-message-wrap,.flower-type ,.select-thecover, .owl6items"
      ).length
    ) {
      $(carouselSaid)
        .not(".ready-message-wrap")
        .owlCarousel(CAROUSEL_SETTINGS_SAID);
    }
    // Product Details Select Ready message
    if ($(`${carouselSaid}.ready-message-wrap`).length > 0) {
      $(`${carouselSaid}.ready-message-wrap`).owlCarousel(
        Carousal_Public_Options()
      );
    }

    // Flowers Carousal
    if ($(`${carouselSaid}.flower-type`).length > 0) {
      $(`.flower-type`).owlCarousel(Carousal_Public_Options(20, 4));
    }
    // Other Carousal (Cover)
    if ($(`${carouselSaid}.owl6items`).length > 0) {
      $(`.owl6items`).owlCarousel(Carousal_Public_Options(10, 6));
    }
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

  // Handle Quantity Buttons in Product details
  if (quantityButtons.length) {
    quantityButtons.each(function () {
      let [minusBTN, inputCounter, plusBTN] = [
        $(this).find(".minus"),
        $(this).find("input"),
        $(this).find(".plus"),
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
    });
  }

  /*
   ** Product Details Page
   *** 1) Handle Select Ready Message
   *** 2) Handle Custom Message Input
   */

  // 1) handle Select Ready Message
  if (readyMessageWrap.length) {
    /*
     ** Will get value of selected image and put it in input hidden value to send it with sumbit
     */
    readyMessageInput = readyMessageWrap.siblings(
      "input[name='choosedMessage']"
    );

    readyMessageWrap.find(".ready-message-item").each(function () {
      $(this).on("click", function () {
        $(this)
          .parent()
          .siblings()
          .find(".ready-message-item")
          .removeClass("select");

        $(this).addClass("select");

        readyMessageInput.val($(this).data("readymessage"));
      });
    });
  }

  // 2) Enable Custom Message Product Details
  if (textAreaCustomMessage.length) {
    let enable = true;
    let textarea = textAreaCustomMessage.find("textarea");
    toggleCustomMessageBTN.on("click", () => {
      textAreaCustomMessage.toggleClass("select");
      textarea.toggleClass("disabled");

      if (enable) {
        textarea.removeAttr("disabled");
        textarea.focus();
        enableCustomMessage = true;
        readyMessageWrap.addClass("opacity-25");
        readyMessageWrap.css({
          userSelect: "none",
          pointerEvents: "none",
        });
        readyMessageInput.prop("disabled", true);
        enable = false;
      } else {
        textarea.prop("disabled", true);
        enableCustomMessage = false;
        readyMessageInput.removeAttr("disabled");
        readyMessageWrap.removeAttr("style");
        readyMessageWrap.removeClass("opacity-25");
        enable = true;
      }
    });
  }
});
