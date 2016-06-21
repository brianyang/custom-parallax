/*************************************************************************
 * specify the rate at which precending and proceeding elements scroll
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

Parallax = (function(){

    'use strict'

    var parallax = {
        invoke: function() {
            if ($('body').hasClass('edit-mode')) {
                return
            }
            if (!this.detectMobile()) {
                this.startParallax()
            }
            return this.defineSelector()
        }

        , defineSelector: function() {
            var elems = document.querySelectorAll('[data-parallax="scroll"]')
            return elems
        }

        , calculateDimensions: function() {
            this.dimensions = {
                percentage: this.defineSelector()[0].dataset.speed
                , percentage2: '0.2'
                , rectTop: this.defineSelector()[0].getBoundingClientRect().top
                , ctaTop: this.defineSelector()[0].nextElementSibling.getBoundingClientRect().top
            }
            return this.dimensions
        }

        , setDefaultStartStop: function(cfg) {
            if (!cfg) {
                this.config = {
                    peakTop: 100
                    , stopBtm: 300
                }
            }
            if (cfg) this.config.peakTop = cfg.top
            if (cfg) this.config.stopBtm = cfg.btm
            return this.config
        }

        , detectMobile: function() {
            this.mobile = navigator.userAgent.match(/(iPod|iPhone|iPad)/) || navigator.userAgent.match(/(Android)/)
            return this.mobile
        }

        , scrollHandler: function() {
            this.scrollTop = window.pageYOffset
            this.windowHeight = window.outerHeight
            this.scrollBtm = this.scrollTop + this.windowHeight
            this.el = this.defineSelector()[0].previousElementSibling
            this.cta = this.defineSelector()[0].nextElementSibling

            if (this.scrollBtm + this.setDefaultStartStop().peakTop > this.rectTop) {
                this.el.style.marginTop = '-' + this.setDefaultStartStop().peakTop + 'px'
                this.ratio = (this.scrollBtm - this.rectTop) * (1 - this.percentage)
                if (this.ratio < this.setDefaultStartStop().stopBtm) {
                    this.el.style.transform = 'translateY('+ this.ratio  +'px)'
                }
            }

            if (this.scrollBtm > this.ctaTop) {
                this.ratio2 = (this.scrollBtm - this.ctaTop) * (.2)
                this.cta.style.transform = 'translateY(-'+ this.ratio2  +'px)'
            }

            return this
        }

        , startParallax: function() {
            this.percentage = this.calculateDimensions().percentage
            this.percentage2 = this.calculateDimensions().percentage2
            this.rectTop = this.calculateDimensions().rectTop
            this.ctaTop = this.calculateDimensions().ctaTop
            window.addEventListener('scroll', this.scrollHandler.bind(this))
            return this
        }
    }

    if (document.querySelectorAll('[data-parallax="scroll"]').length) parallax.invoke()



    return {
        parallax
    }

})();
