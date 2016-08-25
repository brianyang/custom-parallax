```js
!function() {
```
## `invoke`
When the user is in author mode or on a mobile device, this feature will be disabled.
```js
        invoke: function() {
            if (!this.detectMobile()) {
                this.startParallax(this.defineSelector().length)
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
        , calculateDimensions: function(i) {
            this.dimensions = {
                percentage: this.defineSelector()[i].dataset.speed
                , percentage2: '0.2'
                , rectTop: this.defineSelector()[i].getBoundingClientRect().top + window.pageYOffset
            }
```
If a CTA exists, then we calculate the top value and define that in our context.
```js
            this.defineSelector()[i].nextElementSibling ? this.ctaTop = this.defineSelector()[i].nextElementSibling.getBoundingClientRect().top : this.ctaTop = 0
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
                    peakTop: 240
                    , stopBtm: 1000
                }
            }
            if ($(this.defineSelector()[0]).height() < 610) {
                this.config.stopBtm = 1300
            }
            if ($(this.defineSelector()[0]).height() < 540) {
                this.config.stopBtm = 1200
            }
            if ($(this.defineSelector()[0]).height() < 470) {
                this.config.stopBtm = 1100
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

            this.instance.forEach(function(instance, index){
```
Define a reference to the current scroll position of the window
```js
                instance.scrollTop = window.pageYOffset
                instance.windowHeight = window.outerHeight
```
Define a reference to add the current scroll position with the height of the window, called `scrollBtm`.
```js
                instance.scrollBtm = instance.scrollTop + instance.windowHeight
```
Define a reference to the image and the CTA
```js
                instance.el = this.defineSelector()[index].previousElementSibling
                instance.cta = this.defineSelector()[index].nextElementSibling

```
When the item is about to enter view..
```js
                if (instance.scrollBtm + this.setDefaultStartStop().peakTop > instance.rectTop) {
```
Set the `marginTop` value of the image
```js
                    instance.el.style.marginTop = '-' + this.setDefaultStartStop().peakTop + 'px'
```
Define the ratio taking into account the position of `scrollBtm`, the top of the component,
multipled by the scroll percent.
```js
                    instance.ratio = (instance.scrollBtm - instance.rectTop) * (1 - instance.percentage)
```
When the item reaches the bottom..
```js
                    if (instance.ratio < this.setDefaultStartStop().stopBtm) {
                        instance.el.style.transform = 'translateY('+ instance.ratio  +'px)'
                    }

```
Handle the scroll speed for the CTA
```js
                if (instance.scrollBtm > instance.ctaTop) {
                    instance.ratio2 = (instance.scrollBtm - instance.ctaTop) * (.2)
                    instance.cta.style.transform = 'translateY(-'+ instance.ratio2  +'px)'
                }


            }.bind(this))



```
## `startParallax`
Get the values to determine the scroll percentage, and the positions of the component and CTA,
then invoke the `scrollHandler` method on the scroll event.
```js
        , startParallax: function(number) {
            var i = 0
            this.instance = []
            for (i; i < number; i++) {
                var instanceObj = {
                    percentage:  this.calculateDimensions(i).percentage
                    , percentage: this.calculateDimensions(i).percentage
                    , percentage2: this.calculateDimensions(i).percentage2
                    , rectTop: this.calculateDimensions(i).rectTop
                    , ctaTop: this.calculateDimensions(i).ctaTop
                }
                this.instance.push(instanceObj)
            }

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
}()

```
------------------------
Generated _Thu Aug 25 2016 15:06:23 GMT-0400 (EDT)_ from [&#x24C8; parallax.js](parallax.js "View in source")

