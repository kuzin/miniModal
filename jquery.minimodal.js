/*
 * jQuery miniModal Plugin v.6 (pre-release)
 * @author Mike Kuzin http://mikekuzin.com 
 * Kudos to Nate Good (http://nategood.com)
 * Kudos to Pat Collins (http://www.burned.com/)
 * ---------------------------------------
 * Copyright (c) 2011 Mike Kuzin & Peeps
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
         closeTxt       : '[close]'         // string
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
         onOpen         : function(){},     // Callback
         onLoad         : function(){},     // Callback
         onClose        : function(){},     // Callback
         onOpen         : function(){},     // Callback
         onCreate       : function(){},     // Callback
         onDisplay      : function(){},     // Callback
         onResize       : function(){},     // Callback
         onKill         : function(){},     // Callback
         beforeClose    : function(){},     // Callback
         style          : 'modal',          // string (sets class for styling)
     });
 });
 *
 */

(function($) {
    $.miniModal = function(data, options) {
        return $.miniModal.run.init(data, options);
    };
    $.miniModal.init = function(data, options) {
        $.miniModal.run.init(data, options);
    };
    $.miniModal.create = function(data, options) {
        $.miniModal.run.create(data, options);
    };
    $.miniModal.load = function(data, options) {
        $.miniModal.run.load(data, options);
    };
    $.miniModal.display = function(data, options) {
        $.miniModal.run.display(data, options);
    };
    $.miniModal.resize = function(data, options) {
        $.miniModal.run.resizer(data, options);
    };
    $.miniModal.close = function(data, options) {
        $.miniModal.run.close(data, options);
    };
    $.miniModal.kill = function(data, options) {
        $.miniModal.run.kill(data, options);
    };
    $.fn.miniModal = function(options) {
        return $.miniModal.run.init(this, options);
    };
    // Defaults
    $.miniModal.defaults = {
        load: '',
        appendTo: 'body',
        closeTxt: '[close]',
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
        onOpen: function() {},
        onCreate: function() {},
        onLoad: function() {},
        onDisplay: function() {},
        onClose: function() {},
        onResize: function() {},
        onKill: function() {},
        beforeClose: function() {},
        style: 'modal'
        //customCss: {},
    };
    // Object Generator
    var $div = function(id, cssText) {
        var div = document.createElement('div');
        if (id) div.id = id;
        return $(div);
    };
    // Cached jQuery Object Variables
    var $overlay, $box, $wrap, $content, $loaded, $modal, $window, $close, create, wrapper, overlay;
    var settings = $.miniModal.defaults;
    $.miniModal.run = {
        // Init Script
        init: function(options) {
            // Settings 
            settings = $.extend(true, {},
            $.miniModal.defaults, options);
            // console.log(settings, options);
            
            settings.onOpen.call();
            $.miniModal.run.display();
            // Close events
            if (settings.overlayClose == true) {
                $overlay.click(function() {
                    $.miniModal.close();
                });
            };
            if ($close) {
                $close.click(function() {
                    settings.beforeClose.call();
                    $.miniModal.close();
                });
            }
            $(document).keydown(function(e) {
                var loading = $('#loading').is(':visible');
                if (e.keyCode == 27 && settings.close == true && settings.escClose == true && loading != true) {
                    settings.beforeClose.call();
                    e.preventDefault();
                    $.miniModal.close();
                };
            });
        },
        // decide what to display
        display: function() {
            settings.onDisplay.call();
            if ($('#overlay').length == 0) {
                $.miniModal.run.create();
            } else {
                $.miniModal.run.load();
            };
        },
        // Create DOM 
        create: function() {
            settings.onCreate.call();
            // Check container
            wrapper = settings.appendTo;
            if (wrapper != 'body') {
                wrapper = '#' + settings.appendTo;
            }
            $window = $(window);
            $overlay = $div(settings.overlayId).hide();
            if (settings.overlay == false)
                $overlay.css('opacity', 0);
            $box = $div(settings.modalId);
            $close = $div(settings.closeId);
            $(wrapper).prepend($box.append($close), $overlay);
            $.miniModal.run.load();
            $.miniModal.run.resizer();
        },
        // Load Content
        load: function() {
            
            // $box.clearstyles
            $box.removeAttr('style');
            if (settings.style == null) {
                $box.html(settings.load);
                $close.html(settings.closeTxt);
            } else {
                $box.html(settings.load).append($close).wrapInner('<span />')
                    .wrapInner('<div class="' + settings.style + '" />');
                $close.html(settings.closeTxt);
            };
            if (settings.height != null) $box.css({
                'height': settings.height
            });
            if (settings.width != null) $box.css({
                'width': settings.width
            });
            if (settings.fade != 0) {
                if (settings.overlay != false) { 
                    $overlay.fadeIn(settings.fade);
                } else {
                    $overlay.show().css({'opacity':0}); 
                };
                if (settings.modal == true) $box.fadeIn(settings.fade);
                if ($close) {
                    if (settings.close != true) {
                        $close.hide();
                    } else {
                        $close.show();
                    }
                }
            } else {
                if (settings.overlay != false)  {
                    $overlay.show();
                } else {
                    $overlay.show().css({'opacity':0});
                }
                $box.show();                
                $overlay.show();
                if ($close) {
                    if (settings.close != true) {
                        $close.hide();
                    } else {
                        $close.show();
                    };
                };
            };
            $.miniModal.run.resizer();
            settings.onLoad.call();
        },
        resizer: function() {
            settings.onResize.call();
            var w, h;
            if (settings.position == true) {
                w = ($box.width()) / 2;
                if ($close) {
                    h = (($box.height()) / 2) + 25;
                } else {
                    h = ($box.height()) / 2;
                };
                $box.css({
                    'top': '50%',
                    'left': '50%',
                    'marginLeft': -w,
                    'marginTop': -h
                });
            }
            if (settings.absolute == true) {
                $box.css({
                    'height': '100%',
                    'width': '100%'
                });
            };
        },
        close: function() {
            settings.onClose.call();
            if (settings.fade != false) {
                $box.fadeOut(settings.fade);
                $overlay.fadeOut(settings.fade);
                if ($close) $close.fadeOut(settings.fade);
            } else {
                $box.hide();
                $overlay.hide();
                if ($close) $close.hide();
            }
        },
        kill: function() {
            settings.onKill.call();
            if (settings.fade != false) {
                $box.fadeOut(settings.fade);
                $overlay.fadeOut(settings.fade);
                setTimeout(function() {
                    $box.remove();
                    $overlay.remove();
                    if ($close) $close.remove();
                },
                settings.fade + 10);
            } else {
                $box.remove();
                $overlay.remove();
                if ($close) $close.remove();
            };
        }
    };
})(jQuery);