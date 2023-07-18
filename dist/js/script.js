"use strict";

window.addEventListener("DOMContentLoaded", () => {
  $('a[href^="#"').on("click", function () {
    let href = $(this).attr("href");

    $("html, body").animate({
      scrollTop: $(href).offset().top + 120,
    });
    return false;
  });

  const burger = document.querySelector(".header__burger");
  const sideNav = document.querySelector(".header__sidemenu");

  burger?.addEventListener("click", () => {
    sideNav.classList.toggle("active");
    burger.classList.toggle("active");
  });

  const projectsWrap = document.querySelector(".projects__test");
  const projectsWrapper = document.querySelectorAll(".projects__wrapper");
  const block = document.getElementById("projects");
  const bike = document.querySelector(".projects__road-bike");
  const projectsText0 = document.getElementById("tr0");
  const projectsText1 = document.getElementById("tr1");
  const projectsText2 = document.getElementById("tr2");
  let marker = false;

  let projectsOffset = 1380;
  const baseOffset = 230;

  let bikePosition = 0;
  let wheelAnimation = false;
  function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  function disable() {
    document.addEventListener("scroll", preventScroll);
  }

  function enable() {
    document.removeEventListener("scroll", preventScroll);
  }
  function disableScroll() {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    window.onscroll = function (e) {
      if (window.scrollY < scrollTop) {
        if (bikePosition > 0) {
          bikePosition -= 420;
        }
      } else if (window.scrollY > scrollTop) {
        bikePosition += 420;
      }
      disable();
      window.scrollTo(scrollLeft, scrollTop);
      setTimeout(() => {
        enable();
      }, 800);
    };
  }

  function enableScroll() {
    window.onscroll = function () {};
  }

  let bottomMarker = false;

  function handleScroll(e) {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    window.scrollTo(scrollLeft, scrollTop);
    if (!wheelAnimation) {
      bike.classList.add("tr");
      wheelAnimation = true;
    } else {
      setTimeout(() => {
        bike.classList.remove("tr");
        wheelAnimation = false;
      }, 600);
    }

    var blockPosition = block.getBoundingClientRect();

    if (blockPosition.top > -baseOffset && !marker) {
      disableScroll();
    }
    if (blockPosition.top < -baseOffset) {
      marker = true;
    }

    if (bottomMarker && blockPosition.top < -baseOffset) {
      disableScroll();
    }

    bike.style.transform = "translateX(" + bikePosition + "px)";
    bike.style.transition = "all 1s ease-in";

    if (bottomMarker && bikePosition < 10) {
      enableScroll();
      bottomMarker = false;
      marker = false;
    }
    if (bikePosition == 0) {
      projectsWrap.style.transform = "translateX(" + 0 + "px)";
      projectsWrapper.forEach((item) => item.classList.remove("active"));
      projectsWrapper[0].classList.add("active");
      projectsText1.classList.remove("active");
      projectsText2.classList.remove("active");
      projectsText0.classList.add("active");
    }
    if (bikePosition == 420) {
      projectsWrap.style.transform = "translateX(" + -projectsOffset + "px)";
      projectsWrapper.forEach((item) => item.classList.remove("active"));
      projectsWrapper[1].classList.add("active");
      projectsText0.classList.remove("active");
      projectsText2.classList.remove("active");
      projectsText1.classList.add("active");
    }
    if (bikePosition == 840) {
      projectsWrap.style.transform =
        "translateX(" + -projectsOffset * 2 + "px)";
      projectsWrapper.forEach((item) => item.classList.remove("active"));
      projectsWrapper[2].classList.add("active");
      projectsText0.classList.remove("active");
      projectsText1.classList.remove("active");
      projectsText2.classList.add("active");
    }
    if (!bottomMarker && bikePosition >= 840) {
      enableScroll();
      bottomMarker = true;
    }
  }
  document.addEventListener("scroll", handleScroll);
});
