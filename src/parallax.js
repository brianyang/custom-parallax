/*************************************************************************
 * comments will be removed when this script is ready for testing
 *
 *************************************************************************
 *
 * @description
 * implement parallax effect on adjacent element
 *
 * @author
 * Brian Yang
 *
 *************************************************************************/

(function(){

    if ($('body').hasClass('edit-mode')) {
        return;
    }

    'use strict'

    var elems, elem, config, device, mobileUA, ratio, stopBtm, ratio2

    elem = document.querySelectorAll('[data-parallax="scroll"]')

    mobileUA = navigator.userAgent.match(/(iPod|iPhone|iPad)/) || navigator.userAgent.match(/(Android)/)
    mobileUA ? device = 'mobile' : device = 'desktop'

    config = {
        peakTop: 100
      , stopBtm: 300
    }

    elem.length && device == 'desktop' ? startParallax() : null

    if (device == 'mobile') elem[0].parentElement.classList.add('mobile')

    function startParallax () {

        var cta = elem[0].nextElementSibling
        , ctaTop = cta.getBoundingClientRect().top


        // determine configured speed and top position of elem
        var percentage = elem[0].dataset.speed
            , rectTop = elem[0].getBoundingClientRect().top

        window.addEventListener('scroll', function() {
            // position at top of window when scrolled
            var scrollTop = window.pageYOffset
                , windowHeight = window.outerHeight
            // position at bottom of window when scrolled
                , scrollBtm = scrollTop + windowHeight
                , el = elem[0].previousElementSibling
                , cta = elem[0].nextElementSibling

            if (scrollBtm > ctaTop) {
                ratio2 = (scrollBtm - ctaTop) * (.2)
                cta.style.transform = 'translateY(-'+ ratio2  +'px)'
            }

            // bottom of scroll is greater than the value of element
            if (scrollBtm + config.peakTop > rectTop) {
                el.style.marginTop = '-' + config.peakTop + 'px'
                // determine position and implement speed of effect
                ratio = (scrollBtm - rectTop) * (1 - percentage)

                // stop motion when leaving
                if (ratio < config.stopBtm) {
                    el.style.transform = 'translateY('+ ratio  +'px)'
                }
            }

        })

    }

})();
