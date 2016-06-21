'use strict'

var parallax = Parallax.parallax

describe('Parallax', () => {
    it('should exist', () => {
        expect(Parallax).to.not.be.undefined
    })
    it('should have parallax object', () => {
        expect(Parallax.feature).to.not.be.undefined
    })
})

describe('parallax feature', () => {
    afterEach(() => {
        $('body').removeClass('edit-mode')
        $('#mock, .previous, .next').remove()
    })
    xit('should return empty array if no element exists', () => {
        expect(parallax.invoke().length).to.equal(0)
    })
    it('should return item if element exists', () => {
        var div = '<div id=mock data-parallax="scroll" data-speed="1" />'
        $('body').prepend(div)
        expect(parallax.invoke().length).to.equal(1)
    })
    it('should handle edit-mode', () => {
        $('body').addClass('edit-mode')
        expect(parallax.invoke()).to.equal(undefined)
    })
})

describe('calculate dimensions', () => {
    afterEach(() => {
        $('#mock, .previous, .next').remove()
    })
    it('should return speed as percentage', function() {
        var div = '<div id=mock data-parallax="scroll" data-speed="5" />'
        $('body').prepend(div)
        $('#mock')[0].style.position = 'absolute'
        expect(parallax.calculateDimensions().percentage).to.equal('5')
    })
    it('should return top position of elem', () => {
        var div = '<div id=mock data-parallax="scroll" data-speed="5" />'
        $('body').prepend(div)
        expect(parallax.calculateDimensions().rectTop).to.equal(60)
        $('#mock')[0].style.marginTop = '500px'
        expect(parallax.calculateDimensions().rectTop).to.equal(500)
    })
})

describe('set default top bottom', () => {
    afterEach(() => {
        $('#mock, .previous, .next').remove()
    })
    it('should define default values', () => {
        expect(parallax.setDefaultStartStop().peakTop).to.equal(100)
        expect(parallax.setDefaultStartStop().stopBtm).to.equal(300)
    })
    it('should allow user to set start stop', () => {
        var config = {top: 200, btm: 400}
        expect(parallax.setDefaultStartStop(config).peakTop).to.equal(200)
        expect(parallax.setDefaultStartStop(config).stopBtm).to.equal(400)
    })
})

describe('test parallax methods', () => {
    beforeEach(() => {
        var div = '<div class=previous /><div id=mock data-parallax="scroll" data-speed=".5" /><div class=next />'
        $('body').prepend(div)
    })
    afterEach(() => {
        $('#mock, .previous, .next').remove()
    })
    var json = '{"dimensions":{"percentage":"5","rectTop":60},"percentage":"5","rectTop":60,"config":{"peakTop":200,"stopBtm":400}}'
    xit('should assert schema', () => {
        expect(JSON.stringify(parallax.startParallax())).to.equal(json)
        expect(parallax.startParallax().percentage).to.equal('5')
        expect(parallax.startParallax().rectTop).to.equal(60)
    })
    it('should select previous sibling', () => {
        var prev = $('#mock').prev()[0]
        expect(parallax.scrollHandler().el).to.be(prev)
    })
    it('should select next sibling', () => {
        var next = $('#mock').next()[0]
        expect(parallax.scrollHandler().cta).to.be(next)
    })
    it('should check that bottom position at bottom of window is defined as scrollBtm', () => {
        expect(parallax.scrollHandler().scrollBtm).to.be(window.outerHeight)
    })
    it('should check that the viewport will set the image height to peek', () => {
        window.outerHeight = 5000
        expect(parallax.scrollHandler().el.style.marginTop).to.equal('-' + parallax.setDefaultStartStop().peakTop + 'px')
    })
    it('should configure the element to transform', () => {
        expect(parallax.scrollHandler().el.style.transform).to.equal('translateY(0px)')
        var mockRatio = 250
        expect(parallax.scrollHandler.bind(mockRatio)).to.be.true
    })
})

describe('detect mobile', () => {
    it('should check user agent for mobile', () => {
        navigator.__defineGetter__('userAgent', () => {
            return "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"
        })
        expect(parallax.detectMobile().length).to.be(2)
    })
})


