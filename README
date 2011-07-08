How to use
==============================================================================

Requires no HTML hooks, appends all elements needed and leaves them in the DOM

use onClose: `function(){$.miniModal.kill()};`

Use `$.miniModal.close();` to close the modal externally

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
            position       : true,             // bool (sets auto positioning)
            absolute       : false             // bool (allows objects to be positioned absolutely to container [@ 100%])
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