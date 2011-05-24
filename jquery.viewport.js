/* 
*   Written by Aimee Ault (citizenaim@deviantart.com)
*   last updated May 24, 2011
*/

(function ($) {
    $.fn.viewPort = function (options) {
        var  $nodes = $(this)
            ,$win = $(window);
        
        options = $.extend({}, $.fn.viewPort.defaults, options);
        
        function inViewPort() {
            var  winHeight = $win.height()
                ,scrollTop = $win.scrollTop();
                
            $nodes.each(function () {
                var  $this = $(this)
                    ,offset = $this.offset().top
                    ,height = $this.height();
                if (scrollTop-options.buffer> (offset + height) || scrollTop + winHeight < offset-options.buffer) {
                    $this.trigger('inViewPort', [ false ]);
                } else {
                    $this.trigger('inViewPort', [ true ]);
                }
            });
        }
        if(jQuery.throttle) {
            $win.scroll($.throttle(options.delimitRate, inViewPort))
                .resize($.throttle(options.delimitRate, inViewPort))
                .click($.throttle(options.delimitRate, inViewPort));
        } else {
            $win.scroll(inViewPort)
                .resize(inViewPort)
                .click(inViewPort);
        }
    };

    $.fn.viewPort.defaults = {
         buffer: 0  //amount of extra space around viewport (use to allow smoother transitions from hidden to not-hidden)
        ,delimitRate: 0 //rate, in milliseconds to throttle scroll event
    };

})(jQuery);