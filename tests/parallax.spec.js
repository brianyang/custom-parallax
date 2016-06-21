'use strict'

var nfp = NYL.feature.parallax

describe('NYL', () => {
    it('should exist', () => {
        expect(NYL).to.not.be.undefined
    })
    it('should have parallax object', () => {
        expect(NYL.feature).to.not.be.undefined
    })
})
describe('parallax feature', () => {
    afterEach(() => {
        $('body').removeClass('edit-mode')
        $('#mock').remove()
    })
    xit('should return empty array if no element exists', () => {
        expect(nfp.invoke().length).to.equal(0)
    })
    it('should return item if element exists', () => {
        var div = '<div id=mock data-parallax="scroll" data-speed="1" />'
        $('body').prepend(div)
        expect(nfp.invoke().length).to.equal(1)
    })
    it('should handle edit-mode', () => {
        $('body').addClass('edit-mode')
        expect(nfp.invoke()).to.equal(undefined)
    })
})

describe('calculate dimensions', () => {
    it('should return speed as percentage', function() {
        var div = '<div id=mock data-parallax="scroll" data-speed="5" />'
        $('body').prepend(div)
        $('#mock')[0].style.position = 'absolute'
        expect(nfp.calculateDimensions().percentage).to.equal('5')
    })
    it('should return top position of elem', () => {
        expect(nfp.calculateDimensions().rectTop).to.equal(60)
        $('#mock')[0].style.marginTop = '500px'
        expect(nfp.calculateDimensions().rectTop).to.equal(560)
    })
})

describe('set default top bottom', () => {
    it('should define default values', () => {
        expect(nfp.setDefaultStartStop().peakTop).to.equal(100)
        expect(nfp.setDefaultStartStop().stopBtm).to.equal(300)
    })
    it('should allow user to set start stop', () => {
        var config = {top: 200, btm: 400}
        expect(nfp.setDefaultStartStop(config).peakTop).to.equal(200)
        expect(nfp.setDefaultStartStop(config).stopBtm).to.equal(400)
    })
})

describe('detect mobile', () => {

})

xdescribe('Define selector', () => {
    beforeEach(() => {
        var sut = '<div id="sut" data-parallax="scroll" />'
        $('body').append(sut)
    })
    afterEach(() => {
        $('#sut').remove()
    })
    it('should be defined', () => {
        expect(Init.defineSelector).to.be.defined
    })
    it('should check that data is scroll', () => {
        var sut = '<div id="sut" data-parallax="scroll" />'
        $('body').append(sut)
        expect(Init.defineSelector()[0].dataset.parallax).to.equal('scroll')
    })
})

xdescribe('handle mobile and desktop', () => {

    it('should check invokes scroll on desktop ', () => {
        var $sut = Init.defineSelector()
        var device = 'desktop'
        Init.checkDevice($sut, 'desktop')
        expect($('#sut').length).to.equal(1)
        expect(Init.checkDevice($sut, device)).to.equal('scrollInvokesParallax')
    })
    it('should check scroll invokes parallax', () => {
        $('body').height('2000px')
        $('body').scrollTop('1000px')
        $("html, body").animate({scrollTop: 100}, 100, () => {
            $("html, body").animate({scrollTop: 0}, 1000)
        })
        expect(Init.invokeParallax()).to.equal('invokedParallax')
    })
    it('should add class where mobile', () => {
        var $sut = Init.defineSelector()
        Init.checkDevice($sut, 'mobile')
        expect($($sut[0]).parent().hasClass('mobile')).to.be.true


    })
})
