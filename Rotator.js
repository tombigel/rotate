var Rotator = new Class({
    initialize:function (angle, isRad) {
        this.setAngle(angle, isRad);
    },
    setAngle:function (angle, isRad) {
        angle = angle || 0;
        if (isRad) {
            angle = this._rad2deg(angle);
        }
        this._angle = angle;
    },
    /**
     * Calculate angle,
     * Original function here:
     * http://beradrian.wordpress.com/2009/03/23/calculating-the-angle-between-two-points-on-a-circle/
     * @param target {x, y}
     * @param center  {x, y}
     * @param source {x, y} Optional

     */
    getCalculatedAngle:function (target, center) { //), source){
        target = target || {};
        target.x = target.x || 0;
        target.y = target.y || 0;

        center = center || {};
        center.x = center.x || 0;
        center.y = center.y || 0;

//        source = source || {};
//        source.x = source.x || 0;
//        source.y = source.y || 0;


        var p0 = {
            x:center.x,
            y:center.y - Math.sqrt(Math.abs(target.x - center.x) * Math.abs(target.x - center.x)
                + Math.abs(target.y - center.y) * Math.abs(target.y - center.y)
            )};
        this._angle = this._rad2deg(2 * Math.atan2(target.y - p0.y, target.x - p0.x));
        return this._angle;
    },
    getAngle:function () {
        return this._angle;
    },
    getCssValue:function () {
        if (Modernizr && !Modernizr.csstransforms) {
            return this.getIeFilterCssValue();
        }
        return 'rotate(' + this._angle + 'deg)';

    },
    getIeFilterCssValue:function () {
        var ie = this._getIEFilterRotationParams(this._angle);
        return 'progid:DXImageTransform.Microsoft.Matrix(M11=' + ie.M11 + ', M12=' + ie.M12 + ',M21=' + ie.M21 + ', M22=' + ie.M22 + ', sizingMethod="auto expand")'
    },
//    getCssRule:function () {
//        return 'transform: rotate(' + this._angle + 'deg)';
//
//    },
//    getCrossBrowserCssRules:function () {
//        var ie = this._getIEFilterRotationParams(this._angle);
//        return  '-webkit-transform:' + this.getCssValue() + ';' +
//            '-moz-transform:' + this.getCssValue() + ';' +
//            '-ms-transform:' + this.getCssValue() + ';' +
//            '-o-transform:' + this.getCssValue() + ';' +
//            'transform:' + this.getCssValue() + ';' +
//            'filter:' + this.getIeFilterCssValue() + ';' +
//            'zoom: 1;'
//    },
    _getIEFilterRotationParams:function (deg) {
        rad = this._deg2rad(deg);
        costheta = Math.cos(rad);
        sintheta = Math.sin(rad);

        return {
            M11:costheta,
            M12:-sintheta,
            M21:sintheta,
            M22:costheta
        }

    },
    _deg2rad:function (deg) {
        return deg * Math.PI / 180;
    },
    _rad2deg:function (rad) {
        return rad * 180 / Math.PI;
    },
    toString:function () {
        return this.getCssValue();
    }

});