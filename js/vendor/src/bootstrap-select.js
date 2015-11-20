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

    DropdownSelect.VERSION  = '2.4.0'

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
                    $this.selectFilter({ method: this.options.fmethod });
                    $this.selectFilter('filter',this.structure.$section,$toFilter[i],item.data('value'));
                    //this.filter(this.structure.$section,$toFilter[i],item.data('value'));
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
                    var $this = document.getElementById($toFilter[i]);
                    $this.selectFilter({ method: this.options.fmethod });
                    $this.selectFilter('filter',this.structure.$section,$toFilter[i]);
                    //this.filter(this.structure.$section,$toFilter[i]);
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

    /*DropdownSelect.prototype.filter = function( section, select, val ) {
        if( val ) {
            var $selected = $('#'+select+' .items.selected');

            if($selected.length) {
                $selected.each(function(){
                    if( $(this).data(section) != val ) {
                        $('#'+select).bootstrapSelect('clear');
                    }
                });
            }

            this.filterItem( section, select, val, this.options.fmethod );
        }
        else
        {
            this.filterItem( section, select, null, this.options.fmethod );
        }

        $('#'+select+' .live-filtering').liveFilter('initAC');
    }

    DropdownSelect.prototype.filterItem = function( section, select, val, method ) {
        $('#'+select+' .items').each(function(){
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
    }*/


    // DROPDOWN SELECT PLUGIN DEFINITION
    // ==============================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bs.dropdownselect');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('bs.dropdownselect', (data = new DropdownSelect(this, options)));
            if (typeof option == 'string' && data[option]) data[option]()
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