$(document).ready(function(){

    if( $('#profiler_icon').length )
    {
        initProfiler();

        handleProfilerSwitcher();

        handleProfilerMenuItems();

        handleProfilerQueryRows();
        
        handleProfilerBlockRows();
    }

});

var initProfiler = function() {

    if( localStorageTest() && localStorage.getItem('profilerBarOpen') !== null )
        $('#profiler_bar').addClass('opened');

}

var handleProfilerSwitcher = function() {

    $('#profiler_icon').off('click').on('click', function(){
        var profiler_bar = $('#profiler_bar');
        var admin_box = $('#admin_box');
        var admin_box_button = $('#minimal_admin');

        if( profiler_bar.hasClass('opened') )
        {
            profiler_bar.removeClass('opened');
            if( localStorageTest() )
                localStorage.removeItem('profilerBarOpen');
        }
        else
        {
            profiler_bar.addClass('opened');
            if( localStorageTest() )
                localStorage.setItem('profilerBarOpen', 1);

            if( admin_box.length && admin_box.hasClass('opened') )
                admin_box_button.trigger('click');
        }
    });

}

var handleProfilerMenuItems = function() {

    var main_li_s = $('#profiler-main-ul li').not('.profiler-no-sub');

    main_li_s.off('click').on('click', function(){
        var was_active = $(this).hasClass('active');
        main_li_s.removeClass('active');
        if( !was_active )
            $(this).addClass('active');
    });

}

var handleProfilerQueryRows = function() {

    var query_short_rows = $('.profiler-query-short-row');
    var query_long_rows = $('.profiler-query-long-row');

    query_short_rows.off('click').on('click', function(){
        var id = $(this).data('id');
        query_long_rows.removeClass('opened');
        if( !$(this).hasClass('opened') )
        {
            query_short_rows.removeClass('opened');
            $(this).addClass('opened');
            query_long_rows.filter('[data-id="' + id + '"]').addClass('opened');
        }
        else
            $(this).removeClass('opened');
    });
}

var handleProfilerBlockRows = function() {

    var block_short_rows = $('.profiler-block-short-row');
    var block_long_rows = $('.profiler-block-long-row');

    block_short_rows.off('click').on('click', function(){
        var id = $(this).data('id');
        block_long_rows.removeClass('opened');
        if( !$(this).hasClass('opened') )
        {
            block_short_rows.removeClass('opened');
            $(this).addClass('opened');
            block_long_rows.filter('[data-id="' + id + '"]').addClass('opened');
        }
        else
            $(this).removeClass('opened');
    });
}

var localStorageTest = function() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch(e) {
        return false;
    }
}