'use strict';

window.addEventListener('DOMContentLoaded', () => { 

    $('a[href^="#"').on('click', function() {

        let href = $(this).attr('href');
    
        $('html, body').animate({
            scrollTop: $(href).offset().top + 120
        });
        return false;
    });
        

    const burger = document.querySelector('.header__burger');
    const sideNav = document.querySelector('.header__sidemenu');
    

    burger?.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        burger.classList.toggle('active');
    })


    const projectsWrap = document.querySelector('.projects__test');
    const projectsWrapper = document.querySelectorAll('.projects__wrapper');
    const block = document.getElementById("projects"); 
    const bike = document.querySelector('.projects__road-bike');
    const projectsText0 = document.getElementById("tr0"); 
    const projectsText1 = document.getElementById("tr1"); 
    const projectsText2 = document.getElementById("tr2"); 
    let marker = false;

    let projectsOffset = 1380;
    const baseOffset = 280;

    let bikePosition = 0;
    let wheelAnimation = false;

    function disableScroll() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    
        window.onscroll = function(e) {

            if (!wheelAnimation) {
                bike.classList.add('tr');
                wheelAnimation = true;
            } else {
                setTimeout(() => {
                    bike.classList.remove('tr');
                    wheelAnimation = false;
                }, 600);
            }

            if (window.scrollY < scrollTop) {
                if (bikePosition > 0) {
                    bikePosition = bikePosition - 10;
                }
            } else if (window.scrollY > scrollTop) {
                bikePosition = bikePosition + 10;
            }
            window.scrollTo(scrollLeft, scrollTop);
        };
    }
      
    function enableScroll() {
        window.onscroll = function() {};
    }

    let bottomMarker = false;


    function handleScroll(e) {
        
        var blockPosition = block.getBoundingClientRect();

        if ((blockPosition.top > -baseOffset) && !marker) {
            disableScroll();
        } 
        if ((blockPosition.top < -baseOffset)) {
            marker = true;
        } 

        if (bottomMarker && (blockPosition.top < -baseOffset)) {
            disableScroll();
        } 

        // bike.style.transform = "translateX(" + (bikePosition) + "px)";  

        if (bottomMarker && bikePosition < 10) {
            enableScroll();
            bottomMarker = false;
            marker = false;
        }
        if (bikePosition == 0) {
            projectsWrap.style.transform = "translateX(" + (0) + "px)";  
            bike.style.transform = "translateX(" + (0) + "px)";  
            projectsWrapper.forEach(item => item.classList.remove("active"));
            projectsWrapper[0].classList.add("active");   
            projectsText1.classList.remove('active');
            projectsText2.classList.remove('active');
            projectsText0.classList.add('active');
        }
        if (bikePosition == 50) {
            projectsWrap.style.transform = "translateX(" + (-projectsOffset) + "px)"; 
            bike.style.transform = "translateX(" + (430) + "px)";   
            projectsWrapper.forEach(item => item.classList.remove("active"));
            projectsWrapper[1].classList.add("active");   
            projectsText0.classList.remove('active');
            projectsText2.classList.remove('active');
            projectsText1.classList.add('active');
        }
        if (bikePosition == 100) {
            projectsWrap.style.transform = "translateX(" + (-projectsOffset * 2) + "px)";
            bike.style.transform = "translateX(" + (820) + "px)";  
            projectsWrapper.forEach(item => item.classList.remove("active"));
            projectsWrapper[2].classList.add("active");
            projectsText0.classList.remove('active');
            projectsText1.classList.remove('active');
            projectsText2.classList.add('active');
        }
        if (!bottomMarker && bikePosition >= 100) {
            enableScroll();
            bottomMarker = true;
        }
    }

    document.addEventListener("scroll", handleScroll);

});