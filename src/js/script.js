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

  onProjectsSectionHeadler();
});

function onProjectsSectionHeadler() {
  const projectsSection = document.getElementById("projects");
  const maxTopForBlock = 0;

  let scrollActive = true;
  let projectNumber = 0;
  let delayState = false;

  const { disableScroll, enableScroll } = getScrollControl();

  document.addEventListener("scroll", (ev) => {
    const distanceFromTop = projectsSection.getBoundingClientRect().top;
    if (distanceFromTop < maxTopForBlock) {
      if (scrollActive) {
        scrollActive = false;
        activeFixedScrollState();
      }

      if (!scrollActive && !delayState) {
        projectNumber++;
        console.log('Project number:', projectNumber)
      }

      console.log("YES! ", distanceFromTop);
    }
  });

  function activeFixedScrollState() {
    window.scrollTo(0, projectsSection.offsetTop);
    disableScroll();
    console.log("Scroll disabled!");
  }
}

function getScrollControl() {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }

  return { disableScroll, enableScroll };
}
