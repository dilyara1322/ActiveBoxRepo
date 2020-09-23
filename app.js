$(function(){

    /* fixed header */
    let header = $("#header");
    let intro = $("#intro");
    let introHeight = intro.innerHeight();
    let scrollPosition = $(window).scrollTop();

    $(window).on("scroll load resize", function(){
        scrollPosition = $(this).scrollTop();
        introHeight = intro.innerHeight();

        recalculateHeader(scrollPosition, introHeight);
    });

    function recalculateHeader(scrollPosition, introHeight) {
        if (scrollPosition > introHeight) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
    }

    /* toggle burger/menu */
    let nav = $("#nav");
    $("#nav-toggle").on("click", function(event){
        event.preventDefault();
        nav.toggleClass("show");
    });

    /* smooth scroll */
    $("[data-scroll]").on("click", function(event){
        event.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;
        
        $("html, body").animate({
            scrollTop: elementOffset - 60
        }, 700);
        nav.removeClass("show");
    });

    /* reviews */
    let slider = $("#reviews__slider");
    let slidesCount = $(".slideJS").length;
    let currentSlide = $(".slide--current");
    let currentSlideIndex = currentSlide.data("index");

    let incCurrentIndex = function(currentSlideIndex, slidesCount){
        return (currentSlideIndex + 1) % slidesCount;
    };
    let decCurrentIndex = function(currentSlideIndex, slidesCount){
        currentSlideIndex = currentSlideIndex - 1;
        if (currentSlideIndex < 0) currentSlideIndex = slidesCount - 1;
        return currentSlideIndex;
    };
    function changeCurrentSlide(changeCurrentIndex){
        currentSlide.removeClass("slide--current");
        currentSlideIndex = changeCurrentIndex(currentSlideIndex, slidesCount);
        $(".slideJS[data-index="+currentSlideIndex+"]").addClass("slide--current");
        currentSlide = $(".slide--current");
    };
    
    $(".slide-button.next").on("click", function(event){
        event.preventDefault();
        changeCurrentSlide(incCurrentIndex);
    });
    $(".slide-button.prev").on("click", function(event){
        event.preventDefault();
        changeCurrentSlide(decCurrentIndex);
    });
});