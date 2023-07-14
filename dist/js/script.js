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
        // document.body.style.overflow = "hidden";
    })


    const projectsWrap = document.querySelector('.projects__test');
    const projectsWrapper = document.querySelectorAll('.projects__wrapper');
    const block = document.getElementById("projects"); 
    const bike = document.querySelector('.projects__road-bike');
    const projectsText0 = document.getElementById("tr0"); 
    const projectsText1 = document.getElementById("tr1"); 
    const projectsText2 = document.getElementById("tr2"); 
    let marker = false;
    // let markerTop = false;
    let markerCount = 1;

    let projectsOffset = 1380;


    function disableScroll() {
        // Get the current page scroll position
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
      
            // if any scroll is attempted,
            // set this to the previous value
            window.onscroll = function() {
                window.scrollTo(scrollLeft, scrollTop);
            };
    }
      
    function enableScroll() {
        window.onscroll = function() {};
    }

    function handleScroll(e) {
        
        var blockPosition = block.getBoundingClientRect();
        console.log(blockPosition);

        if ((blockPosition.top > -280) && !marker) {
            disableScroll();
        } 
        if ((blockPosition.top < -280)) {
            marker = true;
        } 

        if ((marker && markerCount == 1)) {
            projectsWrap.style.transform = "translateX(" + (-projectsOffset) + "px)";  
            projectsWrapper.forEach(item => item.classList.remove("active"));
            projectsWrapper[1].classList.add("active");   
            bike.classList.remove('tr0');
            bike.classList.remove('tr2');
            bike.classList.add('tr1');
            projectsText0.classList.remove('active');
            projectsText2.classList.remove('active');
            projectsText1.classList.add('active');
            setTimeout(() => {
                markerCount = 2;
                marker = false;
            }, 600);
        }
        if(marker && markerCount == 2) {
            projectsWrap.style.transform = "translateX(" + (-projectsOffset * 2) + "px)";
            projectsWrapper.forEach(item => item.classList.remove("active"));
            projectsWrapper[2].classList.add("active");
            bike.classList.remove('tr0');
            bike.classList.remove('tr1');
            bike.classList.add('tr2');
            projectsText0.classList.remove('active');
            projectsText1.classList.remove('active');
            projectsText2.classList.add('active');
            setTimeout(() => {
                markerCount = 3;
                marker = false;
            }, 600);
        }
        if(markerCount == 3) {
            enableScroll();
        }


        // if (blockPosition.top < -350) {
        //     projectsWrap.style.transform = "translateX(" + (-projectsOffset * 2) + "px)";
        //     projectsWrapper.forEach(item => item.classList.remove("active"));
        //     projectsWrapper[2].classList.add("active");
        //     bike.classList.remove('tr0');
        //     bike.classList.remove('tr1');
        //     bike.classList.add('tr2');
        //     projectsText0.classList.remove('active');
        //     projectsText1.classList.remove('active');
        //     projectsText2.classList.add('active');
        // } else if (blockPosition.top < -249) {
        //     projectsWrap.style.transform = "translateX(" + (-projectsOffset) + "px)";  
        //     projectsWrapper.forEach(item => item.classList.remove("active"));
        //     projectsWrapper[1].classList.add("active");   
        //     bike.classList.remove('tr0');
        //     bike.classList.remove('tr2');
        //     bike.classList.add('tr1');
        //     projectsText0.classList.remove('active');
        //     projectsText2.classList.remove('active');
        //     projectsText1.classList.add('active');
        // } 
        // else {
        //     projectsWrap.style.transform = "translateX(" + (0) + "px)";   
        //     projectsWrapper.forEach(item => item.classList.remove("active"));
        //     projectsWrapper[0].classList.add("active");
        //     bike.classList.remove('tr1');
        //     bike.classList.remove('tr2');
        //     bike.classList.add('tr0');
        //     projectsText2.classList.remove('active');
        //     projectsText1.classList.remove('active');
        //     projectsText0.classList.add('active');
        // }
    }

    document.addEventListener("scroll", handleScroll);

});