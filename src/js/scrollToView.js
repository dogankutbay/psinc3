(function() {
    'use strict';

    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + 400;

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    $(window).scroll(function () {
        $('.specialities').each(function () {
            if (isScrolledIntoView(this) === true) {
                $('.s1').addClass('fadeInLeft');
                $('.s2').addClass('fadeInRight');
                $('.s3').addClass('fadeInLeft');
                $('.s4').addClass('fadeInRight');
            }
        });
    });

})();
