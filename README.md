# Bootstrap Select
## Description
It's a jQuery plugin for Bootstrap to create dropdown select.

## Requirements
Only need for basic features [Bootstrap 3.x](http://getbootstrap.com/) and jQuery.

Need [livefilter](https://github.com/Xarksass/livefilter) and [tabcomplete](https://github.com/erming/tabcomplete) for the usage of the live filtering feature.

Need [FilterList](https://github.com/Xarksass/FilterList) for the filter select feature.

## Basic usage
This is the basic html structure needed to use this plugin

You can call the plugin by using `$('your-element').bootstrapSelect();` or simply by using the `.selectpicker` class

```html
<div id="name-to-send" class="selectpicker">
    <button data-id="prov" type="button" class="btn btn-lg btn-block btn-default dropdown-toggle">
        <span class="placeholder">Choose an option</span>
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <ul class="list-unstyled">
            <li class="items" data-value="1">Item 1</li>
            <li class="items" data-value="2">Item 2</li>
            <li class="items" data-value="3">Item 3</li>
        </ul>
    </div>
    <input type="hidden" name="name-to-send" value="">
</div>
```

## Features
### Option group
You can create some group in your select just like in a traditionnal select

```html
<div id="name-to-send" class="selectpicker">
    <button data-id="prov" type="button" class="btn btn-lg btn-block btn-default dropdown-toggle">
        <span class="placeholder">Choose an option</span>
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <ul class="list-unstyled">
            <li class="optgroup">
                <span class="optgroup-header">List Group 1</span>
                <ul class="list-unstyled">
                    <li class="items" data-value="1">Item 1</li>
                    <li class="items" data-value="2">Item 2</li>
                    <li class="items" data-value="3">Item 3</li>
                </ul>
            </li>
            <li class="optgroup">
                <span class="optgroup-header">List Group 2</span>
                <ul class="list-unstyled">
                    <li class="items" data-value="1">Item 1</li>
                    <li class="items" data-value="2">Item 2</li>
                    <li class="items" data-value="3">Item 3</li>
                </ul>
            </li>
        </ul>
    </div>
    <input type="hidden" name="name-to-send" value="">
</div>
```

### Clear Button
You can add a clear button to allow the user to clear his selection

```html
<div id="name-to-send" class="selectpicker">
    <a href="#" class="clear"><span class="fa fa-times"></span><span class="sr-only">Cancel the selection</span></a>
    <button data-id="prov" type="button" class="btn btn-lg btn-block btn-default dropdown-toggle">
        <span class="placeholder">Choose an option</span>
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <ul class="list-unstyled">
            <li class="items" data-value="1">Item 1</li>
            <li class="items" data-value="2">Item 2</li>
            <li class="items" data-value="3">Item 3</li>
        </ul>
    </div>
    <input type="hidden" name="name-to-send" value="">
</div>
```

### Live Filtering
Need more html to be used but with this you can provide a live search inside your select, really useful into a select with a lot of options

```html
<div id="name-to-send" class="selectpicker" data-live="true">
    <button data-id="prov" type="button" class="btn btn-lg btn-block btn-default dropdown-toggle">
        <span class="placeholder">Choose an option</span>
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <div class="live-filtering">
            <label class="sr-only" for="input-bts-ex-4">Search in the list</label>
            <div class="search-box">
                <input type="text" class="form-control hint" tabindex="-1" />
                <input type="text" placeholder="Search in the list" id="input-bts-ex-4" class="form-control live-search" tabindex="1" />
            </div>
            <a href="#" class="fa fa-times hide filter-clear"><span class="sr-only">Clear filter</span></a>
            <div class="list-to-filter">
                <ul class="list-unstyled">
                    <li class="filter-item items" data-filter="item 1" data-value="1">item 1</li>
                    <li class="filter-item items" data-filter="item 2" data-value="2">item 2</li>
                    <li class="filter-item items" data-filter="item 3" data-value="3">item 3</li>
                    <li class="filter-item items" data-filter="item 4" data-value="4">item 4</li>
                    <li class="filter-item items" data-filter="item 5" data-value="5">item 5</li>
                </ul>
                <div class="no-search-results">
                    <div class="alert alert-warning" role="alert"><i class="fa fa-warning margin-right-sm"></i>No entry for <strong>'<span></span>'</strong> was found.</div>
                </div>
            </div>
        </div>
    </div>
    <input type="hidden" name="name-to-send" value="">
</div>
```