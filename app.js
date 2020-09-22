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

    /* reviews https://kenwheeler.github.io/slick/*/
    let slider = $("#reviews__slider");
    let slidesCount = $(".slideJS").length;
    let currentSlide = $(".slide--current");
    let currentSlideIndex = currentSlide.data("index");
    $(".slide-button.next").on("click", function(event){
        event.preventDefault();
        currentSlide.removeClass("slide--current");
        currentSlideIndex = (currentSlideIndex + 1) % slidesCount;
        $(".slideJS[data-index="+currentSlideIndex+"]").addClass("slide--current");
        currentSlide = $(".slide--current");
    });
    $(".slide-button.prev").on("click", function(event){
        event.preventDefault();
        currentSlide.removeClass("slide--current");
        currentSlideIndex = currentSlideIndex - 1;
        if (currentSlideIndex < 0) currentSlideIndex = slidesCount - 1;
        $(".slideJS[data-index="+currentSlideIndex+"]").addClass("slide--current");
        currentSlide = $(".slide--current");
    });
    
});