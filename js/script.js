"use strict";

const thumbnailImages = document.querySelectorAll(
  ".product__images__thumbnails"
);
const mainproductImage = document.querySelector(".product__images__main");
const lightBox = document.querySelector(".light__box");
const overlay = document.querySelector(".overlay");
const overlayMenu = document.querySelector(".overlay-menu");
const openLightBox = document.querySelector(".light__box-show");
const closeLightBox = document.querySelector(".light__box-close");
const slides = document.querySelectorAll(".main-image");
const btnLeft = document.querySelector(".prev-button");
const btnRight = document.querySelector(".next-button");
const iconLeft = document.querySelector(".prev-button-mobile");
const iconRight = document.querySelector(".next-button-mobile");
const thumbnailContainer = document.querySelector(".thumbnail-container");
const thumbnailContainerMain = document.querySelector(
  ".thumbnail-container-main"
);
const thumbnailContainerLight = document.querySelector(
  ".thumbnail-container-light"
);
const plusButton = document.querySelector(".plus-button");
const minusButton = document.querySelector(".minus-button");
let itemCount = document.querySelector(".product__count");
const addtoCartButton = document.querySelector(".button__addtocart");
const cartQuantity = document.querySelector(".header__cart--notification");
const cartButton = document.querySelector(".header__cart");
const cartBasket = document.querySelector(".header__cart-basket");
const basketPerAmount = document.querySelector(".desc-amt");
const basketQuantity = document.querySelector(".desc-quantity");
const basketTotalAmount = document.querySelector(".desc-total");
const deleteButton = document.querySelector(".delete-button");
const basketDetails = document.querySelector(".header__cart-basket--details");
const checkoutButton = document.querySelector(".checkout__button");
const cartcloseButton = document.querySelector(".cart-close");
const mobilemenuIcon = document.querySelector(".mobile-menu");
const mobileMenu = document.querySelector(".header__mobile--background");
const menuClose = document.querySelector(".menu-close");
const thumbnails = document.querySelectorAll(".thumbnails");
const productMobile = document.querySelector(".product__images--mobile");
const productImagesMobile = document.querySelector(
  ".product__images--mobile-img"
);

