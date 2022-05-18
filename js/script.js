"use strict";
//
// MOBILE NAVIGATION
//
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});
//
// GALERY IMAGE SHOW
//
const galeryAll = document.querySelectorAll(".galery-image");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const overlay = document.querySelector(".overlay");
const closeLightbox = document.querySelector(".close-modal");
const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");
const openGaleryLightBox = function () {
  lightbox.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
const closeGaleryLightbox = function () {
  lightbox.classList.add("hidden");
  overlay.classList.add("hidden");
};
for (let i = 0; i < galeryAll.length; i++)
  galeryAll[i].addEventListener("click", function () {
    lightboxImage.innerHTML = `<img class="lightbox-img" src=${galeryAll[i].src}>`;
    openGaleryLightBox();
    function goLeft() {
      if (i > 0) {
        i = i - 1;
        lightboxImage.innerHTML = `<img class="lightbox-img" src=${galeryAll[i].src}>`;
      } else {
        i = galeryAll.length - 1;
        lightboxImage.innerHTML = `<img class="lightbox-img" src=${galeryAll[i].src}>`;
      }
    }
    function goRight() {
      if (i < galeryAll.length - 1) {
        i = i + 1;
        lightboxImage.innerHTML = `<img class="lightbox-img" src=${galeryAll[i].src}>`;
      } else {
        i = 0;
        lightboxImage.innerHTML = `<img class="lightbox-img" src=${galeryAll[i].src}>`;
      }
    }
    btnLeft.addEventListener("click", function () {
      goLeft();
    });
    btnRight.addEventListener("click", function () {
      goRight();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        goLeft();
      } else if (event.key === "ArrowRight") {
        goRight();
      } else if (event.key === "Escape") {
        closeGaleryLightbox();
      }
    });
  });

closeLightbox.addEventListener("click", closeGaleryLightbox);
overlay.addEventListener("click", closeGaleryLightbox);

//
// IMPLEMENT SMOOTH SCROLL
//

const allLinks = document.querySelectorAll(".main-nav-link:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    console.log("link clicked");
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
