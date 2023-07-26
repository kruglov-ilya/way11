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

  onProjectsSectionHeadler(getProjectSwitcher());
});

function onProjectsSectionHeadler(onSwitchProjectCallback) {
  const projectsSection = document.getElementById("projects");
  const topSectionPositionOfset = 0;
  const pause = 300;

  const minProjectNumber = 1;
  const maxProjectNumber = 3;
  let projectNumber = minProjectNumber - 1;
  let delayStart = Date.now() - pause;

  addEventListener("scroll", (e) => {
    const distanceFromTop = projectsSection.getBoundingClientRect().top;

    if (
      (scrollToDownOfSection(distanceFromTop) &&
        !isFinishState()) ||
      (scrollToTopOfSection(distanceFromTop) &&
        !isStartState()) ||
      (scrollOnSection(distanceFromTop) && !isStartState() && !isFinishState())
    ) {
      scrollToStartOfSection();
    }
  });

  onHeadlerForScroll((e) => {
    let scrollIsActive = true;
    const deltaScroll = e.deltaY || e.detail || e.wheelDelta;
    const distanceFromTop = projectsSection.getBoundingClientRect().top;

    if (
      (scrollToDownOfSection(distanceFromTop - deltaScroll) &&
        !isFinishState()) ||
      (scrollToTopOfSection(distanceFromTop - deltaScroll) &&
        !isStartState()) ||
      (scrollOnSection(distanceFromTop) && !isStartState() && !isFinishState())
    ) {
      scrollIsActive = false;
    }

    if (pauseIsEnded()) {
      startPause();
      if (!scrollIsActive) {
        if (deltaScroll < 0) {
          toPrevProject();
        } else {
          toNextProject();
        }
      }
    }

    if (!scrollIsActive) {
      return false;
    }

    return true;
  });

  function scrollToDownOfSection(distanceFromTop) {
    if (distanceFromTop < topSectionPositionOfset) {
      return true;
    } else return false;
  }

  function scrollToTopOfSection(distanceFromTop) {
    if (distanceFromTop > topSectionPositionOfset) {
      return true;
    } else return false;
  }

  function scrollOnSection(distanceFromTop) {
    if (distanceFromTop == topSectionPositionOfset) {
      return true;
    } else return false;
  }

  function isStartState() {
    if (projectNumber == minProjectNumber - 1) {
      return true;
    } else return false;
  }

  function isFinishState() {
    if (projectNumber == maxProjectNumber + 1) {
      return true;
    } else return false;
  }

  function pauseIsEnded() {
    return Date.now() - delayStart > pause;
  }

  function startPause() {
    delayStart = Date.now();
  }

  function toNextProject() {
    if (projectNumber <= maxProjectNumber) {
      projectNumber++;
      onSwitchProjectCallback(projectNumber);
    }
  }

  function toPrevProject() {
    if (projectNumber >= minProjectNumber) {
      projectNumber--;
      onSwitchProjectCallback(projectNumber);
    }
  }

  function scrollToStartOfSection() {
    window.scrollTo(0, projectsSection.offsetTop);
  }
}

function getProjectSwitcher() {
  const projectsOffset = 1380;
  const projectsWrap = document.querySelector(".projects__test");
  const projectsWrapper = document.querySelectorAll(".projects__wrapper");
  const bike = document.querySelector(".projects__road-bike");
  const projectsText0 = document.getElementById("tr0");
  const projectsText1 = document.getElementById("tr1");
  const projectsText2 = document.getElementById("tr2");

  let bikePosition = 0;

  function setActiveProject(number) {
    console.log("Switch!");

    bike.classList.add("tr");
    setTimeout(() => bike.classList.remove("tr"), 600);

    if (number == 1) {
      projectsWrap.style.transform = "translateX(" + 0 + "px)";
      projectsWrapper.forEach((item) => item.classList.remove("active"));
      projectsWrapper[0].classList.add("active");
      projectsText1.classList.remove("active");
      projectsText2.classList.remove("active");
      projectsText0.classList.add("active");
      bikePosition = 0;
    }
    if (number == 2) {
      projectsWrap.style.transform = "translateX(" + -projectsOffset + "px)";
      projectsWrapper.forEach((item) => item.classList.remove("active"));
      projectsWrapper[1].classList.add("active");
      projectsText0.classList.remove("active");
      projectsText2.classList.remove("active");
      projectsText1.classList.add("active");
      bikePosition = 420;
    }
    if (number == 3) {
      projectsWrap.style.transform =
        "translateX(" + -projectsOffset * 2 + "px)";
      projectsWrapper.forEach((item) => item.classList.remove("active"));
      projectsWrapper[2].classList.add("active");
      projectsText0.classList.remove("active");
      projectsText1.classList.remove("active");
      projectsText2.classList.add("active");
      bikePosition = 840;
    }

    bike.style.transform = "translateX(" + bikePosition + "px)";
    bike.style.transition = "all 1s ease-in";
  }

  return setActiveProject;
}

function onHeadlerForScroll(callback) {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    if (!callback(e)) {
      e.preventDefault();
    }
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      if (!callback(e)) {
        e.preventDefault();
        return false;
      }
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

  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}
