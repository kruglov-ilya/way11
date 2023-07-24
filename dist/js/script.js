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
  const topSectionPositionOfset = 0;
  const pause = 500;

  let projectNumber = 1;
  let delayStart = Date.now() - pause;

  document.addEventListener("scroll", (ev) => {
    let scrollIsActive = true;

    const distanceFromTop = projectsSection.getBoundingClientRect().top;
    if (
      (scrollToDownOfSection(distanceFromTop) && !isFinishState()) ||
      (scrollToTopOfSection(distanceFromTop) && !isStartState())
    ) {
      scrollIsActive = false;
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

  function scrollToDownOfSection(distanceFromTop) {
    return distanceFromTop < topSectionPositionOfset;
  }

  function scrollToTopOfSection(distanceFromTop) {
    return distanceFromTop > topSectionPositionOfset;
  }

  function isStartState() {
    return projectNumber == 0;
  }

  function isFinishState() {
    return projectNumber >= 4;
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
