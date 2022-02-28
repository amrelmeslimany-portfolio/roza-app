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
  const previewSpecialCard = $(".special-card-wrap");

  // Special Card Page
  const specialCardSection = $(".special-bouqet-section");
  const flowerTypeWrap = $(".special-bouqet-section .flower-type");
  const coverSlectWrap = $(".special-bouqet-section .select-thecover");
  const tapColorSlectWrap = $(".special-bouqet-section .select-tap");
  const additionsSlectWrap = $(".special-bouqet-section .select-addition");

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
  let alertTemplate = (
    type = "danger",
    message
  ) => ` <div class="alert alert-${type} py-2  alert-dismissible fade show" role="alert" data-bs-delay="500">
          <div class="alert-text display-omd">${message}</div>
          <button type="button" class="btn-close py-3" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;

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
        ".products-carousel, .ready-message-wrap,.flower-type ,.select-thecover, .owl6items"
      ).length
    ) {
      $(carouselSaid)
        .not(
          ".products-carousel, .ready-message-wrap,.flower-type ,.select-thecover, .owl6items"
        )
        .owlCarousel(CAROUSEL_SETTINGS_SAID);
    }
    // Home Page Products Carousel
    if ($(`${carouselSaid}.products-carousel`).length > 0) {
      $(`${carouselSaid}.products-carousel`).owlCarousel({
        ...Carousal_Public_Options(0, 5),
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplaySpeed: 500,
        autoplayTimeout: 6000,
        center: true,
        responsive: {
          0: {
            nav: false,
          },
          1024: {
            nav: true,
          },
        },
      });
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
  if (
    textAreaCustomMessage.length &&
    location.pathname.includes("product-details")
  ) {
    let enable = true;
    let textarea = textAreaCustomMessage.find("textarea");
    toggleCustomMessageBTN.on("click", () => {
      textAreaCustomMessage.toggleClass("select");
      textarea.toggleClass("disabled");

      if (enable) {
        toggleDisabeld(textarea, "rm");
        textarea.focus();
        enableCustomMessage = true;
        readyMessageWrap.addClass("opacity-25");
        readyMessageWrap.css({
          userSelect: "none",
          pointerEvents: "none",
        });
        toggleDisabeld(readyMessageInput);
        enable = false;
      } else {
        toggleDisabeld(textarea);
        enableCustomMessage = false;
        readyMessageInput.removeAttr("disabled");
        readyMessageWrap.removeAttr("style");
        readyMessageWrap.removeClass("opacity-25");
        enable = true;
      }
    });
  }

  // Special Card
  if (location.pathname.includes("special-bouquet") || flowerTypeWrap.length) {
    // Vars
    let [flowerItems, flowerImgs, selectedFloweres, translateX] = [
      flowerTypeWrap.find(".flower_type-item"),
      flowerTypeWrap.find(".flower_type-item .flower_type_item-img"),
      new Set(),
      120, // Get default data src from html
    ];
    const coverItems = coverSlectWrap.find(".select_thecover-item");
    const colorTabsItems = tapColorSlectWrap.find(".select_tap-item");
    const additionsItems = additionsSlectWrap.find(".select_addition-item");
    /*
     ** Add Active On Selected Item
     *** Flowers
     *** Cover
     *** taps color
     *** Additions
     */

    flowerImgs.click(function () {
      let parent = $(this).parent();
      let inputs = $(this).parent().find("input");
      let isSelect = [];
      // Toggle Active
      parent.toggleClass("select");

      // Toggle Disabled Input
      if (parent.hasClass("select")) {
        toggleDisabeld(inputs, "rm");
      } else {
        toggleDisabeld(inputs);
      }

      // Check if user not select element (At least on flower should selected)
      // 1 Clear Selected flowers array first
      selectedFloweres.clear();
      // 2 Add selected Item to array and create array from true values of selected items
      flowerItems.each(function () {
        let isSelected = $(this).hasClass("select");
        isSelect.push(isSelected);
        if (isSelected) {
          selectedFloweres.add(
            $(this).find(".flower_type_item-img").data("flower")
          );
        }
      });

      // Check if user want to not select and throw error
      if (!isSelect.includes(true)) {
        selectedFloweres.add(
          flowerItems.first().find(".flower_type_item-img").data("flower")
        );

        if ($(".alert").length == 0) {
          specialCardSection
            .find(".col-lg-6.order-1.order-lg-0")
            .prepend(
              alertTemplate(
                "danger",
                "يجب ان يكون تم اختيار على الاقل ورده واحده"
              )
            )
            .end()
            .find(".alert")
            .delay(3500)
            .slideUp(200, function () {
              $(this).remove();
            });
        }
        flowerItems.first().addClass("select");
        toggleDisabeld(flowerItems.first().find("input"), "rm");
      } else {
        hideAlert();
      }

      // Show Images on preview card
      previewSpecialCard.find(".sp-cr-img-flower").html("");
      selectedFloweres.forEach((src) => {
        previewSpecialCard
          .find(".sp-cr-img-flower")
          .prepend(`<img src=${src} alt="ورد">`);
      });
    });

    coverItems.click(function () {
      let selectedData = $(this)
        .find(".select_thecover_item-img")
        .data("cover");
      let siblings = $(this).parent().siblings();

      // Handle Active classes and disabled inputs
      handleSelectItem($(this), ".select_thecover-item", siblings);

      // Change Img of card
      previewSpecialCard.find(".sp-cr-img-cover").attr("src", selectedData);
    });

    colorTabsItems.each(function () {
      // Set Colors for bg of tap item
      let tapItemImg = $(this).find(".select_tap_item-img");
      tapItemImg.css("background-color", tapItemImg.data("tapcolor"));

      // Handle Click item
      $(this).click(function () {
        let selectedData = $(this)
          .find(".select_tap_item-img")
          .data("tapcolor");
        let siblings = $(this).parent().siblings();
        // Handle Active classes and disabled inputs
        handleSelectItem($(this), ".select_tap-item", siblings);
        // Change text color of card review
        previewSpecialCard.find(".sp-cr-message").css("color", selectedData);
      });
    });

    additionsItems.click(function () {
      let selectedData = $(this)
        .find(".select_addition_item-img")
        .data("cover");
      let siblings = $(this).parent().siblings();

      // Handle Active classes and disabled inputs
      handleSelectItem($(this), ".select_addition-item", siblings);

      // Change Image in review
      previewSpecialCard.find(".sp-cr-img-zohore").attr("src", selectedData);
    });

    // Handle Message
    toggleCustomMessageBTN.find("button").click(function () {
      let input = textAreaCustomMessage.find("textarea");
      let inputValue = input.val().trim();

      if (inputValue) {
        if (inputValue.length > 180) {
          // 180 about 28 word
          input.addClass("border-danger");
          $(".invalid-feedback#wordError").slideDown(200);
          return;
        }

        $(".invalid-feedback#emptyError").slideUp(200);
        $(".invalid-feedback#wordError").slideUp(200);
        previewSpecialCard.find(".sp-cr-message").text(inputValue);
        input.hasClass("border-danger") && input.removeClass("border-danger");
        $("body,html").animate(
          {
            scrollTop: previewSpecialCard.offset().top,
          },
          200
        );
      } else {
        $(".invalid-feedback#emptyError").slideDown(200);
        input.addClass("border-danger");
      }
    });
  }

  // Functions
  function toggleDisabeld(item, type = "ac") {
    type == "rm" ? item.removeAttr("disabled") : item.prop("disabled", true);
  }

  function hideAlert(item = $(".alert")) {
    item.slideUp(200, function () {
      $(this).remove();
    });
  }

  function handleSelectItem(item, itemClass, siblings) {
    // Toggle Active Classes
    siblings.find(itemClass).removeClass("select");
    item.addClass("select");
    // Toggle Disable from input
    toggleDisabeld(siblings.find(itemClass + " input"));
    toggleDisabeld(item.find("input"), "rm");
  }
});