//Generate thumbnails
const createThumbnail = function (classname, container) {
  slides.forEach((s, i) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<img
  src="images/image-product-${i + 1}-thumbnail.jpg"
  alt="thumbnail${i + 1}"
  class="thumbnails ${classname} ${i === 0 ? "thumbnail--active" : ""}"
  data-slide="${i}"
/>`
    );
  });
};

const init = function () {
  cartQuantity.textContent = 0;
  //Creating thumbnails in the main page
  createThumbnail("thumbnails--main", thumbnailContainerMain);
  //Setting the first thumbnail border
  thumbnailContainerMain.children[0].style.border =
    "3px solid hsl(26, 100%, 55%)";
};

//Remove already existing active thumbnail
const removeExistingThumbnail = function (parentEl) {
  parentEl.forEach((thumbnail) => {
    thumbnail.classList.remove("thumbnail--active");
    thumbnail.style.border = "";
    thumbnail.style.transform = "scale(1)";
  });
};

//Activating the specific thumbnail
const activateThumbnail = function (el) {
  el.classList.add("thumbnail--active");
  el.style.border = "3px solid hsl(26, 100%, 55%)";
  el.style.transform = "scale(1.2)";
};

init();
//Change the main Product image as of thumbnail clicked

document.querySelectorAll(".thumbnails").forEach((thumbnail, i) => {
  thumbnail.addEventListener("click", function () {
    mainproductImage.src = `images/image-product-${i + 1}.jpg`;

    const parentEl = document.querySelectorAll(".thumbnails--main");
    //Remove already existing active thumbnail
    removeExistingThumbnail(parentEl);

    //Activating the specific thumbnail
    const el = document.querySelector(`.thumbnails--main[data-slide = "${i}"]`);
    activateThumbnail(el);
  });
});

//Open Modal
const openModal = function (el, el1) {
  el.classList.remove("hidden");
  el1.classList.remove("hidden");
};

//Close Modal
const closeModal = function (el, el1) {
  el.classList.add("hidden");
  el1.classList.add("hidden");
};

//Opening LightBox Modal
openLightBox.addEventListener("click", function (e) {
  e.preventDefault();
  openModal(lightBox, overlay);
  slider();
});

//Closing LightBox Modal
closeLightBox.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(lightBox, overlay);
});

overlay.addEventListener("click", closeModal(lightBox, overlay));

//On Pressing Escape key, when the modal is open
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !lightBox.classList.contains("hidden")) {
    closeModal(lightBox, overlay);
  }
});

//Slider function in the lightBox
const slider = function () {
  let curSlide = 0;
  let maxSlide = slides.length;
  let parentEl;

  //Activating thumbnail
  const activateSlide = function (slide) {
    //Before activating we need to first remove any active thumbnail
    removeExistingThumbnail(parentEl);

    //Activating the specific thumbnail
    const el = document.querySelector(
      `.thumbnails--light[data-slide = "${slide}"]`
    );
    activateThumbnail(el);
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateSlide(curSlide);
  };

  const init = function () {
    goToSlide(0);
    thumbnailContainerLight.innerHTML = "";
    createThumbnail("thumbnails--light", thumbnailContainerLight);
    parentEl = document.querySelectorAll(".thumbnails--light");
    activateSlide(0);
  };
  init();

  //Event handlers
  thumbnailContainerLight.addEventListener("click", function (e) {
    if (e.target.classList.contains("thumbnails--light")) {
      // const slide = e.target.dataset.slide;
      //we can also destructure like this
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateSlide(slide);
    }
  });

  btnRight.addEventListener("click", nextSlide);

  btnLeft.addEventListener("click", prevSlide);

  //Adding an event listener for 'Left' and 'Right Arrow' key pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
};

///Adding items to the cart

plusButton.addEventListener("click", function (e) {
  e.preventDefault();
  const count = Number(itemCount.value) || 0;
  itemCount.value = count + 1;
});

minusButton.addEventListener("click", function (e) {
  e.preventDefault();
  const count = Number(itemCount.value) <= 0 ? 1 : Number(itemCount.value);
  itemCount.value = count - 1;
});

addtoCartButton.addEventListener("click", function (e) {
  e.preventDefault();
  //If the itemCount.value > 0, then
  //1.Removing the hidden status of the cart button in the header
  if (+itemCount.value > 0) {
    cartQuantity.classList.remove("hidden");
    cartQuantity.textContent = itemCount.value;
  }
});

//On click of cart button
cartButton.addEventListener("click", function (e) {
  e.preventDefault();
  cartBasket.classList.remove("hidden");
  const qty = +cartQuantity.textContent;
  const amtPerItem = 125.0;
  const totalAmt = (qty * amtPerItem).toFixed(2);

  if (qty === 0) {
    emptyCart();
    return;
  }

  const markup = `
          <img
            src="images/image-product-1-thumbnail.jpg"
            alt="cart image"
            class="cart-image"
          />
          <div class="description">
            <p class="desc-para">Fall limited Edition Sneakers</p>
            <div class="description-amount">
              <p class="desc-amt">$${amtPerItem} x</p>
              <p class="desc-quantity">${qty}</p>
              <p class="desc-total">$${totalAmt}</p>
            </div>
          </div>

          <span>
            <svg class="delete-button">
              <use href="images/sprite.svg#icon-delete"></use>
            </svg>
          </span>`;
  basketDetails.classList.remove("empty-cart");
  basketDetails.textContent = "";
  basketDetails.insertAdjacentHTML("beforeend", markup);
  checkoutButton.classList.remove("hidden");

  //On click of delete button
  basketDetails.lastChild.addEventListener("click", emptyCart);
});

const emptyCart = function () {
  basketDetails.textContent = "Your cart is empty.";
  checkoutButton.classList.add("hidden");
  basketDetails.classList.add("empty-cart");
  cartQuantity.classList.add("hidden");
  itemCount.value = 0;
  cartQuantity.textContent = 0;
};

//On click of cart close button
cartcloseButton.addEventListener("click", function (e) {
  e.preventDefault();
  cartBasket.classList.add("hidden");
});

////////////////////Mobile View//////////////////
//Mobile menu display
mobilemenuIcon.addEventListener("click", function (e) {
  e.preventDefault();

  openModal(mobileMenu, overlayMenu);
});

menuClose.addEventListener("click", function (e) {
  e.preventDefault();
  closeModal(mobileMenu, overlayMenu);
});
overlayMenu.addEventListener("click", closeModal(mobileMenu, overlayMenu));

//On Pressing Escape key, when the modal is open
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
    closeModal(mobileMenu, overlayMenu);
  }
});

//Slider function for mobile view of Product Images
if (getComputedStyle(productMobile).opacity === "1") {
  let curSlide = 0;
  let maxSlide = slides.length;

  const goToSlide = function (slide) {
    productImagesMobile.src = `images/image-product-${slide + 1}.jpg`;
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  //Event handlers
  iconRight.addEventListener("click", nextSlide);

  iconLeft.addEventListener("click", prevSlide);

  //Adding an event listener for 'Left' and 'Right Arrow' key pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
}
