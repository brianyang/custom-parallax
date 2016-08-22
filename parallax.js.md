# `parallax.js`
This file allows you to specify the rate at which preceding and proceeding elements scroll.
As the user scrolls down the page, the image on the left will scroll slower, while the CTA
on the right will scroll faster.



## `invoke`
When the user is in author mode or on a mobile device, this feature will be disabled.
```js
        invoke: function() {
            if ($('body').hasClass('edit-mode')) {
                return
            }
            if (!this.detectMobile()) {
                this.startParallax()
            }
            return this.defineSelector()
        }

```
## `defineSelector`
We want the feature to be enabled in the html when the user sets a data attribute.
```js
        , defineSelector: function() {
            var elems = document.querySelectorAll('[data-parallax="scroll"]')
            return elems
        }

```
## `calculateDimensions`
To handle the animation we need to determine some things:
* the percentage at which to animate the image in respect to the browser scroll
* the height from the top of the window to the top of the element
* the height of the next element we will be animating
```js
        , calculateDimensions: function() {
            this.dimensions = {
                percentage: this.defineSelector()[0].dataset.speed
                , percentage2: '0.2'
                , rectTop: this.defineSelector()[0].getBoundingClientRect().top + window.pageYOffset
            }
```
If a CTA exists, then we calculate the top value and define that in our context.
```js
            this.defineSelector()[0].nextElementSibling ? this.ctaTop = this.defineSelector()[0].nextElementSibling.getBoundingClientRect().top : this.ctaTop = 0
            return this.dimensions
        }

```
## `setDefaultStartStop`
These values will be needed to tweak the animation. These values define at which point the image
will become visible, i.e. 100px before the component enters view. We also need to know when to
stop the animation, i.e. 300px below the component.
```js
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

```
## `detectMobile`
Check the user agent to determine whether to start the animation
```js
        , detectMobile: function() {
            this.mobile = navigator.userAgent.match(/(iPod|iPhone|iPad)/) || navigator.userAgent.match(/(Android)/)
            return this.mobile
        }

```
## `scrollHandler`
This is the logic that handles the animation. Based upon the position of the previous and next elements,
check if the position of the component is scrolled into view, and set the value of the image to show first.
If the component is at the bottom, set the image to stop animating.
```js
        , scrollHandler: function() {
```
Define a reference to the current scroll position of the window
```js
            this.scrollTop = window.pageYOffset
            this.windowHeight = window.outerHeight
```
Define a reference to add the current scroll position with the height of the window, called `scrollBtm`.
```js
            this.scrollBtm = this.scrollTop + this.windowHeight
```
Define a reference to the image and the CTA
```js
            this.el = this.defineSelector()[0].previousElementSibling
            this.cta = this.defineSelector()[0].nextElementSibling

```
When the item is about to enter view..
```js
            if (this.scrollBtm + this.setDefaultStartStop().peakTop > this.rectTop) {
```
Set the `marginTop` value of the image
```js
                this.el.style.marginTop = '-' + this.setDefaultStartStop().peakTop + 'px'
```
Define the ratio taking into account the position of `scrollBtm`, the top of the component,
multipled by the scroll percent.
```js
                this.ratio = (this.scrollBtm - this.rectTop) * (1 - this.percentage)
```
When the item reaches the bottom..
```js
                if (this.ratio < this.setDefaultStartStop().stopBtm) {
                    this.el.style.transform = 'translateY('+ this.ratio  +'px)'
                }

```
Handle the scroll speed for the CTA
```js
            if (this.scrollBtm > this.ctaTop) {
                this.ratio2 = (this.scrollBtm - this.ctaTop) * (.2)
                this.cta.style.transform = 'translateY(-'+ this.ratio2  +'px)'
            }


```
## `startParallax`
Get the values to determine the scroll percentage, and the positions of the component and CTA,
then invoke the `scrollHandler` method on the scroll event.
```js
        , startParallax: function() {
            this.percentage = this.calculateDimensions().percentage
            this.percentage2 = this.calculateDimensions().percentage2
            this.rectTop = this.calculateDimensions().rectTop
            this.ctaTop = this.calculateDimensions().ctaTop
            window.addEventListener('scroll', this.scrollHandler.bind(this))
        }

```
### Initialize
Start the script if there is an html element with the expected data attribute.
```js
    if (document.querySelectorAll('[data-parallax="scroll"]').length) parallax.invoke()

```
Return parallax method for testing.
```js
    return {
        parallax: parallax
    }


```
------------------------
Generated _Mon Aug 22 2016 16:09:36 GMT-0400 (EDT)_ from [&#x24C8; parallax.js](parallax.js "View in source")

