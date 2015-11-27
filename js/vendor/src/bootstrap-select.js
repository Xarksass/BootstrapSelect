/*! ========================================================================
 * Bootstrap Select: bootstrap-select.js v2.0.0
 * ========================================================================
 * Copyright 2015, Salvatore Di Salvo (disalvo-infographiste[dot]be)
 * ======================================================================== */

+function ($) {
    'use strict';

    // DROPDOWN SELECT PUBLIC CLASS DEFINITION
    // ====================================

    var DropdownSelect = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, this.defaults(), options)
        this.structure   = $.extend({}, this.parts())
        this.init()
    }

    DropdownSelect.VERSION  = '2.4.1'

    DropdownSelect.DEFAULTS = {
        select      : this,
        autoclose   : true,
        cancelbtn   : false,
        clearbtn    : false,
        livefilter  : false,
        filter      : null,
        fmethod     : 'recursive',
        open        : 'open',
        filled      : 'filled',
        display     : '.dropdown-toggle',
        list        : '.dropdown-menu',
        placeholder : '.placeholder',
        items       : '.items',
        current     : '.current',
        clear       : '.clear',
        selected    : '.selected',
        cancel      : '.cancel'
    }

    DropdownSelect.prototype.parts = function() {
        return {
            $select         : this.$element,
            $section        : this.$element.attr('id'),
            $display        : $(this.options.display, this.$element),
            $list           : $(this.options.list, this.$element),
            $placeholder    : $(this.options.placeholder, this.$element),
            $items          : $(this.options.items, this.$element),
            $current        : $(this.options.current, this.$element),
            $clear          : $(this.options.clear, this.$element),
            $selected       : this.get(),
            $cancel         : $(this.options.cancel, this.$element)
        }
    }

    DropdownSelect.prototype.defaults = function() {
        return {
            select      : DropdownSelect.DEFAULTS.select,
            autoclose   : this.$element.attr('data-autoclose') || DropdownSelect.DEFAULTS.autoclose,
            cancelbtn   : this.$element.attr('data-cancel') || DropdownSelect.DEFAULTS.cancelbtn,
            clearbtn    : this.$element.attr('data-clear') || DropdownSelect.DEFAULTS.clearbtn,
            livefilter  : this.$element.attr('data-live') || DropdownSelect.DEFAULTS.livefilter,
            filter      : this.$element.attr('data-filter') || DropdownSelect.DEFAULTS.filter,
            fmethod     : this.$element.attr('data-fmethod') || DropdownSelect.DEFAULTS.fmethod,
            open        : this.$element.attr('data-open') || DropdownSelect.DEFAULTS.open,
            filled      : this.$element.attr('data-filled') || DropdownSelect.DEFAULTS.filled,
            display     : DropdownSelect.DEFAULTS.display,
            list        : DropdownSelect.DEFAULTS.list,
            placeholder : DropdownSelect.DEFAULTS.placeholder,
            items       : DropdownSelect.DEFAULTS.items,
            current     : DropdownSelect.DEFAULTS.current,
            clear       : DropdownSelect.DEFAULTS.clear,
            selected    : DropdownSelect.DEFAULTS.selected,
            cancel      : DropdownSelect.DEFAULTS.cancel
        }
    }

    DropdownSelect.prototype.init = function() {
        var $select = this;

        this.structure.$display.on('click', function(e) {
            e.preventDefault();
            $select.toggle();
        });

        this.structure.$items.on('click', function(){
            $select.select($(this));
        });

        if ( this.options.cancelbtn ) {
            this.structure.$cancel.on('click', function (e) {
                e.preventDefault();
                $select.toggle('close');
            });
        }

        if ( this.options.clearbtn ) {
            this.structure.$clear.on('click', function (e) {
                $select.clear(e);
            });
        }

        if ( this.options.filter != null) {
            var $toFilter = this.options.filter.split(' ');

            if ($.isArray($toFilter) && $toFilter.length > 0 ) {
                for(var i=0;i < $toFilter.length;i++) {
                    var $this = $('#'+$toFilter[i]);
                    $this.listFilter({ method: this.options.fmethod });
                }
            }
        }

        if ( this.options.livefilter ) {
            $('.live-filtering', this.structure.$select).liveFilter();
        }

        $(document).mouseup(function(e) {
            if ($select.$element.has(e.target).length === 0 && $select.$element.hasClass($select.options.open)){
                $select.toggle('close');
                e.preventDefault();
            }
        });
    }

    DropdownSelect.prototype.toggle = function( mode ) {
        if (mode) {
            if (mode == 'open')
                this.$element.addClass(this.options.open);
            else if (mode == 'close') {
                this.$element.removeClass(this.options.open);

                if ( this.options.livefilter ) {
                    $('.live-filtering', this.structure.$select).liveFilter('clear');
                }
            }
        }
        else
        {
            if(!this.$element.hasClass(this.options.open))
                this.$element.addClass(this.options.open);
            else {
                this.$element.removeClass(this.options.open);

                if ( this.options.livefilter ) {
                    $('.live-filtering', this.structure.$select).liveFilter('clear');
                }
            }

        }
    }

    DropdownSelect.prototype.get = function() {
        return $(this.options.selected, this.$element);
    }

    DropdownSelect.prototype.select = function( item ) {
        if(this.structure.$current.length == 1)
            this.structure.$current.toggleClass('active');

        this.structure.$selected = this.get();
        this.structure.$selected.removeClass('selected');
        item.addClass('selected');

        this.updateDisplay('select',item);

        if ( this.options.filter != null) {
            var $toFilter = this.options.filter.split(' ');

            if ($.isArray($toFilter) && $toFilter.length > 0 ) {
                for(var i=0;i < $toFilter.length;i++) {
                    var $this = $('#'+$toFilter[i]);
                    $this.listFilter('filter',this.structure.$section,item.data('value'));
                }
            }
        }

        if (this.options.autoclose === true) {
            this.toggle('close');
        }
    }

    DropdownSelect.prototype.clear = function(e) {
        if(e != undefined)
            e.preventDefault();

        this.structure.$selected = this.get();
        this.structure.$selected.removeClass('selected');

        this.updateDisplay('clear');

        if ( this.options.filter != null) {
            var $toFilter = this.options.filter.split(' ');

            if ($.isArray($toFilter) && $toFilter.length > 0 ) {
                for(var i=0;i < $toFilter.length;i++) {
                    var $this = $('#'+$toFilter[i]);
                    $this.listFilter('filter',this.structure.$section);
                }
            }
        }

        if (this.options.autoclose === true) {
            this.toggle('close');
        }
    }

    DropdownSelect.prototype.refresh = function() {
        if (this.structure.$selected.data('value') != undefined) {
            this.updateDisplay('select');
        }
    }

    DropdownSelect.prototype.updateDisplay = function( mode, selected ) {
        if( mode == 'select') {
            this.structure.$clear.show();
            $('input[name="' + this.structure.$section + '"]').val( selected.data('value') );
            this.structure.$display.html('<span class="text">' + selected.html() + '</span><span class="caret"></span>').addClass(this.options.filled);
        }

        if( mode == 'clear') {
            this.structure.$clear.hide();
            $('input[name="' + this.structure.$section + '"]').val('');
            this.structure.$display.html('<span class="placeholder">' + this.structure.$placeholder.html() + '</span><span class="caret"></span>').removeClass(this.options.filled);
        }
    }


    // DROPDOWN SELECT PLUGIN DEFINITION
    // ==============================

    function Plugin() {
        var arg = arguments;
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('bs.dropdownselect'),
                method  = arg[0];

            if( typeof(method) == 'object' || !method ) {
                var options = typeof method == 'object' && method;
                if (!data) $this.data('bs.dropdownselect', (data = new DropdownSelect(this, options)));
            } else {
                if (data[method]) {
                    method = data[method];
                    arg = Array.prototype.slice.call(arg, 1);
                    if(arg != null || arg != undefined || arg != [])  method.apply(data, arg);
                } else {
                    $.error( 'Method ' +  method + ' does not exist on jQuery.DropdownSelect' );
                    return this;
                }
            }
        })
    }

    var old = $.fn.bootstrapSelect

    $.fn.bootstrapSelect             = Plugin
    $.fn.bootstrapSelect.Constructor = DropdownSelect


    // DROPDOWN SELECT NO CONFLICT
    // ========================

    $.fn.toggle.noConflict = function () {
        $.fn.bootstrapSelect = old
        return this
    }


    // DROPDOWN SELECT DATA-API
    // =====================

    $(function() {
        $('.selectpicker').bootstrapSelect();
    });
}(jQuery);