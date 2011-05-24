/* 
*   Written by Aimee Ault (citizenaim@deviantart.com)
*   last updated May 24, 2011
*/

(function ($) {
    $.fn.viewPort = function (options, callback) {
        var  $nodes = $(this)
            ,$win = $(window);
        
        options = $.extend({}, $.fn.viewPort.defaults, options);
        
        $nodes.live('inViewPort', callback);
        
        function inViewPort() {
            var  winHeight = $win.height()
                ,scrollTop = $win.scrollTop();
                
            $nodes.each(function () {
                var  $this = $(this)
                    ,offset = $this.offset().top
                    ,height = $this.height();
                    ,inView = (scrollTop-options.buffer> (offset + height) || scrollTop + winHeight < offset-options.buffer) ? false : true;
                    $this.trigger('inViewPort', [ inView ]);
            });
        }
        var callback = $.throttle
                     ? $.throttle(options.delimitRate, inViewPort)
                     : inViewPort;

        $win.scroll(callback)
            .resize(callback)
            .click(callback);
        
        return this;
    };

    $.fn.viewPort.defaults = {
         buffer: 0
        ,delimitRate: 0
    };

})(jQuery);