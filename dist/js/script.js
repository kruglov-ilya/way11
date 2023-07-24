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
  const topSectionPosition = 0;
  const pause = 500;

  let scrollIsActive = true;
  let projectNumber = 1;
  let delayStart = Date.now() - pause;

  document.addEventListener("scroll", (ev) => {
    const distanceFromTop = projectsSection.getBoundingClientRect().top;
    if (
      (distanceFromTop < topSectionPosition && !isFinishState()) ||
      (distanceFromTop > topSectionPosition && !isStartState())
    ) {
      unactiveScroll();
    } else {
      activeScroll();
    }

    if (!scrollIsActive) {
      scrollToStartSection();
    }

    if (pauseIsEnded()) {
      startPause();

      if (!scrollIsActive) {
        if (distanceFromTop > 0) {
          toPrevProject();
        } else {
          toNextProject();
        }
      }
    }
  });

  function isStartState() {
    return projectNumber == 0;
  }

  function isFinishState() {
    return projectNumber >= 4;
  }

  function activeScroll() {
    console.log("Active scroll!");
    scrollIsActive = true;
  }

  function unactiveScroll() {
    console.log("Disable scroll!");
    scrollIsActive = false;
  }

  function pauseIsEnded() {
    return Date.now() - delayStart > pause;
  }

  function startPause() {
    console.log("Start pause");
    delayStart = Date.now();
  }

  function toNextProject() {
    projectNumber++;
    console.log("To up!");
    console.log("Project number:", projectNumber);
  }

  function toPrevProject() {
    projectNumber--;
    console.log("To down!");
    console.log("Project number:", projectNumber);
  }

  function scrollToStartSection() {
    window.scrollTo(0, projectsSection.offsetTop);
  }
}
