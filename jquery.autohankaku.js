/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Modify to convertKana: @phungnc
 * Licensed under the MIT license
 */
 
 
// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {
 
    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.
 
    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in our plugin).
 
    // Create the defaults once
    var pluginName = "autoHankaku",
        defaults = {
            targetEl: '',
            katakana: true
        };
 
    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
 
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
 
        this.init();
    }
 
    Plugin.prototype.init = function () {
        // Place initialization logic here
        // We already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
        this.sourceEl = $(this.element);
        //this.targetEl = $(this.options.targetEl);
        // assign (create) new version of convert function that use this.
        convert = convert.bind(this);
        this.sourceEl.on('keydown', convert);
    };
    // custom 
    function convert () {
        var sourceVal = this.sourceEl.val();
        var newVal = "";
        //var sourceLen = sourceVal.length;
        //var targetLen = getKana(sourceVal).length;
        //
        //if (targetLen === sourceLen) {
        //    this.targetEl.val( toKana.call(this, sourceVal) )
        //};
        //check if zenkaku moji
        //weight = target.value;
        if( !isRegHan(sourceVal) ) {
          this.sourceEl[0].value = "";
          newVal = zenToHan.call(this,sourceVal);
          console.log(sourceVal);
          console.log(newVal);

          this.sourceEl[0].value = newVal;
          //this.sourceEl.val( sourceVal );
        }
    };
    //
    function isRegHan(str){
      //str=obj.value;
      /* 半角英数字(0-9)、四則演算子(+-/*)、ピリオド(.)、カンマ(,)のみ */
      var tmp=str.match(/[0-9a-zA-Z\+\-\/\*\,\. ]+/g);
      /* matchメソッドの返り値が入力値と等しい場合は、全て半角 */
      if (tmp!=str){
          //"半角文字以外が含まれている
          return false;
      }else{
          //"半角文字のみ
          return true;
      }
    };
    //
    function zenToHan(str) {
      return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
      });
    };
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            // $.data method allows us to attach data of any type to DOM elements
            // in a way that is safe from circular references and therefore free from 
            // memory leaks.
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );