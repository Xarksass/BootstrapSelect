/*! ========================================================================
 * FilterList: filterlist.js v2.0.0
 * ========================================================================
 * Copyright 2015, Salvatore Di Salvo (disalvo-infographiste[dot]be)
 * ======================================================================== */

(function ($) {
    'use strict';

    // SELECT FILTER PUBLIC CLASS DEFINITION
    // ====================================

    var FilterSelect = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, this.defaults(), options)
        this.structure = $.extend({}, this.parts())
    }

    FilterSelect.VERSION  = '1.0.0'

    FilterSelect.DEFAULTS = {
        method : 'recursive',
        items  : '.items'
    }

    FilterSelect.prototype.defaults = function() {
        return {
            select      : FilterSelect.DEFAULTS.select,
            method      : this.$element.attr('data-method') || FilterSelect.DEFAULTS.method,
            items       : this.$element.attr('data-items') || FilterSelect.DEFAULTS.items
        }
    }

    FilterSelect.prototype.parts = function() {
        return {
            $items : $(this.options.items, this.$element)
        }
    }

    FilterSelect.prototype.filter = function( section, select, val ) {
        alert(section+' - '+select+' - '+val);

        var $select = this.$element;

        if ( val && $select.data('bs.dropdownselect') ) {
            var $selected = $('.items.selected', $select);

            if($selected.length) {
                $selected.each(function(){
                    if( $(this).data(section) != val ) {
                        $select.bootstrapSelect('clear');
                    }
                });
            }
        }

        this.filterItem( section, select, val, this.options.method );

        if ( $('.live-filtering', $select).data('liveFilter') )
            $('.live-filtering', $select).liveFilter('initAC');
    }

    FilterSelect.prototype.filterItem = function( section, select, val, method ) {
        this.structure.$items.each(function(){
            var ref = $(this).data('ref'),
                valid = $(this).data('valid');

            if( ref != undefined && valid != undefined ) {
                ref = ref.split(',');
                valid = valid.split(',');

                if ( ref.length == valid.length ) {
                    if (val != null) {
                        if (ref.indexOf(section) > -1) {
                            valid[ref.indexOf(section)] = val;
                        }else {
                            ref = ref.concat([section]);
                            valid = valid.concat([val]);
                        }
                    } else {
                        ref.splice(ref.indexOf(section),1);
                        valid.splice(ref.indexOf(section),1);
                    }
                }
            } else if (val != null) {
                ref = [section];
                valid = [val];
            }

            if( method == 'recursive' ) {
                var skip = true;
                for( var c = 0; c < ref.length; c++ ) {
                    if ( valid[c] != $(this).data(ref[c])) {
                        skip = false;
                    }
                }
            } else if ( method == 'additionnal' ) {
                var skip = false;
                for( var c = 0; c < ref.length; c++ ) {
                    if ( valid[c] == $(this).data(ref[c])) {
                        skip = true;
                    }
                }
            }

            $(this).data('ref',ref.toString()).data('valid',valid.toString());
            if ( !skip ) {
                $(this).addClass('disabled').hide();
            } else {
                $(this).removeClass('disabled').show();
            }
        });
    }


    // SELECT FILTER PLUGIN DEFINITION
    // ==============================

    function Plugin() {
        var option  = arguments;
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('filterSelect');

            var method = option[0];

            if( (typeof(method) == 'object' || !method) && !data ) {
                $this.data('filterSelect', (data = new FilterSelect(this, method)));
                method = data;
            } else if(data[method]) {
                method = data[method];

                // Our method was sent as an argument, remove it using slice because it's not an argument for our method
                option = Array.prototype.slice.call(option, 1);
                method(option)
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
                return this;
            }

            // Use apply to sent arguments when calling our selected method
            return method.call(this, option);
        })
    }

    var old = $.fn.selectFilter

    $.fn.selectFilter             = Plugin
    $.fn.selectFilter.Constructor = FilterSelect


    // SELECT FILTER NO CONFLICT
    // ========================

    $.fn.toggle.noConflict = function () {
        $.fn.selectFilter = old
        return this
    }


    // SELECT FILTER DATA-API
    // =====================

    $(function() {
        $('[data-filter]').selectFilter();
    });
}(jQuery));