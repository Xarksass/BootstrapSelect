/*! ========================================================================
 * Live Filter: livefilter.js v2.0.0
 * ========================================================================
 * Copyright 2015, Salvatore Di Salvo (disalvo-infographiste[dot].be)
 * ======================================================================== */

(function ($) {
    'use strict';

    // FILTER PUBLIC CLASS DEFINITION
    // ====================================

    var Filter = function (element) {
        this.$element  = $(element)
        this.structure   = $.extend({}, this.parts())
        this.keywords   = this.getKeywords()
        this.init()
    }

    Filter.VERSION  = '2.0.0'

    Filter.prototype.parts = function() {
        return {
            $input      : $('.live-search', this.$element),
            $filter     : $('.list-to-filter',this.$element),
            $clear      : $('.filter-clear', this.$element),
            $no_results : $('.no-search-results', this.$element),
            $items      : $('.filter-item', this.$element)
        }
    }

    Filter.prototype.getKeywords = function() {
        var keywords = [];
        this.structure.$items.each(function(i) {
            keywords = keywords.concat($(this).attr('data-filter').split('|'));
        });

        /*keywords = JSON.stringify(keywords);
        keywords = keywords.replace('[','{');
        keywords = keywords.replace(']','}');
        alert(keywords);*/
        return keywords;
    }

    Filter.prototype.init = function() {
        var $filter = this;

        if ( $filter.keywords != undefined && $filter.keywords != null ) {
            // Add tab completion
            $filter.structure.$input.tabcomplete($filter.keywords, {
                arrowKeys: true
            });

            $filter.structure.$clear.click(function (e) {
                e.preventDefault();
                $filter.clear()
            });

            $filter.structure.$input.on('keyup', function() {
                var val = $(this).val().toLowerCase();

                $filter.structure.$clear.toggleClass('hide', !val);
                $filter.structure.$items.toggle(!val);
                $filter.structure.$no_results.hide(); // Hide no results msg

                $filter.searchAndFilter(val);
            });

            $filter.structure.$input
                .val('')
                .trigger('input')
                .trigger('keyup')
                .focus();

            if ($filter.structure.$clear) {
                $filter.structure.$clear.addClass('hide'); // Hide clear button
            }

            if ($filter.structure.$no_results) {
                $filter.structure.$no_results.hide(); // Hide no resutls msg
            }
        } else {
            console.log('no keywords defined!');
        }
    }

    Filter.prototype.searchAndFilter = function ( val ) {
        if (!val) return;

        var $filter = this,
            resultsCount = 0;

        this.structure.$items.each(function () {
            var filters = $(this).attr('data-filter').split('|');
            var show = $filter.inFilter(val, filters);
            /*if (!show) {
             if (val.slice(-1) === 's' && val.length > 1) {
             // Try to be smart. Make plural terms singular.
             show = inFilter(val.slice(0, -1), filter);
             }
             }*/
            if (show) resultsCount++;
            $(this).toggle(!!show);
        });

        if (resultsCount == 0 && val.length != 0) {
            this.structure.$no_results.find('span').text(val);
            this.structure.$no_results.show();
        } else {
            this.structure.$no_results.hide();
        }
    }

    Filter.prototype.clear = function() {
        this.structure.$input
            .val('')
            .trigger('input')
            .trigger('keyup')
            .focus();

        this.structure.$clear.addClass('hide'); // Hide clear button
    }

    Filter.prototype.inFilter = function(val, filter) {
        for (var i = 0; i < filter.length; i++) {
            var toParse = filter[i].toLowerCase();
            if (toParse.match(val)) return true;
        }
        return false;
    }

    // FILTER PLUGIN DEFINITION
    // ==============================

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('liveFilter');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('liveFilter', (data = new Filter(this, options)));
            if (typeof option == 'string' && data[option]) data[option]()
        })
    }

    var old = $.fn.liveFilter

    $.fn.liveFilter             = Plugin
    $.fn.liveFilter.Constructor = Filter

    // FILTER NO CONFLICT
    // ========================

    $.fn.toggle.noConflict = function () {
        $.fn.liveFilter = old
        return this
    }

    // FILTER DATA-API
    // =====================

    $(function() {
        $('.filter-by').liveFilter();
    });
}(jQuery));