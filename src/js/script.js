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
      scrollToStartOfSection();
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
    return projectNumber == minProjectNumber - 1;
  }

  function isFinishState() {
    return projectNumber >= maxProjectNumber + 1;
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
    if (projectNumber <= maxProjectNumber)
      onSwitchProjectCallback(projectNumber);
  }

  function toPrevProject() {
    projectNumber--;
    console.log("To down!");
    console.log("Project number:", projectNumber);
    if (projectNumber >= minProjectNumber)
      onSwitchProjectCallback(projectNumber);
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
