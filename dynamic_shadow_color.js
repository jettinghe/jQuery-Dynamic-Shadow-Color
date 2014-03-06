/*
    Change element shadow color dynamically based on 
    its target parent row's background color, shadow length and 
    shadow opacity/fade/

    Copyright (c) 2013-2014, Justin He
    Licensed under the MIT License.
*/

(function dynamicShadow(){
    function rgb2hex(rgb) {
        var color = rgb,
        hex = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + ("0" + parseInt(hex[1],10).toString(16)).slice(-2) +
                     ("0" + parseInt(hex[2],10).toString(16)).slice(-2) +
                     ("0" + parseInt(hex[3],10).toString(16)).slice(-2);
    }
    (jQuery).fn.addShadow = function(size, fade, opacity, placement){
        if ((jQuery)(this).length > 0) {
            var $this = (jQuery)(this),
                bgColor = $this.css('background-color'),
                bgColor = ($this.css('background-color') == 'rgba(0, 0, 0, 0)') ? 'rgb(255,255,255)' : bgColor,
                opacity = opacity,
                size = opacity < 0.01 ? '0' : size,
                fade = fade,
                opaqueColor = (jQuery).xcolor.opacity(rgb2hex(bgColor), "black", opacity),
                boxShadowArray = [],
                axisX = axisY = 1,
                maxGradientLevel = Math.ceil(size * fade);

            switch (placement){
                case 'right-bottom':
                    axisX = axisY = 1;
                    break;
                case 'right-top':
                    axisX = 1;
                    axisY = -1;
                    break;
                case 'left-bottom':
                    axisX = -1;
                    axisY = 1;
                    break;
                case 'left-top':
                    axisX = axisY = -1;
                    break;
            }

            for (var i = 0; i < size; i++) {
                var boxShadowPixel = size - i,
                    boxShadowSingle = axisX * boxShadowPixel + "px " + axisY * boxShadowPixel + "px ";
                boxShadowSingle += (i <= maxGradientLevel && fade > 0.01) ? (jQuery).xcolor.gradientlevel(opaqueColor, bgColor, maxGradientLevel - i, maxGradientLevel) : opaqueColor;
                boxShadowArray.push(boxShadowSingle);
            }
            var boxShadowCSS = boxShadowArray.reverse().join();

            $this.find(".shadow-object").each(function(){
                (jQuery)(this).css("box-shadow", boxShadowCSS);
            });
        }
    };
    (jQuery)('.shadow-section').each(function(){
        var $this = (jQuery)(this),
            size = parseFloat($this.data('size')),
            fade = parseFloat($this.data('fade')),
            opacity = parseFloat($this.data('opacity')),
            placement = $this.data('placement');

        $this.addShadow(size, fade, opacity, placement);
    });
})(jQuery);