/*
 * jQuery miniModal Plugin v.5 (pre-release)
 * @author Mike Kuzin http://mikekuzin.com 
 * Kudos to Nate Good (http://nategood.com)
 * ---------------------------------------
 * Copyright (c) 2011 Mike Kuzin
 * ---------------------------------------
 *
 * How to use →
 *
// Requires no HTML hooks, appends all elements needed and leaves them in the DOM
// use onClose: function(){$.miniModal.kill();};
// Use $.miniModal.close(); to close the modal externally
 $('#back').click(function(){
     $.miniModal({
         load           : '',               // string or jQuery Object
         appendTo       : 'body',           // string
         fade           : 0,                // int
         height         : null,             // int or null
         width          : null,             // int or null
         close          : false,            // bool
         escClose       : true,             // bool
         overlayClose   : true,             // bool
         position       : true,             // bool (sets auto positining)
         absolute       : false             // bool (allows objects to be positioned absolutly to container [@ 100%])
         modal          : true,             // bool (displays modal)
         overlay        : true,             // bool (displays overlay)
         overlayId      : 'overlay',        // string (overlay's id)
         modalId        : 'modal_base',     // string (modal's id)
         closeId        : 'modal_close',    // string (close button's id)
         onOpen         : function(){},     // Callback (onOpen Callback)
         onClose        : function(){},     // Callback (onClose Callback)
         style          : 'modal',          // string (sets class for styling)
     });
 });
 *
 */

(function($) {
            
    $.miniModal = function (data, options) {
        return $.miniModal.run.init(data,options);
    };
    $.miniModal.init = function () {
        $.miniModal.run.init();
    }
    $.miniModal.close = function () {
        $.miniModal.run.close();
    };
    $.miniModal.kill = function() {
        $.miniModal.run.kill();
    };
    $.fn.miniModal = function (options) {
        return $.miniModal.run.init(this, options);
    };
    
    $.miniModal.defaults = {
        load: '',
        appendTo: 'body',
        focus: true,
        fade: 0,
        height: null,
        width: null,
        close: true,
        escClose: true,
        overlayClose: true,
        position: true,
        absolute: false,
        modal: true,
        overlay: true,
        overlayId: 'overlay',
        modalId: 'modal_base',
        closeId: 'modal_close',
        onOpen: function(){},
        onClose: function(){},
        style: 'modal',
        //customCss: {},
    };
    
    // Object Generator
    var $div = function (id, cssText) {
        var div = document.createElement('div');
        if (id) {div.id = id}
        return $(div);
    }
    
    // Cached jQuery Object Variables
    var $overlay, $box, $wrap, $content, $loaded, $modal, $window;
    
    $.miniModal.run = {
        
        init: function (options) {
            
            // Settings / Options
            var settings = $.extend(true, {}, $.miniModal.defaults, options),
                wrapper = settings.appendTo;
                
            if (wrapper != 'body') {
                var wrapper = '#' + settings.appendTo;
            }
            
            // onOpen Callback
            settings.onOpen.call();
            
            // Load Content
            var loader = function() {
                if (settings.style == null) {
                    $box.html(settings.load);
                } else {
                    $box.html(settings.load)
                        .append($close)
                        .wrapInner('<span />')
                        .wrapInner('<div class="' + 
                            settings.style +'" />');
                    if (settings.absolute == true) 
                        $box.css({'height' : '100%', 'width' : '100%'});
                }
            }
            
            // Create DOM
            var create = function () {
                $window     = $(window);
                $overlay    = $div(settings.overlayId).hide();
                $box        = $div(settings.modalId); 
                $close      = $div(settings.closeId);
                $(wrapper).prepend($box.append($close), $overlay);
                loader();
            }
            
            var display = function() {
                if (settings.fade != 0) {
                    $box.fadeIn(settings.fade);
                    $overlay.fadeIn(settings.fade);
                    loader();
                } else {
                    $box.show();
                    $overlay.show();
                    if (settings.close != false) 
                        $close.show();
                    loader();
                }
            }
            
            if ($('#' + settings.modalId).length == 0) {
                create();
            } else {
                display();
            }
            
            if (settings.modal == true)
                $box.fadeIn(settings.fade);
            if (settings.overlay == true)
                $overlay.fadeIn(settings.fade);
            if (settings.overlay == false)
                $overlay.css({'opacity':0}).show();
            if (settings.close == true)
                $close.fadeIn(settings.fade);
        
            // Sizing
            if (settings.modalHeight != null)
                $box.css({'height' : settings.modalHeight});
            if (settings.modalWidth != null)
                $box.css({'width' : settings.modalWidth});
            
            if (settings.position != false) {
                var w = ($box.width()) / 2,
                    h = ($box.height()) / 2;
                $box.css({
                    'top' : '50%',
                    'left' : '50%',
                    'marginLeft': -w,
                    'marginTop' : -h
                });
            }
            
            // Closing events
            
            if (settings.overlayClose == true) {
                $overlay.click(function(){
                    $.miniModal.close();
                });
            }
            $close.click(function(){
                $.miniModal.close();
            });
            
            $(document).keydown(function(e) {
                if (e.keyCode == 27 && settings.close == true && settings.escClose == true) { 
                    e.preventDefault();
                    $.miniModal.close();
                };
            });
            
            $(document).bind('keydown', function(e) {
                if ((settings.escClose && settings.close) && e.keyCode === 27) {
                    
                }
            })
        },
        
        resize: function () {
            // Sizing
            if (settings.height != null)
                $box.css({'height' : settings.height});
            if (settings.width != null)
                $box.css({'width' : settings.width});
        },
        
        kill: function (options) {
          var settings = $.extend(true, {}, $.miniModal.defaults, options);
          settings.onClose.call(this);
          if (settings.fade != false) {
              $box.fadeOut(settings.fade);
              $box.fadeOut(settings.fade);
              setTimeout(function(){
                 $box.remove();
                 $overlay.remove(); 
              }, settings.fade + 10);
          } else {
              $box.remove();
              $overlay.remove();
          }
        },
        
        close: function (options) {
            var settings = $.extend(true, {}, $.miniModal.defaults, options);
            settings.onClose.call(this);
            if (settings.fade != false) {
                $box.fadeOut(settings.fade);
                $overlay.fadeOut(settings.fade);
            } else {
                $box.hide();
                $overlay.hide();
            }
        }
    }
    
    function dbg(obj) {
        if (window.console && window.console.log)
            window.console.log(obj);
    }    
    
})(jQuery);